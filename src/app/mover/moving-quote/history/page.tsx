'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';
import { useRouter } from 'next/navigation';
import QuoteOffer from './core/components/QuoteOffer';
import RejectedQuot from './core/components/RejectedQuot';

// 최상위 stack에 paddingX="24px" 넣기
export default function MoverMovingQuoteHistoryPage() {
  const { tabBarType } = useTabBarType();
  const router = useRouter();

  //TODO : 리엑트 쿼리 연결 / type 일반 = "quotation", 완료 = "finishRequest", 거절 = "rejectRequest"
  //        견적 대기, 지정 견적 등등 확인해서 서비스로 넘겨줘야함 / Card도 넘겨주는 값 생각
  return (
    <Stack justifyContent="center" alignItems="center" gap="20px" paddingX="24px" height="100%">
      <Stack
        direction="column"
        width="100%"
        height="100%"
        alignItems="flex-start"
        bgcolor={colorChips.background.f7f7f7}
      ></Stack>
      {tabBarType === 'quoteOffer' && <QuoteOffer />}
      {tabBarType === 'rejectedQuote' && <RejectedQuot />}
    </Stack>
  );
}
