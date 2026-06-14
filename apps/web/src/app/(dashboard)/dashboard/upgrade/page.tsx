'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Check, Zap, Crown, Shield, Loader2, QrCode, X, Clock, CheckCircle2, XCircle, Star, Minus } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { trackPage, track } from '@/lib/track';
import { PLAN_COMPARISON, type PlanConfig, type PlanComparisonRow, type PlanKey } from '@storebuilder/types';
import { PlanPrice } from '@/components/pricing/PlanPrice';
import { WavePatternOverlay } from '@/components/ui/WavePatternOverlay';

const C = {
  bg: '#F5F0FA', bgAlt: '#FFFFFF', p: '#432E54', s: '#4B4376',
  a: '#AE445A', text: '#1C0E2E', muted: '#7B6B8D', border: '#E8BCB9',
};

type Plan = PlanConfig;
type PlansData = Record<PlanKey, Plan>;
interface PayConfig { qrImageUrl: string | null; bankName: string; accountName: string; accountNumber: string; instructions: string; }
interface PayRequest { id: string; planTarget: string; status: string; adminNote: string | null; createdAt: string; }

const PLAN_ICONS = { FREE: Shield, PRO: Zap, ENTERPRISE: Crown } as const;
const PLAN_COLORS = { FREE: '#7B6B8D', PRO: '#432E54', ENTERPRISE: '#AE445A' } as const;
const PLAN_GR = {
  FREE: 'linear-gradient(135deg,#7B6B8D,#4B4376)',
  PRO: 'linear-gradient(135deg,#432E54,#4B4376)',
  ENTERPRISE: 'linear-gradient(135deg,#AE445A,#7D1935)',
} as const;

/* ──────────────── QR Modal ──────────────── */
function QRModal({
  plan, planData, config, onClose, onPaid,
}: {
  plan: string; planData: Plan; config: PayConfig;
  onClose: () => void; onPaid: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  const handlePaid = async () => {
    setSubmitting(true);
    try {
      await api.post('/api/billing/pay-request', { plan, currency: 'IQD' });
      onPaid();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,5,20,.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: C.bgAlt, borderRadius: 28, width: '100%', maxWidth: 420, boxShadow: '0 40px 100px rgba(0,0,0,.4)', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${C.p},${C.s})`, padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 17, color: '#fff' }}>
              ادفع للترقية — {planData.nameAr}
            </div>
            <div style={{ marginTop: 6 }}>
              <PlanPrice plan={plan as PlanKey} align="right" compact showCurrency />
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '28px 24px 32px' }}>
          {/* QR Code */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 200, height: 200, borderRadius: 20, border: `3px solid ${C.border}`, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
              {config.qrImageUrl ? (
                <Image src={config.qrImageUrl} alt="QR للدفع" fill style={{ objectFit: 'contain', padding: 12 }} unoptimized />
              ) : (
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <QrCode size={72} color={C.muted} strokeWidth={1} />
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 10, lineHeight: 1.6 }}>
                    أضف صورة QR من<br />إعدادات المنصة
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div style={{ background: `${C.p}08`, border: `1px solid ${C.p}18`, borderRadius: 14, padding: '14px 18px', marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 600, lineHeight: 1.8 }}>
              افتح تطبيق البنك وامسح رمز QR<br />
              <span style={{ color: C.muted, fontWeight: 500, fontSize: 13 }}>ثم اضغط "دفعت الآن" بعد إتمام الدفع</span>
            </div>
          </div>

          {/* Paid button */}
          <button
            onClick={handlePaid}
            disabled={submitting}
            style={{ width: '100%', padding: '16px 0', background: submitting ? 'rgba(67,46,84,.35)' : `linear-gradient(135deg,${C.p},${C.a})`, color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 16, cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'inherit', boxShadow: submitting ? 'none' : '0 8px 28px rgba(67,46,84,.28)', transition: 'all .2s' }}
          >
            {submitting
              ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> جارٍ التسجيل...</>
              : '✓ دفعت الآن'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── Success Screen ──────────────── */
function SuccessScreen({ planName }: { planName: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', maxWidth: 480, margin: '0 auto' }}>
      {/* Animated checkmark */}
      <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 12px 40px rgba(5,150,105,.3)', animation: 'pop-in .4s cubic-bezier(.16,1,.3,1) both' }}>
        <Check size={44} color="#fff" strokeWidth={3} />
      </div>

      <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(22px,4vw,28px)', color: C.text, margin: '0 0 12px' }}>
        تم استلام طلبك بنجاح!
      </h2>

      <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 32 }}>
        طلبت ترقية حساب إلى خطة <strong style={{ color: C.p }}>{planName}</strong>
      </p>

      {/* WhatsApp notice */}
      <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: 18, padding: '22px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>📲</div>
        <div style={{ fontWeight: 800, fontSize: 16, color: '#166534', marginBottom: 8 }}>
          جارٍ تفعيل خطتك
        </div>
        <div style={{ fontSize: 14, color: '#166534', opacity: .85, lineHeight: 1.8 }}>
          سيتم التواصل معك عبر <strong>الواتساب</strong><br />
          خلال <strong>ساعة أو أقل</strong> لتأكيد التفعيل
        </div>
      </div>

      {/* Steps */}
      <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', textAlign: 'right' }}>
        {[
          { icon: '🔍', text: 'نتحقق من وصول الدفع لحسابنا البنكي' },
          { icon: '✅', text: 'نُفعِّل خطتك فور التأكيد' },
          { icon: '💬', text: 'نرسل لك رسالة واتساب بتأكيد التفعيل' },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
            <span style={{ fontSize: 13, color: C.text }}>{text}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pop-in { from { opacity:0; transform:scale(.5) } to { opacity:1; transform:scale(1) } }
      `}</style>
    </div>
  );
}

/* ──────────────── Plan Card ──────────────── */
function PlanCard({ planKey, plan, current, selected, onSelect }: {
  planKey: string; plan: Plan; current: string; selected: string; onSelect: (p: string) => void;
}) {
  const Icon = PLAN_ICONS[planKey as keyof typeof PLAN_ICONS] ?? Shield;
  const color = PLAN_COLORS[planKey as keyof typeof PLAN_COLORS] ?? C.muted;
  const gradient = PLAN_GR[planKey as keyof typeof PLAN_GR];
  const isActive = current === planKey;
  const isSelected = selected === planKey;

  return (
    <div
      onClick={() => planKey !== 'FREE' && !isActive && onSelect(planKey)}
      style={{ background: C.bgAlt, border: isSelected ? `2.5px solid ${color}` : `1.5px solid ${C.border}`, borderRadius: 20, padding: '22px 20px', cursor: planKey === 'FREE' || isActive ? 'default' : 'pointer', position: 'relative', transition: 'all .2s', transform: isSelected ? 'translateY(-4px)' : 'none', boxShadow: isSelected ? `0 16px 48px ${color}28` : '0 2px 12px rgba(67,46,84,.06)', flex: '1 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column' }}
    >
      {planKey === 'ENTERPRISE' && (
        <div style={{ position: 'absolute', top: -13, right: 18, background: 'linear-gradient(135deg,#AE445A,#7D1935)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Star size={9} fill="#fff" /> الأكثر طلباً
        </div>
      )}
      {isActive && (
        <div style={{ position: 'absolute', top: -13, left: 18, background: '#059669', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99 }}>
          خطتك الحالية
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={20} color="#fff" strokeWidth={1.75} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>{plan.nameAr}</div>
          <PlanPrice plan={planKey as PlanKey} align="right" compact />
      </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {[{ l: 'منتج', v: plan.products }, { l: 'تصنيف', v: plan.categories }].map(({ l, v }) => (
          <div key={l} style={{ flex: '1 1 55px', background: C.bg, borderRadius: 8, padding: '6px 8px', textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 14, color }}>{v === -1 ? '∞' : v}</div>
            <div style={{ fontSize: 10, color: C.muted }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {plan.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={9} color={color} strokeWidth={3} />
            </div>
            <span style={{ fontSize: 12, color: C.text }}>{f}</span>
          </div>
        ))}
      </div>

      {planKey !== 'FREE' && !isActive && (
        <div style={{ padding: '10px 0', borderRadius: 10, textAlign: 'center', background: isSelected ? gradient : 'transparent', border: isSelected ? 'none' : `1.5px solid ${color}`, color: isSelected ? '#fff' : color, fontWeight: 700, fontSize: 13, transition: 'all .2s' }}>
          {isSelected ? '✓ محدد' : 'اختر هذه الخطة'}
        </div>
      )}
      {isActive && (
        <div style={{ padding: '10px 0', borderRadius: 10, textAlign: 'center', background: '#05966912', color: '#059669', fontWeight: 700, fontSize: 13 }}>
          خطتك الحالية
        </div>
      )}
    </div>
  );
}

/* ──────────────── Compare Table ──────────────── */
type CellValue = boolean | string | null;
const COMPARE_FEATURES: PlanComparisonRow[] = PLAN_COMPARISON;

function CompareCell({ value, col }: { value: CellValue; col: 'FREE' | 'PRO' | 'ENTERPRISE' }) {
  const color = col === 'FREE' ? C.muted : col === 'PRO' ? C.s : C.a;
  if (value === true) return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Check size={11} color={color} strokeWidth={3} />
      </div>
    </div>
  );
  if (value === false) return <div style={{ display: 'flex', justifyContent: 'center' }}><Minus size={13} color="#D1D5DB" /></div>;
  if (value === null) return <div style={{ display: 'flex', justifyContent: 'center' }}><X size={13} color="#EF4444" /></div>;
  return <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color }}>{value}</div>;
}

function CompareTable() {
  return (
    <div style={{ marginTop: 32, marginBottom: 4 }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>مقارنة الميزات</div>
        <div style={{ fontSize: 13, color: C.muted }}>جميع الباقات تشمل متجر جاهز — الفرق في الأدوات</div>
      </div>
      <div style={{ background: C.bgAlt, border: `1.5px solid ${C.border}`, borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(67,46,84,.07)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 100px', borderBottom: `1.5px solid ${C.border}` }}>
          <div style={{ padding: '16px 20px' }} />
          {([
            { key: 'FREE',       label: 'مجاني',    price: 'مجاناً',       color: C.muted, gr: 'linear-gradient(135deg,#7B6B8D,#4B4376)', Icon: Shield },
            { key: 'PRO',        label: 'احترافي',  price: '60,000 د.ع',   color: C.s,    gr: 'linear-gradient(135deg,#432E54,#4B4376)', Icon: Zap },
            { key: 'ENTERPRISE', label: 'مؤسسي',    price: '100,000 د.ع',  color: C.a,    gr: 'linear-gradient(135deg,#AE445A,#7D1935)', Icon: Crown },
          ] as { key: string; label: string; price: string; color: string; gr: string; Icon: React.ElementType }[]).map(({ key, label, price, color, gr, Icon }) => (
            <div key={key} style={{ padding: '12px 6px', textAlign: 'center', background: key === 'PRO' ? `${C.s}06` : key === 'ENTERPRISE' ? `${C.a}06` : 'transparent' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: gr, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                <Icon size={14} color="#fff" />
              </div>
              <div style={{ fontWeight: 800, fontSize: 11, color: C.text, marginBottom: 1 }}>{label}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color }}>{price}</div>
            </div>
          ))}
        </div>
        {COMPARE_FEATURES.map((row, i) => (
          <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 100px', borderBottom: i < COMPARE_FEATURES.length - 1 ? `1px solid ${C.border}` : 'none', background: row.highlight ? `${C.p}04` : i % 2 === 0 ? 'transparent' : `${C.bg}60` }}>
            <div style={{ padding: '10px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{row.label}</div>
              {row.sub && <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{row.sub}</div>}
            </div>
            {(['FREE', 'PRO', 'ENTERPRISE'] as const).map((col, j) => (
              <div key={col} style={{ padding: '10px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: j === 1 ? `${C.s}04` : j === 2 ? `${C.a}04` : 'transparent' }}>
                <CompareCell value={row[col]} col={col} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── Main Page ──────────────── */
export default function UpgradePage() {
  const [plans, setPlans] = useState<PlansData | null>(null);
  const [config, setConfig] = useState<PayConfig | null>(null);
  const [currentPlan, setCurrentPlan] = useState('FREE');
  const [pendingRequest, setPendingRequest] = useState<PayRequest | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('PRO');
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => { trackPage('upgrade'); track({ event: 'upgrade_clicked' }); }, []);

  useEffect(() => {
    Promise.all([
      api.get<{ success: boolean; data: PlansData }>('/api/billing/plans', { noAuth: true }),
      api.get<{ success: boolean; data: PayConfig }>('/api/billing/payment-config', { noAuth: true }),
      api.get<{ success: boolean; data: { plan: string; pendingRequest: PayRequest | null } }>('/api/billing/status'),
    ]).then(([plansRes, cfgRes, statusRes]) => {
      setPlans(plansRes.data);
      setConfig(cfgRes.data);
      setCurrentPlan(statusRes.data.plan);
      setPendingRequest(statusRes.data.pendingRequest);
      if (statusRes.data.plan === 'FREE') setSelectedPlan('PRO');
      else if (statusRes.data.plan === 'PRO') setSelectedPlan('ENTERPRISE');
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <Loader2 size={32} color={C.p} style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (!plans || !config) return null;

  // Already submitted payment → show success
  if (paid) {
    return <SuccessScreen planName={plans[selectedPlan as keyof PlansData]?.nameAr ?? selectedPlan} />;
  }

  const selectedPlanData = plans[selectedPlan as keyof PlansData];

  return (
    <div style={{ padding: '32px 20px', maxWidth: 960, margin: '0 auto', fontFamily: 'var(--font-tajawal)', position: 'relative' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pop-in{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}`}</style>
      <WavePatternOverlay opacity={0.04} color={C.p} />

      {showQR && selectedPlanData && config && (
        <QRModal
          plan={selectedPlan}
          planData={selectedPlanData}
          config={config}
          onClose={() => setShowQR(false)}
          onPaid={() => { setShowQR(false); setPaid(true); }}
        />
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${C.a}12`, border: `1px solid ${C.a}30`, borderRadius: 99, padding: '6px 18px', marginBottom: 14 }}>
          <Crown size={14} color={C.a} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.a }}>ترقية الخطة</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(20px,4vw,30px)', color: C.text, margin: '0 0 8px' }}>
          أطلق إمكانيات متجرك الكاملة
        </h1>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>
          ادفع عبر QR — يُفعَّل حسابك خلال ساعة ويصلك تأكيد واتساب
        </p>
      </div>

      {/* Pending banner */}
      {pendingRequest?.status === 'PENDING' && (
        <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Clock size={22} color="#D97706" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#92400E' }}>طلب الدفع قيد المراجعة ⏳</div>
            <div style={{ fontSize: 13, color: '#B45309' }}>
              طلبت الترقية إلى <strong>{plans[pendingRequest.planTarget as keyof PlansData]?.nameAr}</strong> — سيتم التواصل معك عبر الواتساب خلال ساعة أو أقل
            </div>
          </div>
        </div>
      )}

      {pendingRequest?.status === 'APPROVED' && (
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
          <CheckCircle2 size={22} color="#059669" />
          <div style={{ fontWeight: 700, fontSize: 14, color: '#166534' }}>✓ تم تفعيل خطتك بنجاح!</div>
        </div>
      )}

      {pendingRequest?.status === 'REJECTED' && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <XCircle size={22} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#991B1B', marginBottom: 4 }}>تم رفض الطلب</div>
            {pendingRequest.adminNote && <div style={{ fontSize: 13, color: '#B91C1C' }}>{pendingRequest.adminNote}</div>}
            <button onClick={() => setPendingRequest(null)} style={{ marginTop: 10, padding: '7px 16px', background: C.a, color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              حاول مجدداً
            </button>
          </div>
        </div>
      )}

      {/* Plan cards */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28, alignItems: 'stretch', position: 'relative', zIndex: 1 }}>
        {(['FREE', 'PRO', 'ENTERPRISE'] as const).map(key => (
          <PlanCard key={key} planKey={key} plan={plans[key]} current={currentPlan} selected={selectedPlan} onSelect={setSelectedPlan} />
        ))}
      </div>

      {/* Pay CTA */}
      {selectedPlan !== 'FREE' && selectedPlan !== currentPlan && !pendingRequest && (
        <div style={{ background: `linear-gradient(135deg,${C.p},${C.s})`, borderRadius: 20, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#fff', marginBottom: 4 }}>
              الترقية إلى {selectedPlanData?.nameAr}
            </div>
            <div style={{ color: 'rgba(255,255,255,.65)', fontSize: 14 }}>
              <span style={{ textDecoration: 'line-through' }}>{selectedPlanData?.priceIQD.toLocaleString()} د.ع</span>
              <span style={{ marginRight: 8 }}>السعر الأصلي</span>
            </div>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginTop: 6 }}>
              بعد الخصم: {selectedPlanData?.firstYearPriceIQD?.toLocaleString()} د.ع للسنة الأولى
            </div>
          </div>
          <button
            onClick={() => setShowQR(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 14, background: '#fff', color: C.p, fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(0,0,0,.15)', whiteSpace: 'nowrap' }}
          >
            <QrCode size={18} />
            ادفع الآن
          </button>
        </div>
      )}

      {/* Comparison table */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CompareTable />
      </div>

      {/* How it works */}
      <div style={{ marginTop: 28, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 18, padding: '22px 24px' }}>
        <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 18 }}>كيف يعمل؟</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { n: '١', t: 'اختر الخطة', b: 'اختر الخطة التي تناسب نشاطك التجاري', c: C.p },
            { n: '٢', t: 'ادفع بـ QR',  b: 'امسح الكود عبر تطبيق البنك واضغط "دفعت الآن"', c: C.s },
            { n: '٣', t: 'واتساب خلال ساعة', b: 'نتحقق ونُفعِّل خطتك ونرسل لك تأكيد واتساب', c: '#059669' },
          ].map(({ n, t, b, c }) => (
            <div key={n} style={{ flex: '1 1 160px', minWidth: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: c, color: '#fff', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{n}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{t}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: C.muted }}>
        🛡️ ضمان استرداد كامل خلال 7 أيام إذا لم تكن راضياً
      </div>
    </div>
  );
}
