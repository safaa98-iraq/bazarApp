import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tajawal)', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: 96, marginBottom: 8, lineHeight: 1 }}>🔍</div>
        <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 48px)', color: '#1C0E2E', margin: '0 0 16px' }}>
          الصفحة غير موجودة
        </h1>
        <p style={{ fontSize: 16, color: '#7B6B8D', marginBottom: 36, lineHeight: 1.75 }}>
          الرابط الذي طلبته غير موجود أو تم نقله.<br />
          تحقق من الرابط أو عُد إلى الصفحة الرئيسية.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ padding: '13px 28px', background: 'linear-gradient(135deg, #432E54, #AE445A)', color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 20px rgba(174,68,90,.25)' }}>
            الصفحة الرئيسية
          </Link>
          <Link href="/dashboard" style={{ padding: '13px 28px', background: '#fff', border: '1.5px solid #E8BCB9', color: '#432E54', fontWeight: 700, fontSize: 15, borderRadius: 12, textDecoration: 'none' }}>
            لوحة التحكم
          </Link>
        </div>
      </div>
    </div>
  );
}
