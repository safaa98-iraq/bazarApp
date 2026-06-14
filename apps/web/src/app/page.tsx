'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PLAN_COMPARISON, PLAN_CONFIGS } from '@storebuilder/types';
import { PlanPrice } from '@/components/pricing/PlanPrice';
import { WavePatternOverlay } from '@/components/ui/WavePatternOverlay';

/* ─── Design tokens ─── */
const C = {
  bg:      '#FFF0EB',
  white:   '#ffffff',
  dark:    '#432E54',
  accent:  '#C4667A',
  rose:    '#AE445A',
  text2:   '#736B85',
  border:  '#E8BCB9',
  soft:    '#E8BCB9',
  success: '#2E7D5B',
  note:    '#9E97AD',
};

/* ─── Decoratives ─── */
function DecoStar({ size = 60, color = '#AE445A', style = {}, rotate = 0 }: {
  size?: number; color?: string; style?: React.CSSProperties; rotate?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60"
      style={{ ...style, transform: `rotate(${rotate}deg)`, pointerEvents: 'none' }}>
      <path d="M30 0 L36 22 L60 22 L40 35 L47 58 L30 44 L13 58 L20 35 L0 22 L24 22 Z" fill={color} />
    </svg>
  );
}

function BrowserFrame({ children, accentBg = '#C4667A', bodyBg = '#432E54', style = {} }: {
  children: React.ReactNode; accentBg?: string; bodyBg?: string; style?: React.CSSProperties;
}) {
  return (
    <div style={{ borderRadius: 16, border: `2px solid ${C.dark}`, overflow: 'hidden', background: C.white, ...style }}>
      <div style={{ background: accentBg, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
        {['—', '□', '×'].map((icon, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3, border: '1.5px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'rgba(255,255,255,.6)' }}>{icon}</div>
        ))}
      </div>
      <div style={{ background: bodyBg, padding: '28px 24px' }}>{children}</div>
    </div>
  );
}

function GridOverlay({ opacity = 0.1, color = '#AE445A', size = 48 }: {
  opacity?: number; color?: string; size?: number;
}) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`, opacity,
    }} />
  );
}

function WavyOverlay({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cpath d='M0 50 C60 20,90 80,150 50 C210 20,240 80,300 50' fill='none' stroke='%23432E54' stroke-width='2'/%3E%3Cpath d='M0 110 C60 80,90 140,150 110 C210 80,240 140,300 110' fill='none' stroke='%23432E54' stroke-width='2'/%3E%3Cpath d='M0 170 C60 140,90 200,150 170 C210 140,240 200,300 170' fill='none' stroke='%23432E54' stroke-width='2'/%3E%3C/svg%3E")`,
      backgroundSize: '300px 300px',
    }} />
  );
}

/* ─── Hooks ─── */
function useScrollReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return count;
}

/* ─── Shared styles ─── */
const SEC: React.CSSProperties = { padding: '80px 32px', fontFamily: "'Tajawal', sans-serif", position: 'relative', overflow: 'hidden' };
const TITLE: React.CSSProperties = { fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: C.dark, textAlign: 'center', marginBottom: 8 };
const SUB: React.CSSProperties = { fontSize: 17, color: C.text2, textAlign: 'center', marginBottom: 48, fontWeight: 400 };
const INNER = (max = 1000): React.CSSProperties => ({ maxWidth: max, margin: '0 auto', position: 'relative', zIndex: 2 });

/* ─── Header ─── */
function LPHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  const links = [
    { label: 'الرئيسية', id: 'hero' },
    { label: 'المزايا', id: 'features' },
    { label: 'الأسعار', id: 'pricing' },
    { label: 'قارن', id: 'comparison' },
  ];

  return (
    <>
      <div style={{ position: 'fixed', top: 0, right: 0, height: 3, background: C.rose, zIndex: 1001, width: `${pct}%`, transition: 'width .1s linear' }} />
      <header style={{
        position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1000,
        padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', gap: 24,
        fontFamily: "'Tajawal', sans-serif", transition: 'all .35s ease',
        background: scrolled ? 'rgba(255,240,235,.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(67,46,84,.1)' : 'none',
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.dark, cursor: 'pointer', flexShrink: 0 }} onClick={() => go('hero')}>StoreBuilder</div>
        <nav className="lp-nav-links" style={{ display: 'flex', gap: 24, marginRight: 'auto' }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              style={{ color: C.dark, fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", opacity: .7, transition: 'opacity .2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '.7')}
            >{l.label}</button>
          ))}
        </nav>
        <button className="lp-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: C.dark, fontSize: 22, cursor: 'pointer', marginRight: 'auto' }}>
          {mobileOpen ? '✕' : '☰'}
        </button>
        <Link href="/register" className="lp-nav-cta">
          <button style={{ background: C.rose, color: '#fff', padding: '9px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'all .2s', flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
            ابدأ مجاناً
          </button>
        </Link>
      </header>
      {mobileOpen && (
        <div style={{ position: 'fixed', top: 64, right: 0, left: 0, background: C.bg, padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 16, zIndex: 999, boxShadow: '0 8px 30px rgba(67,46,84,.15)' }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              style={{ color: C.dark, fontSize: 16, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", textAlign: 'right' }}>
              {l.label}
            </button>
          ))}
          <Link href="/register">
            <button style={{ background: C.rose, color: '#fff', padding: 12, borderRadius: 10, fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", width: '100%' }}>ابدأ مجاناً</button>
          </Link>
        </div>
      )}
    </>
  );
}

/* ─── Hero ─── */
function LPHero() {
  const mockRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mockRef.current; if (!el) return;
    let frame: number; let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      el.style.transform = `translateY(${Math.sin((ts - start) / 1500) * 8}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const products = [
    { name: 'عباءة عراقية فاخرة', price: '45,000 د.ع', color: '#E8BCB9' },
    { name: 'عطر عود فاخر',        price: '32,000 د.ع', color: '#c4b3d1' },
    { name: 'حقيبة جلد يدوية',    price: '28,000 د.ع', color: '#f0bcc2' },
  ];

  return (
    <section id="hero" style={{ ...SEC, minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 48px' }}>
      <WavyOverlay opacity={0.08} />
      <DecoStar size={80} color={C.accent} style={{ position: 'absolute', top: '12%', left: '8%' }} rotate={15} />
      <DecoStar size={50} color={C.soft}   style={{ position: 'absolute', bottom: '20%', left: '5%' }} rotate={-10} />
      <DecoStar size={40} color={C.dark}   style={{ position: 'absolute', top: '18%', right: '6%', opacity: .15 }} rotate={30} />

      <div className="hero-inner" style={{ maxWidth: 1200, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.soft, padding: '8px 18px', borderRadius: 30, color: C.dark, fontSize: 14, fontWeight: 700, alignSelf: 'flex-start' }}>
            🇮🇶 صُنع للتاجر العراقي
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 60px)', fontWeight: 800, color: C.dark, lineHeight: 1.1, margin: 0 }}>
            افتح متجرك الإلكتروني
            <br />
            <span style={{ display: 'inline-block', background: C.accent, color: '#fff', padding: '4px 16px', borderRadius: 8, transform: 'rotate(-1deg)' }}>في 5 دقائق</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: C.text2, lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
            بدون خبرة تقنية · بدون برمجة · بدون ما تدفع الكثير
          </p>
          <div className="lp-hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/register">
              <button style={{ background: C.rose, color: '#fff', padding: '16px 36px', borderRadius: 14, fontSize: 18, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'all .3s' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'scale(1.03)'; b.style.boxShadow = '0 6px 24px rgba(174,68,90,.35)'; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'scale(1)'; b.style.boxShadow = 'none'; }}>
                ابدأ مجاناً الآن
              </button>
            </Link>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: C.dark, color: '#fff', padding: '16px 36px', borderRadius: 14, fontSize: 18, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'all .3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
              شاهد كيف يعمل ▶
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.text2, fontSize: 14, fontWeight: 500 }}>
            <div style={{ display: 'flex' }}>
              {['#E8BCB9', '#c4b3d1', '#f0bcc2', C.rose].map((c, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${C.bg}`, background: c, marginLeft: -8 }} />
              ))}
            </div>
            <span>انضم لـ +2,400 تاجر عراقي يبيعون الآن</span>
          </div>
        </div>

        <div ref={mockRef} style={{ position: 'relative' }}>
          <BrowserFrame accentBg={C.accent} bodyBg={C.dark} style={{ maxWidth: 440, marginRight: 'auto', boxShadow: '0 20px 60px rgba(67,46,84,.2)' }}>
            <div style={{ background: C.white, borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>لوحة التحكم</span>
                <span style={{ fontSize: 10, fontWeight: 600, background: C.soft, color: C.dark, padding: '3px 10px', borderRadius: 12 }}>متجر نشط</span>
              </div>
              {products.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: p.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.rose, fontWeight: 700 }}>{p.price}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: '#F8F7FA', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>طلبات اليوم</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: C.rose }}>12</span>
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}

/* ─── Pain Points ─── */
function LPPainPoints() {
  const [ref, visible] = useScrollReveal(0.1);
  const pains = [
    { emoji: '⚙️', problem: 'يحتاج برمجة لكل تعديل صغير', solution: 'في بازار تعدّل كل شيء بنفسك بضغطة' },
    { emoji: '💸', problem: 'المنصات تأخذ عمولة بالدولار ولا تدعم الدفع العراقي', solution: 'يدعم الدفع المحلي، بالدينار والدولار، بدون عمولة خارجية' },
    { emoji: '⏱️', problem: 'المبرمج يأخذ وقتًا طويلًا حتى يسلّمك الموقع', solution: 'بمنصة بازار تبني موقعك بدقايق' },
    { emoji: '🧾', problem: 'المبرمج غالي', solution: 'بمنصة بازار تتوفر باقات من المجاني إلى 100 ألف' },
    { emoji: '🌍', problem: 'المنصات الأجنبية لا تفهم السوق العراقي', solution: 'المنصة مبنية على فهم احتياجات التاجر المحلي' },
    { emoji: '📊', problem: 'ما أعرف شو يصير بمتجري – لا توجد تقارير واضحة', solution: 'لوحة تحليلات بالعربي تخبرك بكل شيء يومياً' },
  ];

  return (
    <section id="pain-points" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: C.white }}>
      <GridOverlay opacity={0.08} color={C.rose} size={52} />
      <DecoStar size={70} color={C.accent} style={{ position: 'absolute', top: '10%', right: '4%' }} rotate={20} />
      <DecoStar size={45} color={C.soft}   style={{ position: 'absolute', bottom: '8%', left: '6%' }} rotate={-15} />
      <div style={INNER()}>
        <h2 style={TITLE}> حلينا مشاكل التاجر العراقي  </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {pains.map((p, i) => (
            <div key={i}
              style={{ background: C.bg, borderRadius: 16, padding: 24, borderRight: `4px solid ${C.accent}`, transition: 'all .3s', cursor: 'default', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transitionDelay: `${i * 100}ms` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(67,46,84,.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 8, lineHeight: 1.4 }}>{p.problem}</div>
              <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.6, paddingTop: 8, borderTop: `1px solid ${C.soft}` }}>
                <span style={{ color: C.rose, fontWeight: 700 }}>← </span>{p.solution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Steps ─── */
function LPSteps() {
  const [activeCount, setActiveCount] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const steps = [
    { icon: '🔐', title: 'سجّل حسابك',         desc: '30 ثانية فقط — ادخل اسمك ورقم هاتفك وخلاص' },
    { icon: '🎨', title: 'اختر تصميم متجرك',   desc: 'قوالب جاهزة واحترافية — عدّل الألوان والشعار بضغطة' },
    { icon: '📦', title: 'أضف منتجاتك',        desc: 'الذكاء الاصطناعي يكتب أوصاف احترافية بالعربي، جاهز للنشر' },
    { icon: '💳', title: 'فعّل الدفع',          desc: 'Zain Cash، بطاقات، كاش عند الاستلام — كل الطرق متاحة' },
    { icon: '🚀', title: 'انشر وابدأ البيع',    desc: 'متجرك مباشر على الإنترنت — شاركه مع العالم!' },
  ];

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveCount(prev => Math.max(prev, i + 1));
      }, { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const totalH = steps.length > 1 ? Math.max(0, ((activeCount - 1) / (steps.length - 1)) * 100) : 0;

  return (
    <section id="steps" style={{ ...SEC, background: C.bg }}>
      <WavyOverlay opacity={0.05} />
      <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2 style={TITLE}>كيف تبني متجرك في 5 خطوات؟</h2>
        <p style={SUB}>من التسجيل إلى أول بيعة — كل شيء واضح</p>
        <div style={{ position: 'relative', paddingRight: 56 }}>
          <div style={{ position: 'absolute', right: 22, top: 24, bottom: 24, width: 3, background: C.soft, borderRadius: 3 }} />
          <div style={{ position: 'absolute', right: 22, top: 24, width: 3, background: `linear-gradient(180deg, ${C.dark}, ${C.rose})`, borderRadius: 3, transition: 'height .6s cubic-bezier(.4,0,.2,1)', height: `${totalH}%` }} />
          {steps.map((s, i) => {
            const isActive = i < activeCount;
            return (
              <div key={i} ref={el => { stepRefs.current[i] = el; }}
                style={{ display: 'flex', gap: 24, marginBottom: 44, position: 'relative', transition: 'all .5s', transitionDelay: `${i * 100}ms`, opacity: isActive ? 1 : .25, transform: isActive ? 'translateX(0)' : 'translateX(-24px)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: isActive ? C.dark : C.soft, color: isActive ? '#fff' : C.text2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, flexShrink: 0, position: 'absolute', right: -56, top: 8, transition: 'all .5s', zIndex: 2, border: `3px solid ${C.bg}`, boxShadow: isActive ? '0 0 0 4px rgba(67,46,84,.12)' : 'none' }}>{i + 1}</div>
                <div style={{ flex: 1, background: C.white, borderRadius: 16, padding: 24, transition: 'all .5s', boxShadow: isActive ? '0 6px 28px rgba(67,46,84,.08)' : 'none', borderRight: `4px solid ${isActive ? C.accent : 'transparent'}` }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: C.text2, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function LPFeatures() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollReveal(0.1);
  const features = [
    { icon: '🪄', title: 'متجر احترافي جاهز في دقائق',             desc: 'اختر قالباً، عدّل الألوان والشعار. متجرك يكون جاهز بشكل احترافي بدون ما تعرف أي شيء عن البرمجة.', preview: 'واجهة بناء المتجر' },
    { icon: '🤖', title: 'ذكاء اصطناعي يكتب أوصاف لمنتجاتك',      desc: 'أضف صورة المنتج وخلّي الذكاء الاصطناعي يكتب وصف احترافي بالعربي، جاهز للنشر.', preview: 'محرر المنتج الذكي' },
    { icon: '📈', title: 'لوحة تحليل بالعربي — بسيطة وقوية',       desc: 'كل شيء بالعربي. تابع المبيعات، الطلبات، والمنتجات من مكان واحد.', preview: 'لوحة التحليل' },
    { icon: '📊', title: 'تقارير مبيعات يومية واضحة',              desc: 'اعرف شنو يبيع أكثر،  منو هم زبائنك  وكيف تربح أكثر في كل يوم.', preview: 'تقارير المبيعات' },
    { icon: '💬', title: 'دعم فوري بالعربي على مدار الساعة',       desc: 'فريقنا موجود 24/7 نساعدك بالعربي. دردشة مباشرة .', preview: 'الدعم الفوري' },
  ];
  const f = features[active];

  return (
    <section id="features" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: C.white }}>
      <GridOverlay opacity={0.05} color={C.accent} size={56} />
      <div style={INNER(1100)}>
        <h2 style={TITLE}>كل شيء تحتاجه من مكان واحد</h2>
        <p style={SUB}>بنينا المنصة بناءً على ما يطلبه التاجر العراقي فعلاً</p>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {features.map((feat, i) => (
              <div key={i}
                style={{ padding: '16px 20px', borderRadius: 12, cursor: 'pointer', transition: 'all .3s', borderRight: `4px solid ${i === active ? C.accent : 'transparent'}`, background: i === active ? C.bg : 'transparent', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(20px)', transitionDelay: `${i * 80}ms` }}
                onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: i === active ? 4 : 0 }}>
                  <span style={{ color: C.rose, fontWeight: 700, marginLeft: 10 }}>◆</span>{feat.title}
                </div>
                {i === active && <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.5, marginTop: 4 }}>{feat.desc}</div>}
              </div>
            ))}
          </div>
          <BrowserFrame accentBg={C.accent} bodyBg={C.dark} style={{ position: 'sticky', top: 96 }}>
            <div style={{ background: C.white, borderRadius: 12, padding: 32, textAlign: 'center', minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{f.preview}</div>
              <div style={{ fontSize: 14, color: C.text2, lineHeight: 1.6, maxWidth: 320 }}>{f.desc}</div>
            </div>
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}

/* ─── Emotional / Stats ─── */
function LPEmotional() {
  const [ref, visible] = useScrollReveal(0.2);
  const merchants = useCountUp(2400, 2000, visible);
  const orders    = useCountUp(18000, 2000, visible);
  const sat       = useCountUp(98, 1500, visible);
  const fmt = (n: number) => n >= 1000 ? '+' + n.toLocaleString('en') : '+' + n;

  return (
    <section id="emotional" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: C.dark }}>
      <GridOverlay opacity={0.06} color={C.accent} size={48} />
      <DecoStar size={90} color={C.accent} style={{ position: 'absolute', top: '8%', left: '6%', opacity: .3 }} rotate={12} />
      <DecoStar size={60} color={C.soft}   style={{ position: 'absolute', bottom: '12%', right: '8%', opacity: .25 }} rotate={-20} />
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 700, color: '#fff', lineHeight: 1.5, marginBottom: 48 }}>
          "التاجر العراقي يكدر ينافس العالم "
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 64, marginBottom: 40, flexWrap: 'wrap' }}>
          {[
            { val: fmt(merchants), label: 'تاجر عراقي نشط' },
            { val: fmt(orders),    label: 'طلب تم تنفيذهم' },
            { val: `${sat}%`,      label: 'نسبة رضا التجار' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: C.soft }}>{s.val}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 17, color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>
          🇮🇶 نحن عراقيون مثلكم — بنينا المشكلة وبنينا الحل
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function LPPricing() {
  const [ref, visible] = useScrollReveal(0.1);
  const plans = [
    {
      key: 'FREE' as const,
      name: PLAN_CONFIGS.FREE.nameAr, price: '0', suffix: 'دولار / شهر', featured: false,
      features: PLAN_CONFIGS.FREE.features,
      cta: 'ابدأ مجاناً', primary: false,
    },
    {
      key: 'PRO' as const,
      name: `${PLAN_CONFIGS.PRO.nameAr} ⭐`, price: PLAN_CONFIGS.PRO.priceIQD.toLocaleString(), discounted: PLAN_CONFIGS.PRO.firstYearPriceIQD!.toLocaleString(), suffix: 'دينار / شهر', featured: true, badge: PLAN_CONFIGS.PRO.badge ?? 'الأكثر طلباً',
      features: PLAN_CONFIGS.PRO.features,
      cta: `خصم ${PLAN_CONFIGS.PRO.firstYearDiscountPercent}% للسنة الأولى`, primary: true,
    },
    {
      key: 'ENTERPRISE' as const,
      name: PLAN_CONFIGS.ENTERPRISE.nameAr, price: PLAN_CONFIGS.ENTERPRISE.priceIQD.toLocaleString(), discounted: PLAN_CONFIGS.ENTERPRISE.firstYearPriceIQD!.toLocaleString(), suffix: 'دينار / شهر', featured: false,
      features: PLAN_CONFIGS.ENTERPRISE.features,
      cta: `خصم ${PLAN_CONFIGS.ENTERPRISE.firstYearDiscountPercent}% للسنة الأولى`, primary: false,
    },
  ];

  return (
    <section id="pricing" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: C.bg }}>
      <WavePatternOverlay opacity={0.04} color={C.dark} />
      <div style={INNER()}>
        <h2 style={TITLE}>اختر الباقة المناسبة لك</h2>
        <p style={SUB}>ابدأ مجاناً — لا يوجد بطاقة ائتمانية مطلوبة</p>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div key={i}
              style={{ background: C.white, borderRadius: 20, padding: '32px 28px', border: `${plan.featured ? 3 : 2}px solid ${plan.featured ? C.rose : C.soft}`, position: 'relative', transition: 'all .3s', boxShadow: plan.featured ? '0 0 40px rgba(174,68,90,.12)' : 'none', transform: plan.featured ? (visible ? 'scale(1.04)' : 'translateY(20px)') : (visible ? 'scale(1)' : 'translateY(20px)'), zIndex: plan.featured ? 2 : 1, opacity: visible ? 1 : 0, transitionDelay: `${i * 120}ms` }}
              onMouseEnter={e => { if (!plan.featured) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(67,46,84,.1)'; }}}
              onMouseLeave={e => { if (!plan.featured) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}}>
              {plan.badge && (
                <div style={{ position: 'absolute', top: -13, right: 24, background: C.accent, color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 16px', borderRadius: 20 }}>{plan.badge}</div>
              )}
              <div style={{ fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ marginBottom: 10 }}>
                <PlanPrice plan={plan.key} align="right" />
              </div>
              <div style={{ marginTop: 24, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#524B62' }}>
                    <span style={{ color: C.success, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/register">
                <button style={{ display: 'block', width: '100%', padding: 13, borderRadius: 12, background: plan.primary ? C.rose : 'transparent', color: plan.primary ? '#fff' : C.rose, fontSize: 16, fontWeight: 700, border: `2px solid ${C.rose}`, cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'all .3s', textAlign: 'center' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}>
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Comparison ─── */
function PlanValue({ value }: { value: boolean | string | null }) {
  if (value === true) {
    return <span style={{ color: C.success, fontWeight: 700 }}>✓</span>;
  }
  if (value === false) {
    return <span style={{ color: C.note, fontWeight: 700 }}>—</span>;
  }
  if (value === null) {
    return <span style={{ color: '#DC2626', fontWeight: 700 }}>✕</span>;
  }
  return <span style={{ color: C.dark, fontWeight: 600 }}>{value}</span>;
}

function LPPlanComparison() {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section id="plan-comparison" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: C.bg }}>
      <WavePatternOverlay opacity={0.04} color={C.dark} />
      <div style={INNER(1040)}>
        <h2 style={TITLE}>مقارنة الخطط</h2>
        <p style={SUB}>كل شيء في مكان واحد: السعر، الحدود، والمزايا</p>

        <BrowserFrame accentBg={C.accent} bodyBg={C.dark} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all .5s ease' }}>
          <div style={{ background: C.white, borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: "'Tajawal', sans-serif" }}>
              <thead>
                <tr>
                  <th style={{ background: C.bg, padding: '14px 18px', fontWeight: 700, textAlign: 'right', color: C.dark }}>الميزة</th>
                  {(['FREE', 'PRO', 'ENTERPRISE'] as const).map(plan => (
                    <th key={plan} style={{ background: C.bg, padding: '14px 18px', fontWeight: 700, textAlign: 'center', color: C.dark }}>
                      <div style={{ fontSize: 15 }}>{PLAN_CONFIGS[plan].nameAr}</div>
                      <div style={{ fontSize: 12, color: C.text2, marginTop: 4 }}>
                        {PLAN_CONFIGS[plan].priceIQD.toLocaleString()} د.ع
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON.map((row, i) => (
                  <tr key={row.label}>
                    <td style={{ padding: '12px 18px', borderBottom: '1px solid #F0EEF3', textAlign: 'right', color: C.dark }}>
                      <div style={{ fontWeight: 600 }}>{row.label}</div>
                      {row.sub && <div style={{ fontSize: 12, color: C.note, marginTop: 2 }}>{row.sub}</div>}
                    </td>
                    {(['FREE', 'PRO', 'ENTERPRISE'] as const).map(plan => (
                      <td
                        key={plan}
                        style={{
                          padding: '12px 18px',
                          borderBottom: '1px solid #F0EEF3',
                          textAlign: 'center',
                          background: plan === 'PRO' ? 'rgba(124,58,237,.03)' : plan === 'ENTERPRISE' ? 'rgba(217,119,6,.03)' : 'transparent',
                        }}
                      >
                        <PlanValue value={row[plan]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BrowserFrame>
      </div>
    </section>
  );
}

function LPComparison() {
  const [ref, visible] = useScrollReveal(0.1);
  const rows = [
    { feature: 'دعم الدفع العراقي (ZainCash، بطاقات محلية)', sb: '✓ مدمج', shopify: '✗ يحتاج إضافة مدفوعة' },
    { feature: 'اللغة العربية الكاملة', sb: '✓', shopify: '⚠️ جزئي' },
    { feature: 'العملة بالدينار العراقي', sb: '✓', shopify: '✗' },
    { feature: 'تكامل شحن داخل العراق', sb: '✓', shopify: '✗' },
    { feature: 'الدعم الفوري بالعربي', sb: '✓ 24/7', shopify: '✗ بالإنجليزي' },
    { feature: 'السعر الشهري', sb: `من ${PLAN_CONFIGS.FREE.priceIQD.toLocaleString()} د.ع`, shopify: `~$29 دولار (~${PLAN_CONFIGS.PRO.priceIQD.toLocaleString()} د)` },
    { feature: 'فهم السوق المحلي', sb: '✓ مبني للعراق', shopify: '✗ منصة عالمية' },
  ];

  return (
    <section id="comparison" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: C.white }}>
      <WavePatternOverlay opacity={0.04} color={C.dark} />
      <div style={INNER(900)}>
        <h2 style={TITLE}>ليش StoreBuilder وليس Shopify؟</h2>
        <p style={SUB}>مقارنة صريحة — أنت تقرر</p>
        <BrowserFrame accentBg={C.accent} bodyBg={C.dark} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all .5s ease' }}>
          <div style={{ background: C.white, borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: "'Tajawal', sans-serif" }}>
              <thead>
                <tr>
                  <th style={{ background: C.bg, padding: '14px 20px', fontWeight: 700, textAlign: 'right', color: C.dark, fontSize: 15 }}>الميزة</th>
                  <th style={{ background: C.bg, padding: '14px 20px', fontWeight: 700, textAlign: 'center', color: C.dark }}>StoreBuilder</th>
                  <th style={{ background: C.bg, padding: '14px 20px', fontWeight: 700, textAlign: 'center', color: C.text2 }}>Shopify</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #F0EEF3', textAlign: 'right', color: C.dark }}>{r.feature}</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #F0EEF3', textAlign: 'center', color: r.sb.startsWith('✓') ? C.success : C.dark, fontWeight: 600, background: 'rgba(46,125,91,.03)' }}>{r.sb}</td>
                    <td style={{ padding: '12px 20px', borderBottom: '1px solid #F0EEF3', textAlign: 'center', color: C.text2 }}>{r.shopify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BrowserFrame>
        <p style={{ fontSize: 12, color: C.note, textAlign: 'center', marginTop: 16 }}>* بيانات موثقة من الموقع الرسمي لـ Shopify</p>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function LPFinalCTA() {
  return (
    <section id="final-cta" style={{ ...SEC, background: C.accent }}>
      <GridOverlay opacity={0.08} color="rgba(255,255,255,.3)" size={48} />
      <DecoStar size={80} color={C.dark} style={{ position: 'absolute', top: '12%', left: '8%', opacity: .2 }} rotate={15} />
      <DecoStar size={55} color={C.soft} style={{ position: 'absolute', bottom: '15%', right: '6%', opacity: .3 }} rotate={-10} />
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>جاهز تبني متجرك؟</h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,.85)', marginBottom: 36, lineHeight: 1.6 }}>
          انضم لآلاف التجار العراقيين الذين يبيعون الآن على الإنترنت 🇮🇶
        </p>
        <Link href="/register">
          <button style={{ display: 'inline-block', background: C.dark, color: '#fff', padding: '18px 48px', borderRadius: 14, fontSize: 20, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'all .3s', marginBottom: 28 }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'scale(1.04)'; b.style.boxShadow = '0 8px 30px rgba(67,46,84,.4)'; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'scale(1)'; b.style.boxShadow = 'none'; }}>
            ابدأ مجاناً — بدون بطاقة ائتمانية
          </button>
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
          {[['🔒', 'آمن 100%'], ['⚡', 'إعداد في 5 دقائق'], ['💯', 'دعم بالعربي']].map(([icon, label], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.8)', fontSize: 14, fontWeight: 500 }}>
              <span>{icon}</span>{label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function LPFooter() {
  const navLinks = ['المزايا', 'الأسعار', 'من نحن', 'سياسة الخصوصية', 'تواصل معنا'];
  const socials = [
    { label: 'فيسبوك', icon: 'f' }, { label: 'الانستغرام', icon: 'in' },
    { label: 'تويتر', icon: 'X' },  { label: 'تلغرام', icon: 'tg' },
  ];

  return (
    <footer style={{ background: C.dark, padding: '56px 32px 24px', fontFamily: "'Tajawal', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, marginBottom: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>StoreBuilder</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.5 }}>المنصة العراقية للتجارة الإلكترونية</div>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {navLinks.map((l, i) => (
              <button key={i}
                style={{ color: 'rgba(255,255,255,.6)', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.6)')}>
                {l}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {socials.map((s, i) => (
              <button key={i} title={s.label}
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.6)', fontSize: 16, cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.color = 'rgba(255,255,255,.6)'; }}>
                {s.icon}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,.08)', margin: '0 0 20px' }} />
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,.35)' }}>© 2025 StoreBuilder — صُنع بـ ❤️ من العراق</span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Tajawal', sans-serif" }}>
      <LPHeader />
      <LPHero />
      <LPPainPoints />
      <LPSteps />
      <LPFeatures />
      <LPEmotional />
      <LPPricing />
      <LPPlanComparison />
      <LPComparison />
      <LPFinalCTA />
      <LPFooter />
    </div>
  );
}
