'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderPublic, OrderStatusType } from '@storebuilder/types';
import { ChevronDown, ChevronLeft, ShoppingBag, Loader2, MapPin, Package } from 'lucide-react';
import { trackPage, track } from '@/lib/track';

const BRAND = { primary: '#432E54', secondary: '#4B4376', accent: '#AE445A', light: '#E8BCB9' };

const STATUS_AR: Record<string, string> = {
  PENDING: 'معلّق', PAID: 'مدفوع', SHIPPED: 'شُحن', DELIVERED: 'مُستلم', CANCELLED: 'ملغي',
};
const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING:   { bg: '#FEF3C7', color: '#92400E' },
  PAID:      { bg: '#D1FAE5', color: '#065F46' },
  SHIPPED:   { bg: '#DBEAFE', color: '#1E40AF' },
  DELIVERED: { bg: '#D1FAE5', color: '#065F46' },
  CANCELLED: { bg: '#FEE2E2', color: '#991B1B' },
};
const STATUS_TRANSITIONS: Record<string, OrderStatusType[]> = {
  PENDING: ['PAID', 'CANCELLED'],
  PAID: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: [], CANCELLED: [],
};
const NEXT_STATUS_LABEL: Record<string, string> = {
  PAID: 'تم الدفع', SHIPPED: 'تم الشحن', DELIVERED: 'تم الاستلام', CANCELLED: 'إلغاء',
};
const FILTERS = [
  { value: 'ALL', label: 'الكل' },
  { value: 'PENDING', label: 'معلّق' },
  { value: 'PAID', label: 'مدفوع' },
  { value: 'SHIPPED', label: 'شُحن' },
  { value: 'DELIVERED', label: 'مُستلم' },
  { value: 'CANCELLED', label: 'ملغي' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderPublic[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = statusFilter !== 'ALL' ? `?status=${statusFilter}` : '';
      const res = await api.get<{ success: boolean; data: OrderPublic[]; pagination: { total: number } }>(`/api/orders${params}`);
      setOrders(res.data ?? []);
      setTotal(res.pagination?.total ?? 0);
    } catch { toast.error('فشل تحميل الطلبات'); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { trackPage('orders'); }, []);
  useEffect(() => { load(); }, [load]);

  const updateStatus = async (orderId: string, status: OrderStatusType) => {
    setUpdatingId(orderId);
    try {
      const res = await api.patch<{ success: boolean; data: OrderPublic }>(`/api/orders/${orderId}/status`, { status });
      setOrders(prev => prev.map(o => o.id === orderId ? res.data : o));
      toast.success(`تم تحديث حالة الطلب إلى: ${STATUS_AR[status]}`);
      track({ event: 'order_status_updated', meta: { status } });
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'فشل التحديث'); }
    finally { setUpdatingId(null); }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);

  return (
    <div className="p-6 max-w-5xl" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: BRAND.primary }}>الطلبات</h1>
          <p className="text-sm text-gray-500 mt-0.5">{total} طلب إجمالي</p>
        </div>
        <div className="text-left">
          <p className="text-xs text-gray-400">إجمالي الإيرادات</p>
          <p className="text-xl font-bold" style={{ color: BRAND.accent }}>{formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setStatusFilter(f.value)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition"
            style={{
              background: statusFilter === f.value ? BRAND.primary : '#F5F0FA',
              color: statusFilter === f.value ? 'white' : '#6b7280',
            }}>
            {f.label}
            {f.value !== 'ALL' && (
              <span className="mr-1.5 text-xs opacity-70">
                ({orders.filter(o => f.value === 'ALL' || o.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: BRAND.accent }} />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border p-16 text-center" style={{ borderColor: '#E8E0F0' }}>
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-200" />
          <p className="font-medium text-gray-400 mb-1">لا توجد طلبات بعد</p>
          <p className="text-sm text-gray-400">ستظهر هنا طلبات عملائك فور ورودها</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const isExpanded = expandedId === order.id;
            const nextStatuses = STATUS_TRANSITIONS[order.status] ?? [];
            const style = STATUS_STYLES[order.status] ?? { bg: '#F5F0FA', color: '#6b7280' };

            return (
              <div key={order.id} className="bg-white rounded-2xl border overflow-hidden transition hover:shadow-sm"
                style={{ borderColor: '#E8E0F0' }}>
                {/* Row */}
                <button
                  className="w-full px-5 py-4 flex items-center gap-4 text-right hover:bg-gray-50/50 transition"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}>
                  <div className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>

                  {/* Customer info */}
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{order.customerName}</span>
                      <span className="text-xs text-gray-400 hidden sm:inline">{order.customerEmail}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      #{order.id.slice(-8).toUpperCase()} · {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Items count */}
                  <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                    <Package className="h-3.5 w-3.5" />
                    {order.items?.length ?? 0} منتج
                  </div>

                  {/* Status badge */}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                    style={{ background: style.bg, color: style.color }}>
                    {STATUS_AR[order.status] ?? order.status}
                  </span>

                  {/* Total */}
                  <span className="font-bold flex-shrink-0" style={{ color: BRAND.primary }}>
                    {formatCurrency(order.total)}
                  </span>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-[#F5F0FA]">
                    <div className="grid sm:grid-cols-2 gap-6 mt-4">
                      {/* Items */}
                      <div>
                        <p className="text-xs font-bold mb-3" style={{ color: BRAND.secondary }}>المنتجات</p>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#F5F0FA' }}>
                                {item.product?.images?.[0]
                                  ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                                  : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">📦</div>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-700 truncate">{item.product?.name ?? item.productId}</p>
                                <p className="text-xs text-gray-400">× {item.quantity}</p>
                              </div>
                              <span className="text-sm font-medium" style={{ color: BRAND.primary }}>
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-[#F5F0FA] flex justify-between font-bold text-sm">
                            <span style={{ color: BRAND.primary }}>الإجمالي</span>
                            <span style={{ color: BRAND.accent }}>{formatCurrency(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Shipping + actions */}
                      <div>
                        <p className="text-xs font-bold mb-3" style={{ color: BRAND.secondary }}>عنوان الشحن</p>
                        <div className="flex items-start gap-2 mb-5 p-3 rounded-xl" style={{ background: '#F5F0FA' }}>
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: BRAND.accent }} />
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {order.shippingAddress.line1}
                            {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''}<br />
                            {order.shippingAddress.city}، {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                            {order.shippingAddress.country}
                          </p>
                        </div>

                        {/* Status update */}
                        {nextStatuses.length > 0 && (
                          <div>
                            <p className="text-xs font-bold mb-2" style={{ color: BRAND.secondary }}>تحديث الحالة</p>
                            <div className="flex flex-wrap gap-2">
                              {nextStatuses.map(s => (
                                <button key={s} onClick={() => updateStatus(order.id, s)}
                                  disabled={updatingId === order.id}
                                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition disabled:opacity-50 hover:opacity-90"
                                  style={{
                                    background: s === 'CANCELLED' ? '#FEE2E2' : `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
                                    color: s === 'CANCELLED' ? '#991B1B' : 'white',
                                  }}>
                                  {updatingId === order.id ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                                  {NEXT_STATUS_LABEL[s] ?? s}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {order.status === 'DELIVERED' && (
                          <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-xl" style={{ background: '#D1FAE5' }}>
                            <ChevronLeft className="h-4 w-4" style={{ color: '#065F46' }} />
                            <span className="text-xs font-medium" style={{ color: '#065F46' }}>تم تسليم هذا الطلب بنجاح</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
