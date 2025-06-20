'use client';

import { useEffect, useState } from 'react';
import useUserStore from '@/shared/store/useUserStore';
import customAxios from '@/lib/customAxios';

// 에세슨는 없는데 로그인은 되있는 상황 방지를 위한 강제 로그아웃 처리
export default function SessionCheck() {
  const { userInfo, isAuthenticated, logout } = useUserStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 로그인 상태처럼 보이지만 실제 세션이 없을 수 있음 → 확인
    if (!userInfo || !isAuthenticated) {
      setChecked(true);
      return;
    }

    // 세션 존재 확인
    customAxios
      .get('/api/auth/refresh') // 쿠키에 refreshToken 포함됨
      .then(() => {
        setChecked(true); // 세션 유효
      })
      .catch(() => {
        logout(); // 세션 만료 → 상태 초기화
        setChecked(true);
      });
  }, []);

  if (!checked) return null;
  return null;
}
