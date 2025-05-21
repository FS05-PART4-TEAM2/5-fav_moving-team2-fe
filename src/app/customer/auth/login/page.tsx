'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';

export default function Page() {
  return (
    <Stack height="100%" bgcolor={colorChips.secondary.yellow[100]}>
      <Typo className="text_B_20" content="일반 유저 로그인 페이지" />
    </Stack>
  );
}
