'use client';

import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';
import { PendingQuoteFeature } from './features/PendingQuote/feature';
import { ReceivedQuoteFeature } from './features/ReceivedQuote/feature';
import { useEffect } from 'react';
import { useQuoteHistoryData } from './core/hooks/useQuoteHistoryData';

export default function CustomerMovingQuoteHistoryPage() {
  const { tabBarType } = useTabBarType();
  const { dataCache, loadingStates, loadPendingQuotes, loadReceivedQuotes } = useQuoteHistoryData();

  // 탭 변경 시 해당 데이터가 없으면 로드
  useEffect(() => {
    if (tabBarType === 'pendingQuote') {
      loadPendingQuotes();
    } else if (tabBarType === 'receivedQuote') {
      loadReceivedQuotes();
    }
  }, [tabBarType]);

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
