'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cart.store';
import { toast } from 'sonner';
import { ShoppingBag, ArrowRight, Truck, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface StoreInfo { name: string; theme: string; logo?: string; }

const IRAQI_GOVERNORATES = [
  'بغداد', 'البصرة', 'نينوى', 'أربيل', 'النجف', 'كربلاء', 'السليمانية',
  'ديالى', 'الأنبار', 'بابل', 'واسط', 'ذي قار', 'المثنى', 'القادسية',
  'صلاح الدين', 'كركوك', 'ميسان', 'دهوك',
];

export default function CheckoutPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const { items, storeId, total, clearCart } = useCartStore();
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    customerName: '', customerPhone: '',
    governorate: '', city: '', address: '', notes: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  useEffect(() => {
    api.get<{ success: boolean; data: StoreInfo }>(`/api/storefront/${slug}`, { noAuth: true })
      .then(r => setStore(r.data)).catch(() => null);
  }, [slug]);

  const theme = store?.theme ?? '#432E54';

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center" dir="rtl" style={{ background: '#F5F0FA' }}>
      <div className="text-center">
        <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500">سلتك فارغة</p>
      </div>
    </div>
  );

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.customerName.trim()) e.customerName = 'الاسم مطلوب';
    if (!form.customerPhone.trim()) e.customerPhone = 'رقم الهاتف مطلوب';
    if (!form.governorate) e.governorate = 'المحافظة مطلوبة';
    if (!form.city.trim()) e.city = 'المدينة / الحي مطلوب';
    if (!form.address.trim()) e.address = 'العنوان مطلوب';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!storeId) { toast.error('خطأ في معرف المتجر'); return; }

    setSubmitting(true);
    try {
      const res = await api.post<{ success: boolean; data: { id: string; total: number } }>(
        `/api/storefront/${slug}/checkout`,
        {
          ...form,
          items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
        },
        { noAuth: true }
      );
      clearCart();
      router.push(`/store/${slug}/order-confirmation?orderId=${res.data.id}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'حدث خطأ، حاول مرة أخرى');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof typeof form) =>
    `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition ${errors[field] ? 'border-red-400 bg-red-50' : 'border-[#E8E0F0] focus:border-[#AE445A]'}`;

  return (
    <div className="min-h-screen" dir="rtl" style={{ background: '#F7F5FC' }}>
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href={`/store/${slug}/cart`} className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition" style={{ color: theme }}>
            <ArrowRight className="h-4 w-4" />
            العودة إلى السلة
          </Link>
          <div className="flex items-center gap-2">
            {store?.logo
              ? <Image src={store.logo} alt={store?.name ?? ''} width={28} height={28} className="rounded-lg object-contain" />
              : <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: theme }}>{store?.name?.charAt(0)}</div>}
            <span className="font-bold text-sm text-gray-900">{store?.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">إتمام الطلب</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: theme }}>١</span>
                  بيانات التواصل
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">الاسم الكامل *</label>
                    <input value={form.customerName} onChange={set('customerName')} placeholder="أحمد محمد علي"
                      className={inputClass('customerName')} />
                    {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم الهاتف *</label>
                    <input value={form.customerPhone} onChange={set('customerPhone')} placeholder="07XX XXX XXXX" type="tel"
                      className={inputClass('customerPhone')} />
                    {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: theme }}>٢</span>
                  عنوان التوصيل
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">المحافظة *</label>
                    <select value={form.governorate} onChange={set('governorate')}
                      className={inputClass('governorate') + ' cursor-pointer'}>
                      <option value="">اختر المحافظة</option>
                      {IRAQI_GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">المدينة / الحي *</label>
                    <input value={form.city} onChange={set('city')} placeholder="الكرخ، المنصور…"
                      className={inputClass('city')} />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">العنوان التفصيلي *</label>
                  <input value={form.address} onChange={set('address')} placeholder="الشارع، رقم البيت، علامة مميزة…"
                    className={inputClass('address')} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">ملاحظات (اختياري)</label>
                  <textarea value={form.notes} onChange={set('notes')} rows={2}
                    placeholder="أي تعليمات خاصة للتوصيل…"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E0F0] text-sm focus:outline-none focus:border-[#AE445A] transition resize-none" />
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: theme }}>٣</span>
                  طريقة الدفع
                </h2>
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-2" style={{ borderColor: theme, background: `${theme}08` }}>
                  <Truck className="h-5 w-5 flex-shrink-0" style={{ color: theme }} />
                  <div>
                    <p className="font-bold text-sm" style={{ color: theme }}>الدفع عند الاستلام</p>
                    <p className="text-xs text-gray-500 mt-0.5">ادفع نقداً عند وصول طلبك</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 mr-auto flex-shrink-0" style={{ color: theme }} />
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl p-6 h-fit shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">ملخص الطلب</h2>

              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#F5F0FA' }}>
                      {item.product.images?.[0]
                        ? <Image src={item.product.images[0]} alt={item.product.name} width={40} height={40} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-sm">📦</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">× {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 flex-shrink-0">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-5" style={{ borderColor: '#E8E0F0' }}>
                <div className="flex justify-between font-bold text-base">
                  <span className="text-gray-700">المجموع الكلي</span>
                  <span style={{ color: theme }}>{formatCurrency(total())}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">+ رسوم التوصيل (تحدد لاحقاً)</p>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full py-3.5 font-bold text-white rounded-2xl transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${theme}, #AE445A)` }}>
                {submitting
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> جارٍ تأكيد الطلب…</>
                  : '✓ تأكيد الطلب'}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">🛡️ بياناتك محمية ومشفرة</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
