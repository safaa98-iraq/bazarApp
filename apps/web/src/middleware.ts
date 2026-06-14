import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('sb_token')?.value;

  if ((pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && pathname.startsWith('/admin')) {
    try {
      const part = token.split('.')[1];
      if (part) {
        const payload = JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
        if (payload?.role !== 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    } catch { /* ignore malformed token */ }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
