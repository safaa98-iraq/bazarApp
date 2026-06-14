import prisma from '@storebuilder/database';
import { AnalyticsData, TopStore } from '@storebuilder/types';
import { AppError } from '../middleware/errorHandler';

export class AdminService {
  // ─── Merchants ─────────────────────────────────────────────────────────────

  async listMerchants(opts: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }) {
    const page = opts.page ?? 1;
    const limit = opts.limit ?? 20;
    const skip = (page - 1) * limit;

    const where = {
      role: 'MERCHANT' as const,
      ...(opts.isActive !== undefined ? { isActive: opts.isActive } : {}),
      ...(opts.search
        ? {
            OR: [
              { name: { contains: opts.search } },
              { email: { contains: opts.search } },
            ],
          }
        : {}),
    };

    const [merchants, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
          isActive: true,
          createdAt: true,
          store: { select: { id: true, name: true, slug: true, isActive: true, isPublished: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return { merchants, total };
  }

  async getMerchantById(id: string) {
    const merchant = await prisma.user.findFirst({
      where: { id, role: 'MERCHANT' },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        isActive: true,
        createdAt: true,
        store: {
          include: {
            products: { select: { id: true, name: true, price: true, stock: true, isActive: true }, take: 10 },
            _count: { select: { orders: true, products: true } },
          },
        },
      },
    });
    if (!merchant) throw new AppError(404, 'Merchant not found');
    return merchant;
  }

  async setMerchantActive(id: string, isActive: boolean) {
    const merchant = await prisma.user.findFirst({ where: { id, role: 'MERCHANT' } });
    if (!merchant) throw new AppError(404, 'Merchant not found');

    return prisma.user.update({ where: { id }, data: { isActive } });
  }

  async deleteMerchant(id: string) {
    const merchant = await prisma.user.findFirst({ where: { id, role: 'MERCHANT' } });
    if (!merchant) throw new AppError(404, 'Merchant not found');

    await prisma.user.delete({ where: { id } });
  }

  async updateMerchantPlan(id: string, plan: 'FREE' | 'PRO' | 'ENTERPRISE') {
    const merchant = await prisma.user.findFirst({ where: { id, role: 'MERCHANT' } });
    if (!merchant) throw new AppError(404, 'Merchant not found');

    return prisma.user.update({ where: { id }, data: { plan } });
  }

  // ─── Stores ────────────────────────────────────────────────────────────────

  async listStores(opts: { page?: number; limit?: number; search?: string; isActive?: boolean }) {
    const page = opts.page ?? 1;
    const limit = opts.limit ?? 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(opts.isActive !== undefined ? { isActive: opts.isActive } : {}),
      ...(opts.search
        ? {
            OR: [
              { name: { contains: opts.search, mode: 'insensitive' as const } },
              { slug: { contains: opts.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        include: {
          merchant: { select: { id: true, name: true, email: true, plan: true } },
          _count: { select: { products: true, orders: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.store.count({ where }),
    ]);

    return { stores, total };
  }

  async getStoreById(id: string) {
    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        merchant: { select: { id: true, name: true, email: true, plan: true } },
        products: { orderBy: { createdAt: 'desc' }, take: 20 },
        categories: true,
        _count: { select: { orders: true, products: true } },
      },
    });
    if (!store) throw new AppError(404, 'Store not found');
    return store;
  }

  async setStoreActive(id: string, isActive: boolean) {
    const store = await prisma.store.findUnique({ where: { id } });
    if (!store) throw new AppError(404, 'Store not found');

    return prisma.store.update({ where: { id }, data: { isActive } });
  }

  // ─── Orders ────────────────────────────────────────────────────────────────

  async listAllOrders(opts: {
    page?: number;
    limit?: number;
    storeId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const page = opts.page ?? 1;
    const limit = opts.limit ?? 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(opts.storeId ? { storeId: opts.storeId } : {}),
      ...(opts.status ? { status: opts.status as 'PENDING' } : {}),
      ...(opts.startDate || opts.endDate
        ? {
            createdAt: {
              ...(opts.startDate ? { gte: new Date(opts.startDate) } : {}),
              ...(opts.endDate ? { lte: new Date(opts.endDate) } : {}),
            },
          }
        : {}),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          store: { select: { name: true, slug: true } },
          items: { include: { product: { select: { name: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return { orders, total };
  }

  async exportOrdersCsv(opts: { storeId?: string; status?: string }): Promise<string> {
    const orders = await prisma.order.findMany({
      where: {
        ...(opts.storeId ? { storeId: opts.storeId } : {}),
        ...(opts.status ? { status: opts.status as 'PENDING' } : {}),
      },
      include: { store: { select: { name: true } }, items: true },
      orderBy: { createdAt: 'desc' },
    });

    const header = 'Order ID,Store,Customer,Email,Total,Status,Date\n';
    const rows = orders.map((o) =>
      [
        o.id,
        o.store.name,
        o.customerName,
        o.customerEmail,
        Number(o.total).toFixed(2),
        o.status,
        o.createdAt.toISOString(),
      ].join(',')
    );
    return header + rows.join('\n');
  }

  // ─── Analytics ─────────────────────────────────────────────────────────────

  async getAnalytics(): Promise<AnalyticsData> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalMerchants,
      activeMerchants,
      totalStores,
      activeStores,
      newMerchantsThisMonth,
      revenueResult,
      totalOrdersCount,
      topStoresRaw,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'MERCHANT' } }),
      prisma.user.count({ where: { role: 'MERCHANT', isActive: true } }),
      prisma.store.count(),
      prisma.store.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: 'MERCHANT', createdAt: { gte: startOfMonth } } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.count(),
      prisma.$queryRaw<
        { storeId: string; storeName: string; slug: string; totalRevenue: number; totalOrders: bigint }[]
      >`
        SELECT o."storeId", s.name as "storeName", s.slug,
               SUM(o.total)::float as "totalRevenue",
               COUNT(o.id) as "totalOrders"
        FROM "Order" o
        JOIN "Store" s ON s.id = o."storeId"
        WHERE o.status != 'CANCELLED'
        GROUP BY o."storeId", s.name, s.slug
        ORDER BY "totalRevenue" DESC
        LIMIT 5
      `,
    ]);

    // Monthly revenue for last 6 months
    const months: { month: string; revenue: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const res = await prisma.order.aggregate({
        where: { createdAt: { gte: d, lte: end }, status: { not: 'CANCELLED' } },
        _sum: { total: true },
      });
      months.push({
        month: d.toLocaleString('default', { month: 'short', year: '2-digit' }),
        revenue: Number(res._sum.total ?? 0),
      });
    }

    const topStores: TopStore[] = topStoresRaw.map((s) => ({
      storeId: s.storeId,
      storeName: s.storeName,
      slug: s.slug,
      totalRevenue: Number(s.totalRevenue),
      totalOrders: Number(s.totalOrders),
    }));

    return {
      totalRevenue: Number(revenueResult._sum.total ?? 0),
      totalOrders: totalOrdersCount,
      totalMerchants,
      activeMerchants,
      inactiveMerchants: totalMerchants - activeMerchants,
      totalStores,
      activeStores,
      newMerchantsThisMonth,
      topStores,
      revenueByMonth: months,
    };
  }

  // ─── Audit Log ─────────────────────────────────────────────────────────────

  async getLogs(opts: {
    page?: number;
    limit?: number;
    action?: string;
    adminId?: string;
  }) {
    const page = opts.page ?? 1;
    const limit = opts.limit ?? 50;
    const skip = (page - 1) * limit;

    const where = {
      ...(opts.action ? { action: { contains: opts.action, mode: 'insensitive' as const } } : {}),
      ...(opts.adminId ? { adminId: opts.adminId } : {}),
    };

    const [logs, total] = await Promise.all([
      prisma.adminLog.findMany({
        where,
        include: { admin: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.adminLog.count({ where }),
    ]);

    return { logs, total };
  }
}

export const adminService = new AdminService();
