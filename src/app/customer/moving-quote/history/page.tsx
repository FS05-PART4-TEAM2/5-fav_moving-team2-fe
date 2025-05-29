'use client';

import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';
import { PendingQuoteFeature } from './features/PendingQuote/feature';
import { ReceivedQuoteFeature } from './features/ReceivedQuote/feature';

export default function CustomerMovingQuoteHistoryPage() {
  const { tabBarType } = useTabBarType();
  return (
    <Stack flex={1} justifyContent="center" alignItems="center" height="100%">
      {tabBarType === 'pendingQuote' && <PendingQuoteFeature />}
      {tabBarType === 'receivedQuote' && <ReceivedQuoteFeature />}
    </Stack>
  );
}
