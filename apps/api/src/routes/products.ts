import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { verifyToken, requireRole, resolveStoreId } from '../middleware/auth';
import { productService } from '../services/product.service';
import prisma from '@storebuilder/database';

const router = Router();

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array()[0]?.msg });
    return;
  }
  next();
};

const merchant = [verifyToken, requireRole('MERCHANT')];

router.get('/', ...merchant, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = await resolveStoreId(req);
    const result = await productService.list(storeId, {
      search: req.query.search as string,
      categoryId: req.query.categoryId as string,
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 20),
    });
    res.json({
      success: true, data: result.items,
      pagination: {
        page: Number(req.query.page ?? 1), limit: Number(req.query.limit ?? 20),
        total: result.total, totalPages: Math.ceil(result.total / Number(req.query.limit ?? 20)),
      },
    });
  } catch (err) { next(err); }
});

router.get('/:id', ...merchant, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = await resolveStoreId(req);
    const product = await productService.getById(req.params.id, storeId);
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
});

router.post('/', ...merchant,
  [
    body('name').trim().isLength({ min: 1 }).withMessage('اسم المنتج مطلوب'),
    body('price').isFloat({ min: 0 }).withMessage('السعر يجب أن يكون رقماً موجباً'),
    body('stock').isInt({ min: 0 }).withMessage('الكمية يجب أن تكون رقماً صحيحاً'),
  ],
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = await resolveStoreId(req);
      const userId = req.user?.userId;
      const user = userId ? await prisma.user.findUnique({ where: { id: userId }, select: { plan: true } }) : null;
      if (user?.plan === 'FREE') {
        const count = await prisma.product.count({ where: { storeId } });
        if (count >= 75) {
          res.status(403).json({ success: false, error: 'وصلت إلى الحد الأقصى للخطة المجانية 75 منتج. ارفع خطتك لإضافة منتجات أكثر.' });
          return;
        }
      }
      const product = await productService.create(storeId, req.body);
      res.status(201).json({ success: true, data: product });
    } catch (err) { next(err); }
  }
);

router.patch('/:id', ...merchant, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = await resolveStoreId(req);
    const product = await productService.update(req.params.id, storeId, req.body);
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
});

router.delete('/:id', ...merchant, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = await resolveStoreId(req);
    await productService.delete(req.params.id, storeId);
    res.json({ success: true, message: 'تم حذف المنتج' });
  } catch (err) { next(err); }
});

export default router;
