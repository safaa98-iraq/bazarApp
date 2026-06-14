'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cart.store';
import { ProductPublic, RecommendedProduct } from '@storebuilder/types';
import { toast } from 'sonner';
import { ArrowRight, ShoppingCart, Minus, Plus, Sparkles, ShoppingBag } from 'lucide-react';

interface StoreInfo { id: string; name: string; slug: string; theme: string; logo?: string; }

function getOrCreateSessionId(): string {
  let sid = sessionStorage.getItem('sb_session');
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('sb_session', sid);
  }
  return sid;
}

export default function ProductDetailPage() {
  const { slug, id } = useParams() as { slug: string; id: string };
  const [product, setProduct] = useState<ProductPublic | null>(null);
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const { addItem, itemCount } = useCartStore();
  const tracked = useRef(false);

  useEffect(() => {
    async function load() {
      try {
        const [storeRes, productRes] = await Promise.all([
          api.get<{ success: boolean; data: StoreInfo }>(`/api/storefront/${slug}`, { noAuth: true }),
          api.get<{ success: boolean; data: ProductPublic }>(`/api/storefront/${slug}/products/${id}`, { noAuth: true }),
        ]);
        setStore(storeRes.data);
        setProduct(productRes.data);

        if (!tracked.current) {
          tracked.current = true;
          const sessionId = getOrCreateSessionId();
          api.post('/api/ai/track-view', { productId: id, sessionId }, { noAuth: true }).catch(() => null);
          api.get<{ success: boolean; data: RecommendedProduct[] }>(
            `/api/ai/recommendations/${storeRes.data.id}?sessionId=${sessionId}`, { noAuth: true }
          ).then(r => setRecommendations(r.data ?? [])).catch(() => null);
        }
      } catch { /* handled by loading state */ }
      finally { setLoading(false); }
    }
    load();
  }, [slug, id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F0FA' }}>
      <div className="animate-spin h-10 w-10 border-4 rounded-full" style={{ borderColor: '#432E54', borderTopColor: 'transparent' }} />
    </div>
  );

  if (!product || !store) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F0FA' }}>
      <div className="text-center">
        <p className="text-2xl font-bold mb-2" style={{ color: '#432E54' }}>المنتج غير موجود</p>
        <Link href={`/store/${slug}`} className="text-sm hover:underline" style={{ color: '#AE445A' }}>العودة إلى المتجر</Link>
      </div>
    </div>
  );

  const theme = store.theme ?? '#432E54';
  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    toast.success(`تمت الإضافة إلى السلة ✓`);
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href={`/store/${slug}`} className="flex items-center gap-2.5">
            {store.logo
              ? <Image src={store.logo} alt={store.name} width={36} height={36} className="rounded-xl object-contain" />
              : <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: theme }}>{store.name.charAt(0)}</div>}
            <span className="font-bold text-gray-900 text-lg">{store.name}</span>
          </Link>
          <Link href={`/store/${slug}/cart`} className="relative p-2 rounded-xl hover:bg-gray-100 transition">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            {itemCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: theme }}>
                {itemCount()}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link href={`/store/${slug}`} className="inline-flex items-center gap-1.5 text-sm mb-8 hover:opacity-70 transition" style={{ color: theme }}>
          <ArrowRight className="h-4 w-4" />
          العودة إلى المتجر
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden mb-3" style={{ background: '#F5F0FA' }}>
              {product.images?.[activeImage]
                ? <Image src={product.images[activeImage]} alt={product.name} width={600} height={600} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-6xl text-gray-200">📦</div>}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className="w-16 h-16 rounded-xl overflow-hidden border-2 transition"
                    style={{ borderColor: i === activeImage ? theme : 'transparent' }}>
                    <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.category && (
              <span className="text-sm font-medium mb-2" style={{ color: theme }}>{product.category.name}</span>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-extrabold" style={{ color: theme }}>{formatCurrency(product.price)}</span>
              {product.comparePrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatCurrency(product.comparePrice)}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-sm font-bold text-white" style={{ background: '#AE445A' }}>
                    خصم {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="mb-5">
              {product.stock > 0
                ? <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    متوفر في المخزون ({product.stock} قطعة)
                  </span>
                : <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    نفد المخزون
                  </span>}
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">{product.description}</p>
            )}

            {product.stock > 0 && (
              <>
                {/* Quantity */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-sm font-semibold text-gray-700">الكمية</span>
                  <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: '#E8E0F0' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 hover:bg-gray-50 transition">
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="px-5 text-sm font-bold text-gray-900">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-2.5 hover:bg-gray-50 transition">
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 font-bold rounded-2xl text-white transition hover:opacity-90"
                    style={{ background: theme }}>
                    <ShoppingBag className="h-5 w-5" />
                    أضف إلى السلة
                  </button>
                  <Link href={`/store/${slug}/checkout`}
                    onClick={() => { for (let i = 0; i < quantity; i++) addItem(product); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 font-bold rounded-2xl border-2 transition hover:bg-gray-50"
                    style={{ borderColor: theme, color: theme }}>
                    اشتري الآن
                  </Link>
                </div>
              </>
            )}

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {['🚚 توصيل سريع', '🔒 دفع آمن', '↩️ إرجاع مريح'].map(b => (
                <span key={b} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: `${theme}12`, color: theme }}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5" style={{ color: theme }} />
              <h2 className="text-xl font-bold text-gray-900">قد يعجبك أيضاً</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map(rec => (
                <Link key={rec.id} href={`/store/${slug}/product/${rec.id}`}
                  className="group bg-white border rounded-2xl overflow-hidden hover:shadow-md transition"
                  style={{ borderColor: '#E8E0F0' }}>
                  <div className="aspect-square overflow-hidden" style={{ background: '#F5F0FA' }}>
                    {rec.images?.[0]
                      ? <Image src={rec.images[0]} alt={rec.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      : <div className="w-full h-full flex items-center justify-center text-4xl text-gray-200">📦</div>}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{rec.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: theme }}>{formatCurrency(rec.price)}</span>
                      {rec.comparePrice && <span className="text-xs text-gray-400 line-through">{formatCurrency(rec.comparePrice)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
