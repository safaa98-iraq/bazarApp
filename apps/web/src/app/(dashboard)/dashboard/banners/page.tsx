'use client';

import { useState, useEffect, useCallback } from 'react';
import { Megaphone, Plus, Trash2, Pencil, Eye, EyeOff, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const BRAND = { primary: '#432E54', accent: '#AE445A', border: '#E8BCB9', bg: '#F5F0FA' };

interface Banner {
  id: string;
  title: string;
  subtitle?: string | null;
  bgColor: string;
  textColor: string;
  linkUrl?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

interface BannerForm {
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  linkUrl: string;
  isActive: boolean;
}

const emptyForm: BannerForm = {
  title: '',
  subtitle: '',
  bgColor: '#432E54',
  textColor: '#FFFFFF',
  linkUrl: '',
  isActive: true,
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BannerForm>(emptyForm);

  const fetchBanners = useCallback(async () => {
    try {
      const res = await api.get<{ success: boolean; data: Banner[] }>('/api/banners');
      setBanners(res.data ?? []);
    } catch {
      toast.error('فشل تحميل البانرات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (b: Banner) => {
    setEditingId(b.id);
    setForm({
      title: b.title,
      subtitle: b.subtitle ?? '',
      bgColor: b.bgColor,
      textColor: b.textColor,
      linkUrl: b.linkUrl ?? '',
      isActive: b.isActive,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || undefined,
      bgColor: form.bgColor,
      textColor: form.textColor,
      linkUrl: form.linkUrl.trim() || undefined,
      isActive: form.isActive,
    };
    try {
      if (editingId) {
        await api.patch(`/api/banners/${editingId}`, payload);
        toast.success('تم تعديل البانر ✓');
      } else {
        await api.post('/api/banners', payload);
        toast.success('تم إضافة البانر ✓');
      }
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchBanners();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (b: Banner) => {
    try {
      await api.patch(`/api/banners/${b.id}`, { ...b, isActive: !b.isActive });
      fetchBanners();
      toast.success(b.isActive ? 'تم إخفاء البانر' : 'تم تفعيل البانر');
    } catch {
      toast.error('فشل التحديث');
    }
  };

  const deleteBanner = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا البانر؟')) return;
    try {
      await api.delete(`/api/banners/${id}`);
      toast.success('تم الحذف');
      fetchBanners();
    } catch {
      toast.error('فشل الحذف');
    }
  };

  const activeBanners = banners.filter(b => b.isActive).length;

  return (
    <div className="p-6 max-w-5xl" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: BRAND.primary }}>البانرات الإعلانية</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {banners.length} بانر • {activeBanners} نشط
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}
        >
          <Plus className="h-4 w-4" /> إضافة بانر
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'إجمالي البانرات', value: banners.length, color: BRAND.primary },
          { label: 'بانرات نشطة', value: activeBanners, color: '#10b981' },
          { label: 'بانرات مخفية', value: banners.length - activeBanners, color: '#9ca3af' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border p-4" style={{ borderColor: BRAND.border }}>
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: BRAND.accent }} />
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white rounded-2xl border p-16 text-center" style={{ borderColor: BRAND.border }}>
          <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-200" />
          <p className="font-medium text-gray-400 mb-1">لا توجد بانرات بعد</p>
          <p className="text-sm text-gray-400 mb-6">أضف بانراً إعلانياً لعرضه في متجرك</p>
          <button
            onClick={openCreate}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}
          >
            إضافة أول بانر
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map(b => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border overflow-hidden"
              style={{ borderColor: BRAND.border }}
            >
              {/* Banner Preview Strip */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ background: b.bgColor }}
              >
                <div>
                  <p className="font-bold text-base leading-tight" style={{ color: b.textColor }}>
                    {b.title}
                  </p>
                  {b.subtitle && (
                    <p className="text-sm mt-0.5 opacity-80" style={{ color: b.textColor }}>
                      {b.subtitle}
                    </p>
                  )}
                </div>
                {b.linkUrl && (
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full border border-current opacity-70"
                    style={{ color: b.textColor }}
                  >
                    عرض
                  </span>
                )}
              </div>

              {/* Actions Row */}
              <div className="px-5 py-3 flex items-center justify-between" style={{ background: BRAND.bg }}>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: b.isActive ? '#d1fae5' : '#F5F0FA',
                      color: b.isActive ? '#065f46' : '#9ca3af',
                    }}
                  >
                    {b.isActive ? 'نشط' : 'مخفي'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-sm border border-gray-200"
                      style={{ background: b.bgColor }}
                    />
                    {b.bgColor}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(b)}
                    className="p-2 rounded-lg hover:bg-white transition"
                    title={b.isActive ? 'إخفاء البانر' : 'إظهار البانر'}
                  >
                    {b.isActive
                      ? <Eye className="h-4 w-4" style={{ color: '#10b981' }} />
                      : <EyeOff className="h-4 w-4 text-gray-400" />}
                  </button>
                  <button
                    onClick={() => openEdit(b)}
                    className="p-2 rounded-lg hover:bg-white transition"
                    title="تعديل"
                  >
                    <Pencil className="h-4 w-4" style={{ color: BRAND.primary }} />
                  </button>
                  <button
                    onClick={() => deleteBanner(b.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition"
                    title="حذف"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir="rtl">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: BRAND.border }}
            >
              <h2 className="text-lg font-bold" style={{ color: BRAND.primary }}>
                {editingId ? 'تعديل البانر' : 'إضافة بانر جديد'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>
                  عنوان البانر *
                </label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                  placeholder="مثال: تخفيضات الصيف 50%"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                  style={{ borderColor: BRAND.border }}
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>
                  نص فرعي (اختياري)
                </label>
                <input
                  value={form.subtitle}
                  onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                  placeholder="مثال: على جميع المنتجات حتى نهاية الشهر"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none transition"
                  style={{ borderColor: BRAND.border }}
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>
                    لون الخلفية
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.bgColor}
                      onChange={e => setForm(f => ({ ...f, bgColor: e.target.value }))}
                      className="h-9 w-12 rounded-lg border cursor-pointer p-0.5"
                      style={{ borderColor: BRAND.border }}
                    />
                    <input
                      value={form.bgColor}
                      onChange={e => setForm(f => ({ ...f, bgColor: e.target.value }))}
                      className="flex-1 px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none transition"
                      style={{ borderColor: BRAND.border }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>
                    لون النص
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.textColor}
                      onChange={e => setForm(f => ({ ...f, textColor: e.target.value }))}
                      className="h-9 w-12 rounded-lg border cursor-pointer p-0.5"
                      style={{ borderColor: BRAND.border }}
                    />
                    <input
                      value={form.textColor}
                      onChange={e => setForm(f => ({ ...f, textColor: e.target.value }))}
                      className="flex-1 px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none transition"
                      style={{ borderColor: BRAND.border }}
                    />
                  </div>
                </div>
              </div>

              {/* Link URL */}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: BRAND.primary }}>
                  رابط البانر (اختياري)
                </label>
                <input
                  value={form.linkUrl}
                  onChange={e => setForm(f => ({ ...f, linkUrl: e.target.value }))}
                  placeholder="https://..."
                  type="url"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none transition"
                  style={{ borderColor: BRAND.border }}
                  dir="ltr"
                />
              </div>

              {/* isActive toggle */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-semibold" style={{ color: BRAND.primary }}>تفعيل البانر</p>
                  <p className="text-xs text-gray-400">سيظهر البانر في متجرك فور الحفظ</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                  style={{ background: form.isActive ? BRAND.accent : '#d1d5db' }}
                >
                  <span
                    className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform: form.isActive ? 'translateX(-24px)' : 'translateX(-4px)' }}
                  />
                </button>
              </div>

              {/* Live Preview */}
              {form.title && (
                <div>
                  <p className="text-xs font-semibold mb-1.5 text-gray-400">معاينة</p>
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: form.bgColor }}
                  >
                    <p className="font-bold text-sm" style={{ color: form.textColor }}>{form.title}</p>
                    {form.subtitle && (
                      <p className="text-xs mt-0.5 opacity-80" style={{ color: form.textColor }}>
                        {form.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition text-gray-600"
                  style={{ borderColor: BRAND.border }}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? 'جارٍ الحفظ…' : editingId ? 'حفظ التعديلات' : 'إضافة البانر'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
