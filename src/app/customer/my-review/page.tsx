'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import { useTabBarType } from '@/shared/context/TabBarProvider';

// 최상위 stack에 paddingX="24px" 넣기
export default function CustomerReviewPage() {
  const { tabBarType } = useTabBarType();

  return (
    <Stack justifyContent="center" alignItems="center" gap="20px" paddingX="24px" height="100%">
      <Stack
        direction="column"
        width="100%"
        height="100%"
        alignItems="flex-start"
        bgcolor={colorChips.background.f7f7f7}
      >
        <Typo className="text_B_20" content="이사 리뷰 페이지" />
      </Stack>
      {tabBarType === 'writeReview' && <TabBarTest1 />}
      {tabBarType === 'finishedReview' && <TabBarTest2 />}
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
      <Typo content="작성 가능한 리뷰" className="text_M_16" color={colorChips.black[400]} />
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
      <Typo content="내가 작성한 리뷰" className="text_M_16" color={colorChips.black[400]} />
    </Stack>
  );
};
