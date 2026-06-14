import prisma from '@storebuilder/database';
import { CreateOrderDto, OrderPublic, OrderStatusType } from '@storebuilder/types';
import { AppError } from '../middleware/errorHandler';
import { Decimal } from '@prisma/client/runtime/library';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPublic(order: any): OrderPublic {
  return {
    id: order.id,
    storeId: order.storeId,
    customerId: order.customerId,
    customerEmail: order.customerEmail,
    customerName: order.customerName,
    total: Number(order.total),
    status: order.status as OrderStatusType,
    shippingAddress: order.shippingAddress as OrderPublic['shippingAddress'],
    stripePaymentId: order.stripePaymentId,
    createdAt: order.createdAt.toISOString(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: order.items.map((i: any) => ({
      id: i.id,
      productId: i.productId,
      quantity: i.quantity,
      price: Number(i.price),
      product: i.product ?? undefined,
    })),
    store: order.store ?? undefined,
  };
}

export class OrderService {
  async create(dto: CreateOrderDto, customerId?: string): Promise<OrderPublic> {
    // Validate products and compute total
    const productIds = dto.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, storeId: dto.storeId, isActive: true },
    });

    if (products.length !== productIds.length) {
      throw new AppError(400, 'One or more products are unavailable');
    }

    const itemsData = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.stock < item.quantity) {
        throw new AppError(400, `Insufficient stock for ${product.name}`);
      }
      return { productId: item.productId, quantity: item.quantity, price: product.price };
    });

    const total = itemsData.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          storeId: dto.storeId,
          customerId: customerId ?? null,
          customerEmail: dto.customerEmail,
          customerName: dto.customerName,
          total,
          shippingAddress: dto.shippingAddress as unknown as import('@prisma/client').Prisma.InputJsonValue,
          stripePaymentId: dto.stripePaymentId ?? null,
          items: { create: itemsData },
        },
        include: { items: { include: { product: { select: { name: true, images: true } } } } },
      });

      // Decrement stock
      await Promise.all(
        itemsData.map((i) =>
          tx.product.update({
            where: { id: i.productId },
            data: { stock: { decrement: i.quantity } },
          })
        )
      );

      return created;
    });

    return toPublic(order);
  }

  async listByStore(
    storeId: string,
    opts: { status?: string; page?: number; limit?: number }
  ): Promise<{ items: OrderPublic[]; total: number }> {
    const page = opts.page ?? 1;
    const limit = opts.limit ?? 20;
    const skip = (page - 1) * limit;

    const where = {
      storeId,
      ...(opts.status ? { status: opts.status as OrderStatusType } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { items: { include: { product: { select: { name: true, images: true } } } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return { items: items.map(toPublic), total };
  }

  async getById(id: string, storeId?: string): Promise<OrderPublic> {
    const order = await prisma.order.findFirst({
      where: { id, ...(storeId ? { storeId } : {}) },
      include: {
        items: { include: { product: { select: { name: true, images: true } } } },
        store: { select: { name: true, slug: true } },
      },
    });
    if (!order) throw new AppError(404, 'Order not found');
    return toPublic(order);
  }

  async updateStatus(
    id: string,
    storeId: string,
    status: OrderStatusType
  ): Promise<OrderPublic> {
    const order = await prisma.order.findFirst({ where: { id, storeId } });
    if (!order) throw new AppError(404, 'Order not found');

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: { include: { product: { select: { name: true, images: true } } } } },
    });
    return toPublic(updated);
  }
}

export const orderService = new OrderService();
