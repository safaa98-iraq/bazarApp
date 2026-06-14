'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ minHeight: '100vh', background: '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tajawal)', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: 80, marginBottom: 8, lineHeight: 1 }}>⚠️</div>
        <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#1C0E2E', margin: '0 0 16px' }}>
          حدث خطأ ما
        </h1>
        <p style={{ fontSize: 15, color: '#7B6B8D', marginBottom: 36, lineHeight: 1.75 }}>
          نعتذر، حدثت مشكلة غير متوقعة.<br />يمكنك المحاولة مجدداً أو العودة للرئيسية.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} style={{ padding: '13px 28px', background: 'linear-gradient(135deg, #432E54, #AE445A)', color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(174,68,90,.25)' }}>
            حاول مجدداً
          </button>
          <Link href="/" style={{ padding: '13px 28px', background: '#fff', border: '1.5px solid #E8BCB9', color: '#432E54', fontWeight: 700, fontSize: 15, borderRadius: 12, textDecoration: 'none' }}>
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
