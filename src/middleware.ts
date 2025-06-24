import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt, type JWTPayload } from 'jose';

interface MyPayload extends JWTPayload {
  sub: string;
  email: string;
  role: 'customer' | 'mover';
  isProfile: boolean;
}

function isPayload(payload: JWTPayload | null | undefined): payload is MyPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    typeof (payload as any).sub === 'string' &&
    typeof (payload as any).email === 'string' &&
    ((payload as any).role === 'customer' || (payload as any).role === 'mover') &&
    typeof payload.isProfile === 'boolean'
  );
}

const AUTH_PAGES = ['/customer/login', '/customer/signup', '/mover/login', '/mover/signup', '/oauth'];

const PUBLIC_PATHS = ['/', '/customer/search-mover', ...AUTH_PAGES];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export default function middleware(req: NextRequest) {
  console.log('🔥 middleware 실행됨');

  const { pathname } = req.nextUrl;
  const referer = req.headers.get('referer') ?? '';
  const token = req.cookies.get('accessToken')?.value;
  console.log(' pathname', pathname);
  console.log(' token', token);

  if (isPublic(pathname)) {
    if (AUTH_PAGES.includes(pathname) && token) {
      try {
        if (token) {
          const payload = decodeJwt(token);
          return NextResponse.redirect(
            new URL(
              payload.role === 'customer' ? '/customer/moving-quote/request' : '/mover/moving-quote/request',
              req.url,
            ),
          );
        }
      } catch {}
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/customer/login', req.url));
  }

  let payload: JWTPayload | null | undefined;
  try {
    payload = decodeJwt(token);
    console.log('🧩 payload=', payload);
  } catch (err) {
    console.error('디코딩 실패', err);
    return NextResponse.redirect(new URL('/customer/login', req.url));
  }

  if (!isPayload(payload)) {
    console.error('payload 검증 실패:', payload);
    return NextResponse.redirect(new URL('/customer/login', req.url));
  }

  const { role, isProfile } = payload;
  console.log('role:', role);
  console.log('isProfile:', isProfile);

  const isCustomer = role === 'customer';
  const isMover = role === 'mover';

  if (!isProfile && (isCustomer || isMover)) {
    const profilePath = isCustomer ? '/customer/profile' : '/mover/profile';
    if (!pathname.startsWith(profilePath)) {
      return NextResponse.redirect(new URL(profilePath, req.url));
    }
    return NextResponse.next();
  }

  const isCustomerRoute = pathname.startsWith('/customer');
  const isMoverRoute = pathname.startsWith('/mover');

  if ((isCustomerRoute && !isCustomer) || (isMoverRoute && !isMover)) {
    const fallback = role === 'customer' ? '/customer/moving-quote/request' : '/mover/moving-quote/request';
    const destination = referer ? new URL(referer, req.url) : new URL(fallback, req.url);
    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
