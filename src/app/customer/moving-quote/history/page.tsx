'use client';

import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';
import { PendingQuoteFeature } from './features/PendingQuote/feature';
import { ReceivedQuoteFeature } from './features/ReceivedQuote/feature';
import { useEffect } from 'react';
import { useQuoteHistoryData } from './core/hooks/useQuoteHistoryData';
import { useSearchParams } from 'next/navigation';

export default function CustomerMovingQuoteHistoryPage() {
  const { tabBarType, setTabBarType } = useTabBarType();
  const { dataCache, loadingStates } = useQuoteHistoryData();
  const searchParams = useSearchParams();

  // URL 파라미터로 탭 설정
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'received') {
      setTabBarType('receivedQuote');
    } else if (tab === 'pending') {
      setTabBarType('pendingQuote');
    }
  }, [searchParams, setTabBarType]);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center" height="100%">
      {tabBarType === 'pendingQuote' && (
        <PendingQuoteFeature data={dataCache.pendingQuotes} isLoading={loadingStates.pendingQuotes} />
      )}
      {tabBarType === 'receivedQuote' && (
        <ReceivedQuoteFeature data={dataCache.receivedQuotes} isLoading={loadingStates.receivedQuotes} />
      )}
    </Stack>
  );
}
