'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/stores/auth.store';
import { AuthResponse } from '@storebuilder/types';
import { Loader2, Eye, EyeOff, ShoppingBag, Mail, User, Lock, Check, Shield, Zap, Gift, Phone } from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

const STAR = 'M50,5 L57.65,31.5 L81.82,18.18 L68.48,42.35 L95,50 L68.48,57.65 L81.82,81.82 L57.65,68.5 L50,95 L42.35,68.5 L18.18,81.82 L31.52,57.65 L5,50 L31.52,42.35 L18.18,18.18 L42.35,31.5 Z';

const C = {
  bg:     '#FFF0EB',
  p:      '#432E54',
  s:      '#4B4376',
  a:      '#AE445A',
  text:   '#1C0E2E',
  muted:  '#7B6B8D',
  border: '#E8BCB9',
};

const schema = z.object({
  name:      z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email:     z.string().email('بريد إلكتروني غير صالح'),
  password:  z.string()
    .min(8, 'كلمة المرور 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم'),
  whatsapp:  z.string().regex(/^\+?[0-9]{7,15}$/, 'رقم واتساب غير صالح').optional().or(z.literal('')),
});
type FormData = z.infer<typeof schema>;

const PERKS = [
  { Icon: ShoppingBag, text: 'متجر احترافي فوراً'      },
  { Icon: Zap,         text: 'جاهز في أقل من ٥ دقائق' },
  { Icon: Shield,      text: 'بيانات آمنة ومشفّرة'    },
  { Icon: Gift,        text: 'مجاني للأبد — بدون قيود' },
];

function RegisterForm() {
  const router = useRouter();
  const login  = useAuthStore(s => s.login);
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template');

  const TEMPLATE_META: Record<string, { name: string; icon: string; color: string; accent: string; tagline: string }> = {
    fashion:      { name: 'متجر الملابس والأزياء',       icon: '👗', color: '#7C3F6B', accent: '#D4547A', tagline: 'أنيق، جذاب، يبيع' },
    beauty:       { name: 'متجر البشرة والمكياج',        icon: '💄', color: '#9B3A6B', accent: '#E8627A', tagline: 'الجمال الحقيقي يبدأ من هنا' },
    electronics:  { name: 'متجر الألعاب والإلكترونيات', icon: '🎮', color: '#1A0A2E', accent: '#7C3AED', tagline: 'عالم التقنية والترفيه' },
  };
  const tplMeta = templateParam ? TEMPLATE_META[templateParam] : null;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const pw = watch('password') ?? '';
  const checks = { length: pw.length >= 8, upper: /[A-Z]/.test(pw), num: /[0-9]/.test(pw) };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload = { ...data, whatsapp: data.whatsapp || undefined };
      const res = await api.post<{ success: boolean; data: AuthResponse }>('/api/auth/register', payload);
      login(res.data.user, res.data.token);
      toast.success('تم إنشاء الحساب! أنشئ متجرك الآن');
      router.push(templateParam ? `/dashboard/builder?template=${templateParam}` : '/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', fontFamily: 'var(--font-tajawal)', position: 'relative', overflow: 'hidden' }}>

      {/* Islamic star decorations */}
      <svg style={{ position: 'absolute', top: -120, right: -120, width: 520, height: 520, opacity: 0.038, pointerEvents: 'none', animation: 'rotate-slow 140s linear infinite' }} viewBox="0 0 100 100">
        <path d={STAR} fill="none" stroke={C.p} strokeWidth=".4" />
      </svg>
      <svg style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, opacity: 0.03, pointerEvents: 'none', animation: 'rotate-rev 80s linear infinite' }} viewBox="0 0 100 100">
        <path d={STAR} fill="none" stroke={C.a} strokeWidth=".5" />
      </svg>

      {/* Left value panel */}
      <div className="auth-left-panel" style={{ display: 'flex', flex: '0 0 44%', background: `linear-gradient(145deg, ${C.p} 0%, ${C.s} 55%, #2d1445 100%)`, flexDirection: 'column', justifyContent: 'center', padding: '64px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
        <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, opacity: 0.06, animation: 'rotate-slow 90s linear infinite', pointerEvents: 'none' }} viewBox="0 0 100 100">
          <path d={STAR} fill="none" stroke="#fff" strokeWidth=".35" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 56 }}>
            <div style={{ width: 42, height: 42, background: 'rgba(255,255,255,.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={22} color="#fff" strokeWidth={1.75} />
            </div>
            <span style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 20, color: '#fff' }}>Store<span style={{ color: 'rgba(232,188,185,.9)' }}>Builder</span></span>
          </Link>

          {tplMeta ? (
            /* Template-specific left panel */
            <div>
              <div style={{ fontSize: 80, marginBottom: 24, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.3))' }}>{tplMeta.icon}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>قالب مختار</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(28px, 3vw, 42px)', color: '#fff', lineHeight: 1.2, margin: '0 0 12px' }}>{tplMeta.name}</h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', marginBottom: 40 }}>{tplMeta.tagline}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['سيُطبَّق القالب تلقائياً بعد التسجيل', 'يمكنك تغيير الألوان والخطوط بحرية', 'جميع القوالب مُحسَّنة للموبايل', 'إعداد المتجر في أقل من دقيقتين'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} color="#fff" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,.65)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Generic left panel */
            <div>
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'badge-pulse 2s infinite' }} />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>+2,400 تاجر يبيعون الآن</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(32px, 3.5vw, 48px)', color: '#fff', lineHeight: 1.2, margin: '0 0 16px' }}>
                  ابنِ متجرك
                  <span style={{ display: 'block', background: 'linear-gradient(135deg, rgba(232,188,185,.95), rgba(174,68,90,.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    في 5 دقائق
                  </span>
                </h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.42)', lineHeight: 1.75 }}>
                  بدون خبرة تقنية، بدون بطاقة ائتمان —<br />فقط متجرك وزبائنك.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {PERKS.map(({ Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color="rgba(232,188,185,.85)" strokeWidth={1.75} />
                    </div>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 48 }}>
                <div style={{ display: 'flex' }}>
                  {['أ','ف','م','س'].map((lt, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(67,46,84,.8)', background: `rgba(255,255,255,${0.1 + i * 0.03})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.8)', marginLeft: i > 0 ? -10 : 0 }}>{lt}</div>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,.38)' }}>
                  <strong style={{ color: 'rgba(255,255,255,.65)' }}>2,400+</strong> تاجر في العراق والخليج
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', position: 'relative', zIndex: 1, overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 24, color: C.text, marginBottom: 8 }}>
              {tplMeta ? `ابدأ بـ${tplMeta.name}` : 'افتح متجرك مجاناً'}
            </h2>
            <p style={{ fontSize: 14, color: C.muted }}>30 ثانية وتكون جاهزاً</p>
          </div>

          <div style={{ background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 24, padding: '40px 36px', boxShadow: '0 8px 40px rgba(67,46,84,.07)' }}>

            {/* Google Sign-Up */}
            <div style={{ marginBottom: 6 }}>
              <GoogleSignInButton label="التسجيل بـ Google" />
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>أو أنشئ حساباً بالبريد</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: C.p, marginBottom: 8 }}>الاسم الكامل</label>
                <div style={{ position: 'relative' }}>
                  <input
                    {...register('name')}
                    placeholder="محمد أحمد"
                    style={{ width: '100%', padding: '12px 44px 12px 16px', background: C.bg, border: `1.5px solid ${errors.name ? 'rgba(239,68,68,.5)' : C.border}`, borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: C.text, transition: 'border-color .2s', caretColor: C.a }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(174,68,90,.4)')}
                    onBlur={e => (e.target.style.borderColor = errors.name ? 'rgba(239,68,68,.5)' : C.border)}
                  />
                  <User size={16} color={C.muted} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
                {errors.name && <p style={{ color: '#DC2626', fontSize: 12, marginTop: 6 }}>{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: C.p, marginBottom: 8 }}>البريد الإلكتروني</label>
                <div style={{ position: 'relative' }}>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    dir="ltr"
                    style={{ width: '100%', padding: '12px 16px 12px 44px', background: C.bg, border: `1.5px solid ${errors.email ? 'rgba(239,68,68,.5)' : C.border}`, borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: C.text, textAlign: 'left', transition: 'border-color .2s', caretColor: C.a }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(174,68,90,.4)')}
                    onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(239,68,68,.5)' : C.border)}
                  />
                  <Mail size={16} color={C.muted} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
                {errors.email && <p style={{ color: '#DC2626', fontSize: 12, marginTop: 6 }}>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: C.p, marginBottom: 8 }}>كلمة المرور</label>
                <div style={{ position: 'relative' }}>
                  <input
                    {...register('password')}
                    type={showPw ? 'text' : 'password'}
                    placeholder="8 أحرف على الأقل"
                    style={{ width: '100%', padding: '12px 44px 12px 44px', background: C.bg, border: `1.5px solid ${errors.password ? 'rgba(239,68,68,.5)' : C.border}`, borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: C.text, transition: 'border-color .2s', caretColor: C.a }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(174,68,90,.4)')}
                    onBlur={e => (e.target.style.borderColor = errors.password ? 'rgba(239,68,68,.5)' : C.border)}
                  />
                  <Lock size={16} color={C.muted} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0, display: 'flex' }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength */}
                {pw.length > 0 && (
                  <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                    {[{ ok: checks.length, label: '8 أحرف' }, { ok: checks.upper, label: 'حرف كبير' }, { ok: checks.num, label: 'رقم' }].map(c => (
                      <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: c.ok ? 'rgba(5,150,105,.1)' : C.bg, border: `1.5px solid ${c.ok ? 'rgba(5,150,105,.4)' : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                          {c.ok && <Check size={8} color="#059669" strokeWidth={3} />}
                        </div>
                        <span style={{ color: c.ok ? '#059669' : C.muted, transition: 'color .2s' }}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {errors.password && <p style={{ color: '#DC2626', fontSize: 12, marginTop: 6 }}>{errors.password.message}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: C.p, marginBottom: 8 }}>
                  رقم واتساب
                  <span style={{ color: C.muted, fontWeight: 500, fontSize: 12, marginRight: 6 }}>(اختياري — لإشعارات التفعيل)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    {...register('whatsapp')}
                    type="tel"
                    placeholder="+9647XXXXXXXXX"
                    dir="ltr"
                    style={{ width: '100%', padding: '12px 16px 12px 44px', background: C.bg, border: `1.5px solid ${errors.whatsapp ? 'rgba(239,68,68,.5)' : C.border}`, borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: C.text, textAlign: 'left', transition: 'border-color .2s', caretColor: C.a }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(5,150,105,.4)')}
                    onBlur={e => (e.target.style.borderColor = errors.whatsapp ? 'rgba(239,68,68,.5)' : C.border)}
                  />
                  <Phone size={16} color="#25D366" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
                {errors.whatsapp && <p style={{ color: '#DC2626', fontSize: 12, marginTop: 6 }}>{errors.whatsapp.message}</p>}
                <p style={{ fontSize: 11, color: C.muted, marginTop: 5 }}>
                  📲 سنرسل لك إشعار واتساب عند تفعيل خطتك
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '14px 0', background: loading ? `rgba(174,68,90,.45)` : `linear-gradient(135deg, ${C.a}, ${C.p})`, color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit', marginTop: 4, boxShadow: loading ? 'none' : '0 6px 24px rgba(174,68,90,.22)', transition: 'all .2s' }}>
                {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> جارٍ الإنشاء...</> : 'افتح متجرك مجاناً'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: 13, color: C.muted, marginTop: 24 }}>
              لديك حساب بالفعل؟{' '}
              <Link href="/login" style={{ color: C.a, fontWeight: 700, textDecoration: 'none' }}>سجّل الدخول</Link>
            </p>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: C.muted, marginTop: 20, opacity: .6 }}>
            بالتسجيل، أنت توافق على{' '}
            <a href="#" style={{ color: C.p, textDecoration: 'none' }}>شروط الاستخدام</a>
            {' '}و{' '}
            <a href="#" style={{ color: C.p, textDecoration: 'none' }}>سياسة الخصوصية</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 40, height: 40, border: '3px solid #432E54', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
