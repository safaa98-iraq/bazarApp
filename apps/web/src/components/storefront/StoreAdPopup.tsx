'use client';
import { useEffect, useRef, useState } from 'react';
import { X, Zap } from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';
const SLOT   = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? '';
const DELAY  = Number(process.env.NEXT_PUBLIC_AD_DELAY_MS ?? 8000);
const REPEAT = Number(process.env.NEXT_PUBLIC_AD_INTERVAL_MS ?? 180000);

function AdUnit() {
  const ref = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !ref.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {/* AdSense not loaded yet */}
  }, []);

  if (!CLIENT || CLIENT === 'ca-pub-XXXXXXXXXXXXXXXX') {
    return (
      <div style={{
        width: '100%', height: 250, borderRadius: 12, overflow: 'hidden',
        background: 'linear-gradient(135deg,#f0e6ff,#ffe8ec)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        border: '2px dashed #d4bfff',
      }}>
        <div style={{ fontSize: 36 }}>📢</div>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#432E54' }}>مساحة إعلانية</div>
        <div style={{ fontSize: 12, color: '#7B6B8D', textAlign: 'center', padding: '0 20px' }}>
          سيظهر هنا إعلان Google AdSense بعد إعداد الـ Publisher ID
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ width: '100%', minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: 250 }}
        data-ad-client={CLIENT}
        data-ad-slot={SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

interface Props {
  storeName: string;
  storeSlug: string;
  themeColor?: string;
}

export function StoreAdPopup({ storeName, storeSlug, themeColor = '#432E54' }: Props) {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { setVisible(true); setMinimized(false); };
  const close = () => {
    setVisible(false);
    // Reappear after REPEAT ms
    timerRef.current = setTimeout(show, REPEAT);
  };

  useEffect(() => {
    timerRef.current = setTimeout(show, DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* AdSense script — lazy load once */}
      {CLIENT && CLIENT !== 'ca-pub-XXXXXXXXXXXXXXXX' && (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
          crossOrigin="anonymous"
        />
      )}

      {/* Backdrop (semi-transparent on mobile, none on desktop) */}
      <div
        onClick={close}
        style={{
          position: 'fixed', inset: 0, zIndex: 1200,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
      >
        {/* Popup card */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 480,
            background: '#fff', borderRadius: '24px 24px 0 0',
            boxShadow: '0 -20px 60px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            animation: 'slide-up .35s cubic-bezier(.16,1,.3,1)',
            position: 'relative',
          }}
        >
          {/* Header bar */}
          <div style={{
            background: themeColor,
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 18 }}>📢</div>
              <div>
                <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>
                  إعلان مدعوم
                </div>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, opacity: .8 }}>
                  هذا المتجر على الخطة المجانية
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                onClick={() => setMinimized(m => !m)}
                style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {minimized ? 'عرض' : 'طيّ'}
              </button>
              <button
                onClick={close}
                style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Ad content */}
          {!minimized && (
            <div style={{ padding: '16px 16px 12px' }}>
              <AdUnit />
            </div>
          )}

          {/* Upgrade nudge */}
          {!minimized && (
            <div style={{
              margin: '0 16px 16px',
              background: 'linear-gradient(135deg,#FFF0EB,#FFF0F3)',
              border: '1px solid #E8BCB9',
              borderRadius: 14, padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#432E54' }}>
                  هل أنت صاحب هذا المتجر؟
                </div>
                <div style={{ fontSize: 11, color: '#7B6B8D', marginTop: 2 }}>
                  ارفع خطتك وتخلص من الإعلانات نهائياً
                </div>
              </div>
              <Link
                href="/dashboard/upgrade"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'linear-gradient(135deg,#432E54,#AE445A)',
                  color: '#fff', textDecoration: 'none',
                  padding: '8px 14px', borderRadius: 10,
                  fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <Zap size={12} />
                ترقية
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
