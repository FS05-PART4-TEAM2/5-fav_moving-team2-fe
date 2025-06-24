import { Suspense } from 'react';
import OAuthCallbackIndex from './_components/OAuthCallbackIndex';

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>로그인 중입니다...</div>}>
      <OAuthCallbackIndex />
    </Suspense>
  );
}
