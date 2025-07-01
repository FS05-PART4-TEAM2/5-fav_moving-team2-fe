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

const PUBLIC_PATHS = ['/', '/404', '/500', '/not-found', '/global-error', '/customer/search-mover', ...AUTH_PAGES];

function isPublic(pathname: string) {
  if (pathname.endsWith('/not-found')) return true;
  if (pathname.endsWith('/error') || pathname.endsWith('/global-error')) return true;
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export default function middleware(req: NextRequest) {
  console.log('🔥 middleware 실행됨');

  const { pathname } = req.nextUrl;
  const referer = req.headers.get('referer') ?? '';
  const token = req.cookies?.get?.('accessToken')?.value ?? null;
  const refresh = req.cookies?.get?.('refreshToken')?.value ?? null;
  console.log(' pathname', pathname);
  console.log(' token', token);

  const isAuthApi = pathname.startsWith('/api/auth/') && (pathname.endsWith('/login') || pathname.endsWith('/signup'));

  if (isAuthApi) {
    console.log('↩️ Auth API bypass middleware for', pathname);
    return NextResponse.next();
  }

  if (isPublic(pathname)) {
    if (AUTH_PAGES.includes(pathname) && token) {
      try {
        const payload = decodeJwt(token) as MyPayload;
        const redirectPath =
          payload.role === 'customer' ? '/customer/moving-quote/request' : '/mover/moving-quote/request';
        const url = new URL(redirectPath, req.url);
        url.searchParams.set('alert', '이미 로그인된 상태입니다.');
        return NextResponse.redirect(url);
      } catch {}
    }

    return NextResponse.next();
  }

  if (!token) {
    if (refresh) {
      console.log('🔄 refreshToken present, rewriting to /api/auth/refresh');
      const url = req.nextUrl.clone();
      url.pathname = '/api/auth/refresh';
      return NextResponse.rewrite(url);
    }
    const isApiRequest = pathname.startsWith('/api');
    console.log('Is API request?', isApiRequest);

    if (isApiRequest) {
      console.log('→ sending 401 JSON: Unauthorized: No token');
      return new NextResponse(JSON.stringify({ message: 'Unauthorized: No token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log(`→ Redirecting to ${pathname.startsWith('/mover') ? 'mover' : 'customer'} login`);
    const isMoverRoute = pathname.startsWith('/mover');
    const redirectPath = isMoverRoute ? '/mover/login' : '/customer/login';

    const url = new URL(redirectPath, req.url);
    url.searchParams.set('alert', '로그인이 필요한 페이지입니다.');
    return NextResponse.redirect(url);
  }

  let payload: JWTPayload | null | undefined;
  try {
    payload = decodeJwt(token);
    console.log('🧩 payload=', payload);
  } catch (err) {
    console.error('디코딩 실패', err);
    const url = new URL('/customer/login', req.url);
    url.searchParams.set('alert', '로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.');
    return NextResponse.redirect(url);
  }

  if (!isPayload(payload)) {
    console.error('payload 검증 실패:', payload);
    const url = new URL('/customer/login', req.url);
    url.searchParams.set('alert', '로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.');
    return NextResponse.redirect(url);
  }

  const { role, isProfile } = payload;
  console.log('role:', role);
  console.log('isProfile:', isProfile);

  const isCustomer = role === 'customer';
  const isMover = role === 'mover';

  if (!isProfile && (isCustomer || isMover)) {
    const profilePath = isCustomer ? '/customer/profile' : '/mover/profile';
    if (!pathname.startsWith(profilePath)) {
      const url = new URL(profilePath, req.url);
      url.searchParams.set('alert', '프로필 작성을 먼저 완료해 주세요.');
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const isCustomerRoute = pathname.startsWith('/customer');
  const isMoverRoute = pathname.startsWith('/mover');

  if ((isCustomerRoute && !isCustomer) || (isMoverRoute && !isMover)) {
    const fallback = role === 'customer' ? '/customer/moving-quote/request' : '/mover/moving-quote/request';
    const alertMessage = isCustomer
      ? '일반 회원은 기사님 페이지에 접근할 수 없습니다.'
      : '기사님은 고객 페이지에 접근할 수 없습니다.';
    const url = referer ? new URL(referer, req.url) : new URL(fallback, req.url);
    url.searchParams.set('alert', alertMessage);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
