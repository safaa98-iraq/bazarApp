'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Sparkles, Search, Loader2, X, Upload, Image as ImageIcon, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { ProductPublic, CategoryPublic, AIDescriptionResult, AIPriceResult } from '@storebuilder/types';
import { formatCurrency } from '@/lib/utils';
import { AIDescriptionButton } from '@/components/ai/AIDescriptionButton';
import { AIPriceButton } from '@/components/ai/AIPriceButton';
import { getStoreType } from '@/lib/store-types';
import { useAuthStore } from '@/lib/stores/auth.store';
import { canUseFeature, getFeatureLimit, Plan } from '@/lib/plan-features';
import Image from 'next/image';
import { trackPage, track } from '@/lib/track';

const BRAND = { primary: '#432E54', secondary: '#4B4376', accent: '#AE445A', light: '#E8BCB9' };

interface ProductForm {
  name: string; description: string; price: string; comparePrice: string;
  stock: string; unit: string; categoryId: string; keyFeatures: string;
  seoTitle: string; seoDescription: string; seoSlug: string;
  images: string[];
}
const emptyForm: ProductForm = {
  name: '', description: '', price: '', comparePrice: '',
  stock: '0', unit: 'piece', categoryId: '', keyFeatures: '',
  seoTitle: '', seoDescription: '', seoSlug: '', images: [],
};

function ImageUploader({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(files).slice(0, 6).forEach(f => fd.append('images', f));
      const res = await api.upload<{ success: boolean; data: { urls: string[] } }>('/api/upload', fd);
      onChange([...images, ...res.data.urls].slice(0, 6));
      toast.success('تم رفع الصور بنجاح');
    } catch { toast.error('فشل رفع الصور'); }
    finally { setUploading(false); }
  };

  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: BRAND.primary }}>صور المنتج</label>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border" style={{ borderColor: '#E8E0F0' }}>
            <Image src={url} alt="" fill className="object-cover" />
            <button type="button" onClick={() => onChange(images.filter((_, j) => j !== i))}
              className="absolute top-1 left-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition">
              <X className="h-3 w-3" />
            </button>
            {i === 0 && <span className="absolute bottom-1 right-1 text-xs px-1.5 py-0.5 rounded-full text-white font-bold" style={{ background: BRAND.accent }}>رئيسية</span>}
          </div>
        ))}
        {images.length < 6 && (
          <label className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition"
            style={{ borderColor: BRAND.light }}>
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" style={{ color: BRAND.accent }} /> : <>
              <Upload className="h-5 w-5 mb-1" style={{ color: BRAND.accent }} />
              <span className="text-xs font-medium" style={{ color: BRAND.accent }}>رفع صورة</span>
            </>}
            <input type="file" accept="image/*" multiple className="hidden" disabled={uploading}
              onChange={e => handleFiles(e.target.files)} />
          </label>
        )}
      </div>
      {images.length === 0 && (
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-px" style={{ background: '#E8E0F0' }} />
          <span className="text-xs text-gray-400">أو أدخل رابط صورة</span>
          <div className="flex-1 h-px" style={{ background: '#E8E0F0' }} />
        </div>
      )}
      <input
        placeholder="https://example.com/image.jpg"
        className="mt-2 w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 transition"
        style={{ borderColor: '#E8E0F0' }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const val = (e.target as HTMLInputElement).value.trim();
            if (val && images.length < 6) { onChange([...images, val]); (e.target as HTMLInputElement).value = ''; }
          }
        }}
      />
      <p className="text-xs text-gray-400 mt-1">اضغط Enter لإضافة الرابط • حتى 6 صور</p>
    </div>
  );
}

export default function ProductsPage() {
  const plan = (useAuthStore(s => s.user?.plan) ?? 'FREE') as Plan;
  const productLimit = getFeatureLimit(plan, 'products');
  const canAddMore = productLimit === null || productLimit === undefined;
  const canUseAI = canUseFeature(plan, 'ai');
  const [products, setProducts] = useState<ProductPublic[]>([]);
  const [categories, setCategories] = useState<CategoryPublic[]>([]);
  const [storeType, setStoreType] = useState<string>('fashion');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [generatingSEO, setGeneratingSEO] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'seo'>('basic');

  useEffect(() => { trackPage('products'); }, []);

  const fetchAll = useCallback(async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        api.get<{ success: boolean; data: ProductPublic[] }>(`/api/products?search=${search}`),
        api.get<{ success: boolean; data: CategoryPublic[] }>('/api/categories'),
      ]);
      setProducts(pRes.data ?? []);
      setCategories(cRes.data ?? []);
      try {
        const sRes = await api.get<{ success: boolean; data: { storeType?: string } }>('/api/stores/my');
        if (sRes.data?.storeType) setStoreType(sRes.data.storeType);
      } catch { /* no store yet */ }
    } catch { toast.error('فشل تحميل المنتجات'); }
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openNew = () => { setEditingId(null); setForm({ ...emptyForm, unit: getStoreType(storeType).defaultUnit }); setActiveTab('basic'); setShowModal(true); };
  const openEdit = (p: ProductPublic) => {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description ?? '', price: String(p.price),
      comparePrice: p.comparePrice ? String(p.comparePrice) : '',
      stock: String(p.stock), unit: p.unit ?? getStoreType(storeType).defaultUnit,
      categoryId: p.categoryId ?? '', keyFeatures: '',
      seoTitle: p.seoTitle ?? '', seoDescription: p.seoDescription ?? '',
      seoSlug: p.seoSlug ?? '', images: p.images ?? [],
    });
    setActiveTab('basic'); setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const body = {
        name: form.name, description: form.description || undefined,
        price: parseFloat(form.price),
        comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : undefined,
        stock: parseInt(form.stock), unit: form.unit || undefined,
        categoryId: form.categoryId || undefined,
        images: form.images,
        seoTitle: form.seoTitle || undefined, seoDescription: form.seoDescription || undefined,
        seoSlug: form.seoSlug || undefined,
      };
      if (editingId) {
        await api.patch(`/api/products/${editingId}`, body);
        toast.success('تم تحديث المنتج');
        track({ event: 'product_edited' });
      } else {
        await api.post('/api/products', body);
        toast.success('تم إنشاء المنتج');
        track({ event: 'product_added' });
      }
      setShowModal(false); fetchAll();
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'فشل الحفظ'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try { await api.delete(`/api/products/${id}`); toast.success('تم الحذف'); fetchAll(); }
    catch { toast.error('فشل الحذف'); }
  };

  const handleToggle = async (p: ProductPublic) => {
    try { await api.patch(`/api/products/${p.id}`, { isActive: !p.isActive }); fetchAll(); }
    catch { toast.error('فشل التحديث'); }
  };

  const handleAIDesc = (r: AIDescriptionResult) => {
    setForm(f => ({ ...f, description: r.description, seoTitle: r.seoTitle, seoDescription: r.seoDescription }));
  };
  const handleAIPrice = (r: AIPriceResult) => {
    setForm(f => ({ ...f, price: String(r.suggestedPrice) }));
    toast.info(`💡 ${r.reasoning}`, { duration: 6000 });
  };

  const generateSEO = async () => {
    if (!form.name) { toast.error('أدخل اسم المنتج أولاً'); return; }
    setGeneratingSEO(true);
    try {
      const res = await api.post<{ success: boolean; data: { seoTitle: string; seoDescription: string; seoSlug: string } }>(
        '/api/ai/generate-seo',
        { name: form.name, description: form.description, category: categories.find(c => c.id === form.categoryId)?.name }
      );
      setForm(f => ({ ...f, seoTitle: res.data.seoTitle, seoDescription: res.data.seoDescription, seoSlug: res.data.seoSlug }));
      toast.success('تم توليد SEO ✨');
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'فشل'); }
    finally { setGeneratingSEO(false); }
  };

  const catName = (id: string) => categories.find(c => c.id === id)?.name ?? '';

  const atProductLimit = !canAddMore && products.length >= (productLimit ?? 0);

  return (
    <div className="p-6 max-w-6xl" dir="rtl">
      {/* Plan limit bar */}
      {!canAddMore && (
        <div className="mb-4 px-4 py-3 rounded-2xl border flex items-center gap-3"
          style={{ background: atProductLimit ? '#FEF2F2' : '#FEF3C7', borderColor: atProductLimit ? '#FECACA' : '#FCD34D' }}>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold" style={{ color: atProductLimit ? '#991B1B' : '#92400E' }}>
                {plan === 'FREE' ? 'منتجات الخطة المجانية' : 'حد المنتجات في خطتك الحالية'}: {products.length} / {productLimit}
              </span>
              <a href="/dashboard/settings?tab=billing"
                className="text-xs font-bold px-2.5 py-1 rounded-lg text-white flex items-center gap-1"
                style={{ background: '#AE445A' }}>
                <Sparkles className="h-3 w-3" /> ارفع للـ PRO
              </a>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: '#E5E7EB' }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (products.length / (productLimit ?? 1)) * 100)}%`, background: atProductLimit ? '#EF4444' : '#F59E0B' }} />
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: BRAND.primary }}>المنتجات</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} منتج في متجرك</p>
        </div>
        <button onClick={openNew} disabled={atProductLimit}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}>
          <Plus className="h-4 w-4" /> إضافة منتج
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن منتج…"
          className="w-full pr-10 pl-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white"
          style={{ borderColor: '#E8E0F0' }} />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: BRAND.accent }} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E8E0F0' }}>
          <table className="w-full text-sm">
            <thead className="border-b" style={{ background: '#F5F0FA' }}>
              <tr>
                {['المنتج', 'التصنيف', 'السعر', 'المخزون', 'الحالة', 'الإجراءات'].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold text-right" style={{ color: BRAND.primary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0FA]">
              {products.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#F5F0FA' }}>
                      <ImageIcon className="h-7 w-7 text-gray-300" />
                    </div>
                    <p className="text-gray-400">لا توجد منتجات بعد</p>
                    <button onClick={openNew} className="text-sm font-medium" style={{ color: BRAND.accent }}>+ أضف أول منتج</button>
                  </div>
                </td></tr>
              ) : products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#F5F0FA' }}>
                        {p.images?.[0]
                          ? <Image src={p.images[0]} alt={p.name} width={40} height={40} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">📦</div>}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{p.name}</p>
                        {p.seoTitle && <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: BRAND.secondary }}>
                          <Sparkles className="h-2.5 w-2.5" />{p.seoTitle}
                        </p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.categoryId ? catName(p.categoryId) : '—'}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold" style={{ color: BRAND.primary }}>{formatCurrency(p.price)}</span>
                    {p.comparePrice && <span className="mr-2 text-xs line-through text-gray-400">{formatCurrency(p.comparePrice)}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${p.stock === 0 ? 'text-red-500' : p.stock < 5 ? 'text-amber-500' : 'text-gray-700'}`}>{p.stock}</span>
                    {p.unit && (
                      <span className="mr-1 text-xs text-gray-400">
                        {getStoreType(storeType).unitOptions.find(u => u.value === p.unit)?.label ?? p.unitLabel ?? ''}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${p.isActive ? 'text-emerald-700' : 'text-gray-500'}`}
                      style={{ background: p.isActive ? '#d1fae5' : '#F5F0FA' }}>
                      {p.isActive ? 'نشط' : 'مخفي'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleToggle(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition">
                        {p.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-purple-50 transition" style={{ color: BRAND.secondary }}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir="rtl">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-[#E8E0F0] flex items-center justify-between z-10">
              <h2 className="text-lg font-bold" style={{ color: BRAND.primary }}>
                {editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#E8E0F0] px-6">
              {[['basic', 'المعلومات الأساسية'], ['seo', 'SEO والبحث']].map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab as 'basic' | 'seo')}
                  className="px-4 py-3 text-sm font-medium border-b-2 transition"
                  style={{
                    color: activeTab === tab ? BRAND.accent : '#9ca3af',
                    borderBottomColor: activeTab === tab ? BRAND.accent : 'transparent',
                  }}>{label}</button>
              ))}
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {activeTab === 'basic' && <>
                {/* Images */}
                <ImageUploader images={form.images} onChange={imgs => setForm(f => ({ ...f, images: imgs }))} />

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>اسم المنتج *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                    style={{ borderColor: '#E8E0F0' }} placeholder="مثال: حذاء رياضي مريح" />
                </div>

                {/* Description + AI */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold" style={{ color: BRAND.primary }}>الوصف</label>
                    {canUseAI
                      ? <AIDescriptionButton productName={form.name} category={catName(form.categoryId)}
                          keyFeatures={form.keyFeatures.split(',').map(s => s.trim()).filter(Boolean)} onResult={handleAIDesc} />
                      : <a href="/dashboard/settings?tab=billing" className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border"
                          style={{ borderColor: '#C4B5FD', color: '#7C3AED', background: '#EDE9FE' }}>
                          <Lock className="h-3 w-3" /> AI — PRO
                        </a>
                    }
                  </div>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={4} placeholder="وصف تفصيلي للمنتج…"
                    className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 resize-none transition"
                    style={{ borderColor: '#E8E0F0' }} />
                  <input value={form.keyFeatures} onChange={e => setForm({ ...form, keyFeatures: e.target.value })}
                    placeholder="مميزات للذكاء الاصطناعي (مفصولة بفاصلة): خفيف، متين، مريح"
                    className="mt-2 w-full px-3 py-2 rounded-xl border text-xs text-gray-500 focus:outline-none transition"
                    style={{ borderColor: '#E8E0F0' }} />
                </div>

                {/* Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold" style={{ color: BRAND.primary }}>السعر *</label>
                      {canUseAI
                        ? <AIPriceButton productName={form.name} category={catName(form.categoryId)} onResult={handleAIPrice} />
                        : <a href="/dashboard/settings?tab=billing" className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg border"
                            style={{ borderColor: '#C4B5FD', color: '#7C3AED', background: '#EDE9FE' }}>
                            <Lock className="h-3 w-3" /> AI
                          </a>
                      }
                    </div>
                    <input type="number" min="0" step="0.01" value={form.price} required
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                      style={{ borderColor: '#E8E0F0' }} placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>سعر المقارنة (شطب)</label>
                    <input type="number" min="0" step="0.01" value={form.comparePrice}
                      onChange={e => setForm({ ...form, comparePrice: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                      style={{ borderColor: '#E8E0F0' }} placeholder="السعر قبل الخصم" />
                  </div>
                </div>

                {/* Stock + Unit + Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>الكمية والوحدة</label>
                    <div className="flex gap-2">
                      <input type="number" min="0" value={form.stock}
                        onChange={e => setForm({ ...form, stock: e.target.value })}
                        className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                        style={{ borderColor: '#E8E0F0' }} placeholder="0" />
                      <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}
                        className="px-2 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white transition"
                        style={{ borderColor: '#E8E0F0' }}>
                        {getStoreType(storeType).unitOptions.map(u => (
                          <option key={u.value} value={u.value}>{u.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>التصنيف</label>
                    <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white transition"
                      style={{ borderColor: '#E8E0F0' }}>
                      <option value="">بدون تصنيف</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
              </>}

              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold" style={{ color: BRAND.primary }}>إعدادات SEO</h3>
                    {canUseAI
                      ? <button type="button" onClick={generateSEO} disabled={generatingSEO}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition disabled:opacity-60"
                          style={{ background: `${BRAND.secondary}15`, color: BRAND.secondary }}>
                          {generatingSEO ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                          {generatingSEO ? 'جارٍ التوليد…' : 'توليد تلقائي بالذكاء الاصطناعي ✨'}
                        </button>
                      : <a href="/dashboard/settings?tab=billing"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border"
                          style={{ borderColor: '#C4B5FD', color: '#7C3AED', background: '#EDE9FE' }}>
                          <Lock className="h-3 w-3" /> AI SEO — خطة PRO
                        </a>
                    }
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><label className="text-xs text-gray-500">عنوان SEO</label><span className="text-xs text-gray-400">{form.seoTitle.length}/60</span></div>
                    <input value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} maxLength={60}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none transition" style={{ borderColor: '#E8E0F0' }} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><label className="text-xs text-gray-500">وصف SEO</label><span className="text-xs text-gray-400">{form.seoDescription.length}/160</span></div>
                    <textarea value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} maxLength={160} rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none resize-none transition" style={{ borderColor: '#E8E0F0' }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">رابط URL</label>
                    <input value={form.seoSlug} onChange={e => setForm({ ...form, seoSlug: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm font-mono focus:outline-none transition" style={{ borderColor: '#E8E0F0' }} placeholder="product-url-slug" />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition text-gray-600"
                  style={{ borderColor: '#E8E0F0' }}>
                  إلغاء
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? 'جارٍ الحفظ…' : editingId ? 'حفظ التغييرات' : 'إنشاء المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
