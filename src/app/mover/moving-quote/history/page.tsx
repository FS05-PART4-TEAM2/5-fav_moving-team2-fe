'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';
import QuoteOffer from './core/components/QuoteOffer';
import RejectedQuot from './core/components/RejectedQuot';

export default function MoverMovingQuoteHistoryPage() {
  const { tabBarType } = useTabBarType();

  return (
    <Stack justifyContent="center" alignItems="center" gap="20px" paddingX="24px" height="100%">
      <Stack
        direction="column"
        width="100%"
        height="100%"
        alignItems="flex-start"
        bgcolor={colorChips.background.f7f7f7}
      ></Stack>
      {tabBarType === 'quoteOffer' && <QuoteOffer tabType="quoteOffer" />}
      {tabBarType === 'rejectedQuote' && <RejectedQuot tabType="rejectedQuote" />}
    </Stack>
  );
}
