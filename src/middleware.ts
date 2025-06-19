import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt, type JWTPayload } from 'jose';

interface MyPayload extends JWTPayload {
  sub: string;
  email: string;
  role: 'customer' | 'mover';
}

function isPayload(payload: JWTPayload | null | undefined): payload is MyPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    typeof (payload as any).sub === 'string' &&
    typeof (payload as any).email === 'string' &&
    ((payload as any).userType === 'customer' || (payload as any).role === 'mover')
  );
}

const AUTH_PAGES = ['/customer/login', '/customer/signup', '/mover/login', '/mover/signup'];

const PUBLIC_PATHS = ['/', '/oauth', ...AUTH_PAGES, '/customer/search-mover'];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;
  console.log(' pathname', pathname);
  console.log(' token', token);

  if (PUBLIC_PATHS.includes(pathname)) {
    if (AUTH_PAGES.includes(pathname) && token) {
      try {
        const payload = decodeJwt(token);
        if (isPayload(payload)) {
          const redirectTo = payload.role === 'customer' ? '/customer' : '/mover';
          return NextResponse.redirect(new URL(redirectTo, req.url));
        }
      } catch {}
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  let payload: JWTPayload | null | undefined;
  try {
    payload = decodeJwt(token);
    console.log('🧩 payload=', payload);
  } catch (err) {
    console.error('디코딩 실패', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!isPayload(payload)) {
    console.error('payload 검증 실패:', payload);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { role } = payload;
  console.log('role:', role);

  if (pathname.startsWith('/customer') && role !== 'customer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (pathname.startsWith('/mover') && role !== 'mover') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/customer/:path*', '/mover/:path*'],
};
