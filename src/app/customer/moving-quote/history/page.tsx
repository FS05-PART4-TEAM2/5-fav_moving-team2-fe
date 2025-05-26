'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { useRouter } from 'next/navigation';

export default function CustomerMovingQuoteHistoryPage() {
  const { tabBarType } = useTabBarType();
  const router = useRouter();

  return (
    <Stack justifyContent="center" alignItems="center" gap="20px" padding="20px" height="100%">
      <Stack
        direction="column"
        width="100%"
        height="100%"
        alignItems="flex-start"
        bgcolor={colorChips.background.f7f7f7}
      >
        <Typo className="text_B_20" content="일반유저 내견적관리 페이지" />
        <SolidButton text="견적상세 페이지 이동" onClick={() => router.push('/customer/moving-quote/history/1')} />
      </Stack>
      {tabBarType === 'pendingQuote' && <TabBarTest1 />}
      {tabBarType === 'receivedQuote' && <TabBarTest2 />}
    </Stack>
  );
}

const TabBarTest1 = () => {
  return (
    <Stack
      direction="column"
      width="100%"
      height="300px"
      justifyContent="center"
      alignItems="center"
      gap="20px"
      bgcolor={colorChips.primary[100]}
    >
      <Typo content="대기 중인 견적" className="text_M_16" color={colorChips.black[400]} />
    </Stack>
  );
};

const TabBarTest2 = () => {
  return (
    <Stack
      direction="column"
      width="100%"
      height="300px"
      justifyContent="center"
      alignItems="center"
      gap="20px"
      bgcolor={colorChips.secondary.red[100]}
    >
      <Typo content="받았던 견적" className="text_M_16" color={colorChips.black[400]} />
    </Stack>
  );
};
