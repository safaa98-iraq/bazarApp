'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cart.store';
import { ProductPublic, StorePublic } from '@storebuilder/types';
import { ShoppingCart, Search, Mail, Copy, Check, Star, X } from 'lucide-react';
import { toast } from 'sonner';
import { StoreAdPopup } from '@/components/storefront/StoreAdPopup';

interface BuilderSection {
  id: string; type: string; visible: boolean;
  settings: Record<string, string | number | boolean>;
}

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  linkUrl?: string;
  bgColor: string;
  textColor: string;
}

const DEFAULT_SECTIONS: BuilderSection[] = [
  { id: 'hero-default', type: 'hero', visible: true, settings: { title: 'مرحباً بك في متجرنا', subtitle: 'اكتشف أفضل المنتجات', buttonText: 'تسوق الآن', backgroundColor: '#432E54', height: 'large', textAlign: 'center' } },
  { id: 'products-default', type: 'products', visible: true, settings: { title: 'منتجاتنا المميزة', columns: 4, limit: 8, showComparePrice: true } },
];

// ── Scrolling Banner ───────────────────────────────────────────────────────────
function ScrollingBanner({ banners }: { banners: Banner[] }) {
  const active = banners.filter(b => b);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (active.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % active.length), 4000);
    return () => clearInterval(t);
  }, [active.length]);
  if (!active.length) return null;
  const b = active[idx];
  return (
    <div style={{ background: b.bgColor, color: b.textColor, padding: '10px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 100%', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{b.title}</span>
        {b.subtitle && <span style={{ fontSize: 13, opacity: 0.8, marginRight: 8 }}> · {b.subtitle}</span>}
        {b.linkUrl && <a href={b.linkUrl} style={{ color: b.textColor, fontWeight: 700, fontSize: 12, marginRight: 12, opacity: 0.9, textDecoration: 'underline' }}>اعرف المزيد</a>}
      </div>
      {active.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 4 }}>
          {active.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 18 : 6, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'width .3s' }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Countdown Timer ────────────────────────────────────────────────────────────
function CountdownTimer({ hours }: { hours: number }) {
  const end = useRef(Date.now() + hours * 3600000);
  const [left, setLeft] = useState(end.current - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, end.current - Date.now())), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      {[[h, 'ساعة'], [m, 'دقيقة'], [s, 'ثانية']].map(([val, label]) => (
        <div key={String(label)} className="flex flex-col items-center">
          <span className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>{pad(Number(val))}</span>
          <span className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────────
function ProductCard({ product, slug, theme, showCompare, showAddToCart, onAddToCart }: {
  product: ProductPublic; slug: string; theme: string;
  showCompare: boolean; showAddToCart: boolean; onAddToCart: () => void;
}) {
  return (
    <div className="group rounded-2xl border overflow-hidden transition hover:shadow-lg hover:-translate-y-1 bg-white" style={{ borderColor: '#E8E0F0' }}>
      <Link href={`/store/${slug}/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden" style={{ background: '#F5F0FA' }}>
          {product.images?.[0]
            ? <Image src={product.images[0]} alt={product.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            : <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">📦</div>}
        </div>
      </Link>
      <div className="p-4">
        {product.category && <p className="text-xs font-medium mb-1" style={{ color: '#AE445A' }}>{product.category.name}</p>}
        <Link href={`/store/${slug}/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:opacity-80 transition line-clamp-2 text-sm mb-1.5">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-base" style={{ color: theme }}>{formatCurrency(product.price)}</span>
          {showCompare && product.comparePrice && (
            <span className="text-xs text-gray-400 line-through">{formatCurrency(product.comparePrice)}</span>
          )}
        </div>
        {showAddToCart !== false && (
          <button onClick={onAddToCart} disabled={product.stock === 0}
            className="w-full py-2.5 text-sm font-bold rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
            style={{ background: product.stock > 0 ? theme : '#9ca3af', color: 'white' }}>
            {product.stock === 0 ? 'نفد المخزون' : 'أضف للسلة'}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Section Renderer ───────────────────────────────────────────────────────────
function RenderSection({ section, products, slug, theme, search, setSearch, addItem }: {
  section: BuilderSection; products: ProductPublic[]; slug: string; theme: string;
  search: string; setSearch: (s: string) => void; addItem: (p: ProductPublic) => void;
}) {
  const s = section.settings;
  const [copiedCode, setCopiedCode] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  if (!section.visible) return null;

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  switch (section.type) {
    case 'announcement':
      if (dismissed) return null;
      return (
        <div className="py-2.5 px-4 text-center text-sm font-medium relative"
          style={{ background: String(s.backgroundColor ?? theme), color: String(s.textColor ?? '#fff') }}>
          {s.link ? <a href={String(s.link)}>{String(s.text)}</a> : String(s.text)}
          {s.dismissible && (
            <button onClick={() => setDismissed(true)} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      );

    case 'hero': {
      const heightMap: Record<string, string> = { small: 'py-12', medium: 'py-20', large: 'py-32', fullscreen: 'min-h-screen flex items-center' };
      const hasImg = Boolean(s.backgroundImage);
      return (
        <div className={`${heightMap[String(s.height)] ?? 'py-24'} px-6 relative overflow-hidden`}
          style={{ background: hasImg ? `url(${s.backgroundImage}) center/cover no-repeat` : String(s.backgroundColor ?? theme) }}>
          {hasImg && <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${Number(s.overlayOpacity ?? 40) / 100})` }} />}
          <div className="relative max-w-4xl mx-auto" style={{ textAlign: String(s.textAlign ?? 'center') as React.CSSProperties['textAlign'] }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow leading-tight">{String(s.title)}</h1>
            {s.subtitle && <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">{String(s.subtitle)}</p>}
            {s.buttonText && (
              <a href={String(s.buttonUrl ?? '#products')}
                className="inline-block px-8 py-3.5 rounded-2xl font-bold text-base transition hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                style={{ background: 'white', color: String(s.backgroundColor ?? theme) }}>
                {String(s.buttonText)}
              </a>
            )}
          </div>
        </div>
      );
    }

    case 'discount': {
      const copyCode = () => {
        navigator.clipboard.writeText(String(s.couponCode));
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
        toast.success(`تم نسخ الكود: ${s.couponCode}`);
      };
      return (
        <section className="py-14 px-6" style={{ background: String(s.backgroundColor ?? '#432E54') }}>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
              style={{ background: String(s.badgeColor ?? '#AE445A'), color: 'white' }}>
              {String(s.discountLabel ?? 'عرض خاص')}
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-2">{String(s.title)}</h2>
            {s.subtitle && <p className="mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>{String(s.subtitle)}</p>}
            <button onClick={copyCode}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-mono font-bold text-xl transition hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px dashed rgba(255,255,255,0.4)', letterSpacing: 3 }}>
              {String(s.couponCode)}
              {copiedCode ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5 opacity-60" />}
            </button>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>انقر للنسخ</p>
            {s.showTimer && <CountdownTimer hours={Number(s.expiryHours ?? 24)} />}
          </div>
        </section>
      );
    }

    case 'features':
      return (
        <section className="py-14 px-6 max-w-6xl mx-auto">
          {s.title && <h2 className="text-2xl font-bold text-center mb-10" style={{ color: '#432E54' }}>{String(s.title)}</h2>}
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${Math.min(Number(s.columns ?? 4), 4)}, minmax(0,1fr))` }}>
            {[1, 2, 3, 4].map(i => s[`feature${i}Title`] ? (
              <div key={i} className="text-center p-6 rounded-2xl border hover:shadow-md transition" style={{ borderColor: '#E8E0F0' }}>
                <div className="text-4xl mb-4">{String(s[`feature${i}Icon`] ?? '⭐')}</div>
                <h3 className="font-bold text-gray-900 mb-2">{String(s[`feature${i}Title`])}</h3>
                <p className="text-sm text-gray-500">{String(s[`feature${i}Desc`] ?? '')}</p>
              </div>
            ) : null)}
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section className="py-14 px-6" style={{ background: '#F5F0FA' }}>
          <div className="max-w-5xl mx-auto">
            {s.title && <h2 className="text-2xl font-bold text-center mb-10" style={{ color: '#432E54' }}>{String(s.title)}</h2>}
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => s[`review${i}Name`] ? (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: '#E8E0F0' }}>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: Number(s[`review${i}Stars`] ?? 5) }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{String(s[`review${i}Text`] ?? '')}&rdquo;</p>
                  <p className="font-bold text-sm" style={{ color: '#432E54' }}>{String(s[`review${i}Name`])}</p>
                </div>
              ) : null)}
            </div>
          </div>
        </section>
      );

    case 'gallery': {
      const cols = Number(s.columns ?? 3);
      const imgs = [1, 2, 3, 4, 5, 6].map(i => String(s[`image${i}`] ?? '')).filter(Boolean);
      if (!imgs.length) return null;
      return (
        <section className="py-12 px-6 max-w-6xl mx-auto">
          {s.title && <h2 className="text-2xl font-bold mb-6" style={{ color: '#432E54' }}>{String(s.title)}</h2>}
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
            {imgs.map((src, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                <Image src={src} alt="" width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
              </div>
            ))}
          </div>
        </section>
      );
    }

    case 'categories':
      return (
        <section className="py-12 px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#432E54' }}>{String(s.title)}</h2>
          <div className="flex gap-3 flex-wrap">
            {Array.from(new Set(products.map(p => p.category?.name).filter(Boolean))).map(cat => (
              <button key={cat} onClick={() => setSearch(cat!)}
                className="px-5 py-2.5 rounded-2xl font-medium text-sm transition hover:-translate-y-0.5"
                style={{ background: `${theme}15`, color: theme, border: `1.5px solid ${theme}30` }}>
                {cat}
              </button>
            ))}
          </div>
        </section>
      );

    case 'products':
      return (
        <section id="products" className="py-12 px-6 max-w-6xl mx-auto">
          {s.title && <h2 className="text-2xl font-bold mb-2" style={{ color: '#432E54' }}>{String(s.title)}</h2>}
          {s.subtitle && <p className="text-gray-500 mb-8">{String(s.subtitle)}</p>}
          {filtered.length === 0
            ? <div className="text-center py-16 text-gray-400"><p className="text-lg">لا توجد منتجات مطابقة</p></div>
            : <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${Math.min(Number(s.columns ?? 4), 4)}, minmax(0, 1fr))` }}>
                {filtered.slice(0, Number(s.limit ?? 8)).map(product => (
                  <ProductCard key={product.id} product={product} slug={slug} theme={theme}
                    showCompare={Boolean(s.showComparePrice)} showAddToCart={s.showAddToCart !== false}
                    onAddToCart={() => { addItem(product); toast.success(`${product.name} أُضيف للسلة`); }} />
                ))}
              </div>
          }
        </section>
      );

    case 'about':
      return (
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <div className={`flex gap-12 items-center ${s.imagePosition === 'left' ? 'flex-row-reverse' : ''}`}>
            {s.imageUrl && (
              <div className="w-72 h-72 flex-shrink-0 rounded-3xl overflow-hidden">
                <Image src={String(s.imageUrl)} alt="about" width={320} height={320} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#432E54' }}>{String(s.title)}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{String(s.content)}</p>
            </div>
          </div>
        </section>
      );

    case 'newsletter':
      return (
        <section className="py-16 px-6 text-center" style={{ background: String(s.backgroundColor ?? '#4B4376') }}>
          <h2 className="text-2xl font-bold text-white mb-2">{String(s.title)}</h2>
          {s.subtitle && <p className="mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>{String(s.subtitle)}</p>}
          <form onSubmit={e => { e.preventDefault(); toast.success('شكراً لاشتراكك!'); }}
            className="flex gap-3 max-w-md mx-auto">
            <input type="email" required placeholder={String(s.placeholder ?? 'أدخل بريدك الإلكتروني')}
              className="flex-1 px-4 py-3 rounded-2xl text-sm focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }} />
            <button type="submit" className="px-6 py-3 rounded-2xl font-bold text-sm transition hover:opacity-90"
              style={{ background: '#AE445A', color: 'white' }}>
              {String(s.buttonText ?? 'اشترك')}
            </button>
          </form>
        </section>
      );

    case 'divider':
      return (
        <div style={{ height: Number(s.height ?? 40), display: 'flex', alignItems: 'center', padding: '0 48px' }}>
          {s.showLine && <div style={{ width: '100%', height: 1, background: String(s.lineColor ?? '#E8E0F0') }} />}
        </div>
      );

    default: return null;
  }
}

// ── Main Storefront Page ───────────────────────────────────────────────────────
export default function StorefrontPage() {
  const { slug } = useParams() as { slug: string };
  const [storeInfo, setStoreInfo] = useState<StorePublic | null>(null);
  const [products, setProducts] = useState<ProductPublic[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [sections, setSections] = useState<BuilderSection[]>(DEFAULT_SECTIONS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [suspendReason, setSuspendReason] = useState<string | null>(null);
  const { addItem, setStoreId, itemCount } = useCartStore();

  useEffect(() => {
    async function load() {
      try {
        const [storeRes, productsRes, categoriesRes] = await Promise.all([
          api.get<{ success: boolean; data: StorePublic; suspendReason?: string }>(`/api/storefront/${slug}`, { noAuth: true }),
          api.get<{ success: boolean; data: ProductPublic[] }>(`/api/storefront/${slug}/products`, { noAuth: true }),
          api.get<{ success: boolean; data: { id: string; name: string }[] }>(`/api/storefront/${slug}/categories`, { noAuth: true }),
        ]);
        setStoreInfo(storeRes.data);
        setProducts(productsRes.data ?? []);
        setCategories(categoriesRes.data ?? []);
        setStoreId(storeRes.data.id);
        if (storeRes.data.builderConfig) {
          try {
            const parsed = JSON.parse(storeRes.data.builderConfig);
            if (Array.isArray(parsed)) {
              setSections(parsed);
            } else {
              if (parsed.home) setSections(parsed.home);
              if (Array.isArray(parsed.banners)) setBanners(parsed.banners.filter((b: Banner & { active?: boolean }) => b.active !== false));
            }
          } catch { /* use defaults */ }
        }
      } catch (err: unknown) {
        const e = err as { status?: number; suspendReason?: string; message?: string };
        if (e?.status === 503 || (e?.message && e.message.includes('suspend'))) {
          setSuspendReason(e?.suspendReason ?? 'هذا المتجر متوقف مؤقتاً');
        }
      }
      finally { setLoading(false); }
    }
    load();
  }, [slug, setStoreId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F0FA' }}>
      <div className="animate-spin h-10 w-10 border-4 rounded-full" style={{ borderColor: '#432E54', borderTopColor: 'transparent' }} />
    </div>
  );

  if (suspendReason) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F0FA' }}>
      <div className="text-center max-w-sm px-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#FEE2E2' }}>
          <span className="text-3xl">🔒</span>
        </div>
        <p className="text-xl font-bold mb-2" style={{ color: '#432E54' }}>المتجر موقوف مؤقتاً</p>
        <p className="text-sm text-gray-500 leading-relaxed">{suspendReason}</p>
      </div>
    </div>
  );

  if (!storeInfo) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F0FA' }}>
      <div className="text-center">
        <p className="text-2xl font-bold mb-2" style={{ color: '#432E54' }}>المتجر غير موجود</p>
        <p className="text-gray-500">هذا المتجر غير متاح حالياً</p>
      </div>
    </div>
  );

  const theme = storeInfo.theme ?? '#432E54';
  const merchantPlan = (storeInfo as typeof storeInfo & { merchantPlan?: string }).merchantPlan ?? 'FREE';
  const filteredProducts = activeCat === 'all' ? products : products.filter(p => p.categoryId === activeCat);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <ScrollingBanner banners={banners} />
      {/* Navbar */}
      <nav className="sticky top-0 z-20 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href={`/store/${slug}`} className="flex items-center gap-2.5">
            {storeInfo.logo
              ? <Image src={storeInfo.logo} alt={storeInfo.name} width={36} height={36} className="rounded-xl object-contain" />
              : <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: theme }}>{storeInfo.name.charAt(0)}</div>}
            <span className="font-bold text-gray-900 text-lg">{storeInfo.name}</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن منتج…"
                className="pr-10 pl-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 w-52"
                style={{ '--tw-ring-color': theme } as React.CSSProperties} />
            </div>
            <Link href={`/store/${slug}/cart`} className="relative p-2 rounded-xl hover:bg-gray-100 transition">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {itemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  style={{ background: theme }}>{itemCount()}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Category filter nav */}
      {categories.length > 0 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 24px 8px', marginBottom: 0, scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveCat('all')}
            style={{ flexShrink: 0, padding: '8px 20px', borderRadius: 99, fontFamily: 'inherit', fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none', background: activeCat === 'all' ? theme : '#F5F0FA', color: activeCat === 'all' ? '#fff' : '#432E54', transition: 'all .2s' }}>
            الكل
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              style={{ flexShrink: 0, padding: '8px 20px', borderRadius: 99, fontFamily: 'inherit', fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none', background: activeCat === cat.id ? theme : '#F5F0FA', color: activeCat === cat.id ? '#fff' : '#432E54', transition: 'all .2s' }}>
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Render all sections */}
      {sections.map(section => (
        <RenderSection
          key={section.id}
          section={section}
          products={filteredProducts}
          slug={slug}
          theme={theme}
          search={search}
          setSearch={setSearch}
          addItem={p => { addItem(p); }}
        />
      ))}

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs text-gray-400 mt-8">
        <Mail className="h-4 w-4 inline ml-1" />
        مدعوم بـ <span className="font-semibold" style={{ color: '#AE445A' }}>بناء المتجر</span>
      </footer>

      {/* Google Ads popup — FREE plan only */}
      {merchantPlan === 'FREE' && (
        <StoreAdPopup
          storeName={storeInfo.name}
          storeSlug={slug}
          themeColor={theme}
        />
      )}
    </div>
  );
}
