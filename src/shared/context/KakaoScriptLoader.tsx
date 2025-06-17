'use client';

import { useEffect } from 'react';

export default function KakaoScriptLoader() {
  useEffect(() => {
    if (document.getElementById('kakao-sdk')) return;

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.id = 'kakao-sdk';
    document.head.appendChild(script);
  }, []);

  return null;
}
