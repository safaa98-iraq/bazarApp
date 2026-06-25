import type { Metadata } from 'next';
import { Tajawal, Cairo } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '600', '700', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

const googleAdsenseAccount = 'ca-pub-' + '7294279076144839';

export const metadata: Metadata = {
  title: 'StoreBuilder — ابنِ متجرك الإلكتروني في 5 دقائق',
  description: 'أقوى منصة تجارة إلكترونية في العراق. أنشئ متجرك بدون خبرة تقنية، واستقبل الطلبات فوراً.',
  other: {
    'google-adsense-account': googleAdsenseAccount,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${cairo.variable} font-[family-name:var(--font-tajawal)]`}>
        {children}
        <Toaster richColors position="top-left" />
      </body>
    </html>
  );
}
