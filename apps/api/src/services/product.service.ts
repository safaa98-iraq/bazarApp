import prisma from '@storebuilder/database';
import { CreateProductDto, UpdateProductDto, ProductPublic } from '@storebuilder/types';
import { AppError } from '../middleware/errorHandler';
import { Decimal } from '@prisma/client/runtime/library';

const UNIT_LABELS: Record<string, string> = {
  piece: 'قطعة', pack: 'حزمة', box: 'صندوق', set: 'طقم', pair: 'زوج',
  ml: 'مل', g: 'غرام', kg: 'كيلو', liter: 'لتر', tray: 'صينية',
  key: 'مفتاح', card: 'بطاقة', license: 'ترخيص',
  unit: 'وحدة', bottle: 'زجاجة', meter: 'متر',
};

type RawProduct = {
  id: string; storeId: string; name: string; description: string | null;
  price: Decimal; comparePrice: Decimal | null; images: unknown;
  stock: number; categoryId: string | null; isActive: boolean;
  seoTitle?: string | null; seoDescription?: string | null; seoSlug?: string | null;
  unitType?: string; unitLabel?: string;
  createdAt: Date;
  category?: { id: string; storeId: string; name: string; slug: string } | null;
};

function toPublic(p: RawProduct): ProductPublic {
  return {
    id: p.id, storeId: p.storeId, name: p.name,
    description: p.description,
    price: Number(p.price),
    comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
    images: (p.images as string[]) ?? [],
    stock: p.stock, categoryId: p.categoryId, isActive: p.isActive,
    seoTitle: p.seoTitle ?? null,
    seoDescription: p.seoDescription ?? null,
    seoSlug: p.seoSlug ?? null,
    unit: p.unitType ?? 'piece',
    unitLabel: p.unitLabel ?? 'قطعة',
    createdAt: p.createdAt.toISOString(),
    category: p.category ?? null,
  };
}

// Strip unit-related fields before passing to Prisma, return them separately
function separateUnitFields(dto: Record<string, unknown>): {
  prismaData: Record<string, unknown>;
  unitType: string | undefined;
  unitLabel: string | undefined;
} {
  const { unit, unitType: ut, unitLabel: ul, ...prismaData } = dto as Record<string, unknown>;
  let unitType = ut as string | undefined;
  if (!unitType && unit && typeof unit === 'string') {
    unitType = unit;
  }
  const unitLabel = (ul as string | undefined) ?? (unitType ? UNIT_LABELS[unitType] ?? unitType : undefined);
  return { prismaData, unitType, unitLabel };
}

export class ProductService {
  async create(storeId: string, dto: CreateProductDto): Promise<ProductPublic> {
    const { prismaData, unitType, unitLabel } = separateUnitFields(dto as unknown as Record<string, unknown>);

    const product = await prisma.product.create({
      data: {
        ...(prismaData as Omit<CreateProductDto, 'unit' | 'unitType' | 'unitLabel'>),
        storeId,
        price: (dto as CreateProductDto).price,
        comparePrice: (dto as CreateProductDto).comparePrice ?? null,
      },
      include: { category: true },
    });

    // Save unit via raw SQL (columns exist in DB but not in current Prisma client)
    if (unitType) {
      await prisma.$executeRaw`
        UPDATE Product SET unitType=${unitType}, unitLabel=${unitLabel ?? 'قطعة'}, updatedAt=NOW(3) WHERE id=${product.id}
      `;
    }

    return toPublic({ ...product, unitType: unitType ?? 'piece', unitLabel: unitLabel ?? 'قطعة' } as RawProduct);
  }

  async list(
    storeId: string,
    opts: { activeOnly?: boolean; categoryId?: string; search?: string; page?: number; limit?: number }
  ): Promise<{ items: ProductPublic[]; total: number }> {
    const page = opts.page ?? 1;
    const limit = opts.limit ?? 20;
    const skip = (page - 1) * limit;

    const where = {
      storeId,
      ...(opts.activeOnly ? { isActive: true } : {}),
      ...(opts.categoryId ? { categoryId: opts.categoryId } : {}),
      ...(opts.search ? { name: { contains: opts.search, mode: 'insensitive' as const } } : {}),
    };

    const [items, total, unitRows] = await Promise.all([
      prisma.product.findMany({ where, include: { category: true }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.product.count({ where }),
      prisma.$queryRaw<{ id: string; unitType: string; unitLabel: string }[]>`
        SELECT id, unitType, unitLabel FROM Product WHERE storeId=${storeId}
      `,
    ]);

    const unitMap = Object.fromEntries(unitRows.map(r => [r.id, r]));

    return {
      items: items.map(p => toPublic({ ...p, ...unitMap[p.id] } as RawProduct)),
      total,
    };
  }

  async getById(id: string, storeId?: string): Promise<ProductPublic> {
    const product = await prisma.product.findFirst({
      where: { id, ...(storeId ? { storeId } : {}) },
      include: { category: true },
    });
    if (!product) throw new AppError(404, 'Product not found');

    const [unitRow] = await prisma.$queryRaw<{ unitType: string; unitLabel: string }[]>`
      SELECT unitType, unitLabel FROM Product WHERE id=${id}
    `;

    return toPublic({ ...product, ...unitRow } as RawProduct);
  }

  async update(id: string, storeId: string, dto: UpdateProductDto): Promise<ProductPublic> {
    const existing = await prisma.product.findFirst({ where: { id, storeId } });
    if (!existing) throw new AppError(404, 'Product not found');

    const { prismaData, unitType, unitLabel } = separateUnitFields(dto as unknown as Record<string, unknown>);

    const updated = await prisma.product.update({
      where: { id },
      data: prismaData as UpdateProductDto,
      include: { category: true },
    });

    if (unitType) {
      await prisma.$executeRaw`
        UPDATE Product SET unitType=${unitType}, unitLabel=${unitLabel ?? 'قطعة'}, updatedAt=NOW(3) WHERE id=${id}
      `;
    }

    const [unitRow] = await prisma.$queryRaw<{ unitType: string; unitLabel: string }[]>`
      SELECT unitType, unitLabel FROM Product WHERE id=${id}
    `;

    return toPublic({ ...updated, ...unitRow } as RawProduct);
  }

  async delete(id: string, storeId: string): Promise<void> {
    const product = await prisma.product.findFirst({ where: { id, storeId } });
    if (!product) throw new AppError(404, 'Product not found');
    await prisma.product.delete({ where: { id } });
  }
}

export const productService = new ProductService();
