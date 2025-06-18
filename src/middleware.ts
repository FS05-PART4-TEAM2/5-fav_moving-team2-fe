import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt, type JWTPayload } from 'jose';

interface MyPayload extends JWTPayload {
  sub: string;
  email: string;
  userType: 'customer' | 'mover';
}

function isPayload(payload: JWTPayload | null | undefined): payload is MyPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    typeof (payload as any).sub === 'string' &&
    typeof (payload as any).email === 'string' &&
    ((payload as any).userType === 'customer' || (payload as any).userType === 'mover')
  );
}

const PUBLIC_PATHS = [
  '/',
  '/oauth',
  '/customer/login',
  '/customer/signup',
  '/mover/login',
  '/mover/signup',
  '/customer/search-mover',
];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('accessToken')?.value;
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

  const { userType } = payload;

  if (pathname.startsWith('/customer') && userType !== 'customer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (pathname.startsWith('/mover') && userType !== 'mover') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/customer/:path*', '/mover/:path*'],
};
