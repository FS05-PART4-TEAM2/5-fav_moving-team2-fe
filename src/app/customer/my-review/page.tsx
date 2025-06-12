'use client';

import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { WriteReviewFeature } from './features/WriteReview/feature';
import { FinishedReviewFeature } from './features/FinishedReview/feature';

// 최상위 stack에 paddingX="24px" 넣기
export default function CustomerReviewPage() {
  const { tabBarType, setTabBarType } = useTabBarType();
  const searchParams = useSearchParams();

  // URL 파라미터로 탭 설정
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'write') {
      setTabBarType('writeReview');
    } else if (tab === 'finished') {
      setTabBarType('finishedReview');
    }
  }, [searchParams, setTabBarType]);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center" height="100%">
      {tabBarType === 'writeReview' && <WriteReviewFeature />}
      {tabBarType === 'finishedReview' && <FinishedReviewFeature />}
    </Stack>
  );
}
