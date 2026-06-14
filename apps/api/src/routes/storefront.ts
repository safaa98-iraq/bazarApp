import { Router, Request, Response, NextFunction } from 'express';
import prisma from '@storebuilder/database';
import { productService } from '../services/product.service';
import { Decimal } from '@prisma/client/runtime/library';

const router = Router();

// GET /api/storefront/cross-ads?excludeStoreId=X&limit=4
// Returns random products from active PRO/ENTERPRISE stores (for showing ads in FREE stores)
router.get(
  '/cross-ads',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const excludeStoreId = req.query.excludeStoreId as string | undefined;
      const limit = Math.min(Number(req.query.limit ?? 4), 8);

      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          stock: { gt: 0 },
          store: {
            isActive: true,
            isPublished: true,
            ...(excludeStoreId ? { id: { not: excludeStoreId } } : {}),
            merchant: { plan: { in: ['PRO', 'ENTERPRISE'] } },
          },
        },
        select: {
          id: true, name: true, price: true, comparePrice: true, images: true,
          store: { select: { id: true, name: true, slug: true } },
        },
        take: limit * 3, // fetch more for random sampling
      });

      // Fisher–Yates shuffle then take limit
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }

      const result = products.slice(0, limit).map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
        images: p.images as string[],
        storeId: p.store.id,
        storeName: p.store.name,
        storeSlug: p.store.slug,
      }));

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/storefront/:slug — public store info
router.get(
  '/:slug',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await prisma.store.findUnique({
        where: { slug: req.params.slug },
        select: {
          id: true, name: true, slug: true, description: true,
          logo: true, theme: true, template: true,
          isActive: true, isPublished: true,
          suspendedAt: true, suspendReason: true,
          builderConfig: true,
          merchant: { select: { plan: true } },
        },
      });

      if (!store) { res.status(404).json({ success: false, error: 'Store not found' }); return; }

      if (!store.isActive) {
        res.status(503).json({
          success: false,
          error: 'Store suspended',
          suspendReason: store.suspendReason ?? 'This store is currently unavailable',
          suspendedAt: store.suspendedAt,
        });
        return;
      }

      if (!store.isPublished) {
        res.status(404).json({ success: false, error: 'Store not found' });
        return;
      }

      const { merchant, ...storeData } = store as typeof store & { merchant?: { plan: string } };
      res.json({ success: true, data: { ...storeData, merchantPlan: merchant?.plan ?? 'FREE' } });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/storefront/:slug/products
router.get(
  '/:slug/products',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await prisma.store.findUnique({
        where: { slug: req.params.slug },
        select: { id: true, isActive: true, isPublished: true },
      });

      if (!store) { res.status(404).json({ success: false, error: 'Store not found' }); return; }
      if (!store.isActive) { res.status(503).json({ success: false, error: 'Store unavailable' }); return; }

      const result = await productService.list(store.id, {
        activeOnly: true,
        categoryId: req.query.categoryId as string,
        search: req.query.search as string,
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 20),
      });

      res.json({
        success: true,
        data: result.items,
        pagination: {
          page: Number(req.query.page ?? 1),
          limit: Number(req.query.limit ?? 20),
          total: result.total,
          totalPages: Math.ceil(result.total / Number(req.query.limit ?? 20)),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/storefront/:slug/products/:productId
router.get(
  '/:slug/products/:productId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await prisma.store.findUnique({
        where: { slug: req.params.slug },
        select: { id: true, isActive: true },
      });

      if (!store) { res.status(404).json({ success: false, error: 'Store not found' }); return; }
      if (!store.isActive) { res.status(503).json({ success: false, error: 'Store unavailable' }); return; }

      const product = await productService.getById(req.params.productId, store.id);
      if (!product.isActive) { res.status(404).json({ success: false, error: 'Product not found' }); return; }

      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/storefront/:slug/categories
router.get(
  '/:slug/categories',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await prisma.store.findUnique({ where: { slug: req.params.slug } });
      if (!store || !store.isActive) { res.status(404).json({ success: false, error: 'Store not found' }); return; }

      const categories = await prisma.category.findMany({
        where: { storeId: store.id },
        orderBy: { name: 'asc' },
      });
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/storefront/:slug/analytics — store dashboard analytics
router.get(
  '/:slug/analytics',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await prisma.store.findUnique({ where: { slug: req.params.slug } });
      if (!store) { res.status(404).json({ success: false, error: 'Store not found' }); return; }

      const [orderStats, topProducts, recentOrders] = await Promise.all([
        prisma.order.aggregate({
          where: { storeId: store.id, status: { not: 'CANCELLED' } },
          _sum: { total: true },
          _count: true,
        }),
        prisma.orderItem.groupBy({
          by: ['productId'],
          where: { order: { storeId: store.id } },
          _sum: { quantity: true },
          orderBy: { _sum: { quantity: 'desc' } },
          take: 5,
        }),
        prisma.order.findMany({
          where: { storeId: store.id },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true, customerName: true, total: true, status: true, createdAt: true,
          },
        }),
      ]);

      const topProductIds = topProducts.map((p) => p.productId);
      const products = await prisma.product.findMany({ where: { id: { in: topProductIds } } });

      res.json({
        success: true,
        data: {
          totalRevenue: Number(orderStats._sum.total ?? 0),
          totalOrders: orderStats._count,
          topProducts: topProducts.map((tp) => ({
            product: products.find((p) => p.id === tp.productId),
            totalSold: tp._sum.quantity,
          })),
          recentOrders: recentOrders.map((o) => ({
            ...o,
            total: Number((o.total as Decimal).toString()),
            createdAt: o.createdAt.toISOString(),
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/storefront/:slug/checkout — guest COD order
router.post(
  '/:slug/checkout',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await prisma.store.findUnique({ where: { slug: req.params.slug } });
      if (!store || !store.isActive) {
        res.status(404).json({ success: false, error: 'المتجر غير موجود' });
        return;
      }

      const { customerName, customerPhone, governorate, city, address, notes, items } = req.body as {
        customerName: string; customerPhone: string;
        governorate: string; city: string; address: string; notes?: string;
        items: { productId: string; quantity: number }[];
      };

      if (!customerName || !customerPhone || !governorate || !city || !address || !items?.length) {
        res.status(400).json({ success: false, error: 'بيانات الطلب غير مكتملة' });
        return;
      }

      const products = await prisma.product.findMany({
        where: { id: { in: items.map(i => i.productId) }, storeId: store.id, isActive: true },
      });

      if (products.length !== items.length) {
        res.status(400).json({ success: false, error: 'بعض المنتجات غير متاحة' });
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const orderItems: any[] = [];
      let total = 0;
      for (const item of items) {
        const prod = products.find(p => p.id === item.productId)!;
        if (prod.stock < item.quantity) {
          res.status(400).json({ success: false, error: `المخزون غير كافٍ: ${prod.name}` });
          return;
        }
        const price = Number(prod.price);
        total += price * item.quantity;
        orderItems.push({ productId: item.productId, quantity: item.quantity, price });
      }

      const order = await prisma.$transaction(async (tx) => {
        const o = await tx.order.create({
          data: {
            storeId: store.id,
            customerName,
            customerEmail: `${customerPhone.replace(/\s/g, '')}@checkout.bazar`,
            total,
            shippingAddress: { governorate, city, address, notes: notes ?? '' } as import('@prisma/client').Prisma.InputJsonValue,
            status: 'PENDING',
            items: { create: orderItems },
          },
          select: { id: true, total: true },
        });
        await Promise.all(orderItems.map(item =>
          tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } })
        ));
        return o;
      });

      res.status(201).json({ success: true, data: { id: order.id, total: Number(order.total) } });
    } catch (err) { next(err); }
  }
);

export default router;
