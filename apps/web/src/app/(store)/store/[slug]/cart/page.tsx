'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/stores/cart.store';
import { formatCurrency } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

interface StoreInfo { name: string; theme: string; logo?: string; }

export default function CartPage() {
  const { slug } = useParams() as { slug: string };
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [store, setStore] = useState<StoreInfo | null>(null);

  useEffect(() => {
    api.get<{ success: boolean; data: StoreInfo }>(`/api/storefront/${slug}`, { noAuth: true })
      .then(r => setStore(r.data)).catch(() => null);
  }, [slug]);

  const theme = store?.theme ?? '#432E54';

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center" dir="rtl" style={{ background: '#F5F0FA' }}>
      <div className="text-center px-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${theme}15` }}>
          <ShoppingBag className="h-10 w-10" style={{ color: theme }} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">سلتك فارغة</h2>
        <p className="text-gray-500 mb-6">لم تضف أي منتجات بعد</p>
        <Link href={`/store/${slug}`}
          className="inline-block px-8 py-3 font-bold text-white rounded-2xl transition hover:opacity-90"
          style={{ background: theme }}>
          تصفح المنتجات
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" dir="rtl" style={{ background: '#F7F5FC' }}>
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href={`/store/${slug}`} className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition" style={{ color: theme }}>
            <ArrowRight className="h-4 w-4" />
            متابعة التسوق
          </Link>
          <span className="text-sm text-gray-500 font-medium">{items.length} منتج{items.length !== 1 ? '' : ''}</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">سلة التسوق</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                <div className="h-20 w-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#F5F0FA' }}>
                  {item.product.images?.[0]
                    ? <Image src={item.product.images[0]} alt={item.product.name} width={80} height={80} className="w-full h-full object-cover" />
                    : <div className="h-full w-full flex items-center justify-center text-2xl">📦</div>}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate text-sm">{item.product.name}</p>
                  <p className="font-bold mt-0.5" style={{ color: theme }}>{formatCurrency(item.product.price)}</p>
                </div>

                <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: '#E8E0F0' }}>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-2 hover:bg-gray-50 transition">
                    <Minus className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                  <span className="px-3 text-sm font-bold text-gray-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-2 hover:bg-gray-50 transition">
                    <Plus className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                </div>

                <p className="font-bold text-gray-900 w-20 text-center text-sm">
                  {formatCurrency(item.product.price * item.quantity)}
                </p>

                <button onClick={() => removeItem(item.product.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition text-gray-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 h-fit shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 text-base">ملخص الطلب</h2>
            <div className="space-y-3 text-sm mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate flex-1 ml-2">{item.product.name} × {item.quantity}</span>
                  <span className="font-medium flex-shrink-0">{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-base" style={{ borderColor: '#E8E0F0' }}>
                <span>المجموع</span>
                <span style={{ color: theme }}>{formatCurrency(total())}</span>
              </div>
            </div>

            <Link href={`/store/${slug}/checkout`}
              className="block w-full py-3.5 font-bold text-center text-white rounded-2xl transition hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${theme}, #AE445A)` }}>
              إتمام الطلب ←
            </Link>

            <p className="text-center text-xs text-gray-400 mt-3">🔒 بياناتك محمية وآمنة</p>
          </div>
        </div>
      </div>
    </div>
  );
}
