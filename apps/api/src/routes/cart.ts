import { Router, Request, Response, NextFunction } from 'express';
import { optionalToken } from '../middleware/auth';
import prisma from '@storebuilder/database';

const router = Router();

async function getOrCreateCart(storeId: string, customerId?: string, sessionId?: string) {
  if (customerId) {
    return prisma.cart.upsert({
      where: { customerId_storeId: { customerId, storeId } },
      create: { storeId, customerId },
      update: {},
      include: { items: { include: { product: true } } },
    });
  }
  if (sessionId) {
    const existing = await prisma.cart.findFirst({
      where: { sessionId, storeId },
      include: { items: { include: { product: true } } },
    });
    if (existing) return existing;
    return prisma.cart.create({
      data: { storeId, sessionId },
      include: { items: { include: { product: true } } },
    });
  }
  return null;
}

// GET /api/cart/:storeId
router.get(
  '/:storeId',
  optionalToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const sessionId = req.headers['x-session-id'] as string;
      const cart = await getOrCreateCart(storeId, req.user?.userId, sessionId);
      res.json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/cart/:storeId/items
router.post(
  '/:storeId/items',
  optionalToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const { productId, quantity = 1 } = req.body;
      const sessionId = req.headers['x-session-id'] as string;

      let cart = await getOrCreateCart(storeId, req.user?.userId, sessionId);
      if (!cart) { res.status(400).json({ success: false, error: 'Session ID required' }); return; }

      const product = await prisma.product.findFirst({ where: { id: productId, storeId, isActive: true } });
      if (!product) { res.status(404).json({ success: false, error: 'Product not found' }); return; }

      const existingItem = await prisma.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } },
      });

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity } });
      }

      cart = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      }) as typeof cart;

      res.json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  }
);

// PATCH /api/cart/:storeId/items/:itemId
router.patch(
  '/:storeId/items/:itemId',
  optionalToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { quantity } = req.body;

      if (quantity <= 0) {
        await prisma.cartItem.delete({ where: { id: req.params.itemId } });
      } else {
        await prisma.cartItem.update({ where: { id: req.params.itemId }, data: { quantity } });
      }

      const { storeId } = req.params;
      const sessionId = req.headers['x-session-id'] as string;
      const cart = await getOrCreateCart(storeId, req.user?.userId, sessionId);
      res.json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/cart/:storeId/items/:itemId
router.delete(
  '/:storeId/items/:itemId',
  optionalToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.cartItem.delete({ where: { id: req.params.itemId } });
      const { storeId } = req.params;
      const sessionId = req.headers['x-session-id'] as string;
      const cart = await getOrCreateCart(storeId, req.user?.userId, sessionId);
      res.json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/cart/:storeId — clear cart
router.delete(
  '/:storeId',
  optionalToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const sessionId = req.headers['x-session-id'] as string;
      const cart = await getOrCreateCart(storeId, req.user?.userId, sessionId);
      if (cart) {
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      }
      res.json({ success: true, message: 'Cart cleared' });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
