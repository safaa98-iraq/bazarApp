import prisma from '@storebuilder/database';
import { CreateStoreDto, UpdateStoreDto, StorePublic } from '@storebuilder/types';
import { AppError } from '../middleware/errorHandler';

function toPublic(store: {
  id: string; name: string; slug: string;
  description: string | null; logo: string | null;
  theme: string; template: string;
  isActive: boolean; isPublished: boolean;
  builderConfig?: string | null;
  storeType?: string; currency?: string;
  createdAt: Date;
  merchant?: { id: string; name: string; email: string; plan: string } | null;
}): StorePublic {
  return {
    id: store.id, name: store.name, slug: store.slug,
    description: store.description, logo: store.logo,
    theme: store.theme, template: store.template,
    isActive: store.isActive, isPublished: store.isPublished,
    builderConfig: store.builderConfig,
    storeType: store.storeType ?? 'fashion',
    currency: store.currency ?? 'IQD',
    createdAt: store.createdAt.toISOString(),
    merchant: store.merchant ?? undefined,
  };
}

const merchantInclude = { merchant: { select: { id: true, name: true, email: true, plan: true } } };

export class StoreService {
  async create(merchantId: string, dto: CreateStoreDto): Promise<StorePublic> {
    const existing = await prisma.store.findUnique({ where: { merchantId } });
    if (existing) throw new AppError(409, 'You already have a store');

    const slugTaken = await prisma.store.findUnique({ where: { slug: dto.slug } });
    if (slugTaken) throw new AppError(409, 'This URL slug is already taken');

    const store = await prisma.store.create({
      data: { ...dto, merchantId },
      include: merchantInclude,
    });
    return toPublic(store);
  }

  async getByMerchant(merchantId: string): Promise<StorePublic | null> {
    const store = await prisma.store.findUnique({
      where: { merchantId },
      include: merchantInclude,
    });
    return store ? toPublic(store) : null;
  }

  async update(merchantId: string, dto: UpdateStoreDto): Promise<StorePublic> {
    const store = await prisma.store.findUnique({ where: { merchantId } });
    if (!store) throw new AppError(404, 'Store not found');

    const updated = await prisma.store.update({
      where: { merchantId },
      data: dto,
      include: merchantInclude,
    });
    return toPublic(updated);
  }

  async getBySlug(slug: string): Promise<StorePublic | null> {
    const store = await prisma.store.findUnique({
      where: { slug },
      include: merchantInclude,
    });
    return store ? toPublic(store) : null;
  }

  async adminUpdate(storeId: string, dto: Partial<UpdateStoreDto>): Promise<StorePublic> {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new AppError(404, 'Store not found');

    const updated = await prisma.store.update({
      where: { id: storeId },
      data: dto,
      include: merchantInclude,
    });
    return toPublic(updated);
  }
}

export const storeService = new StoreService();
