'use client';

import { Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import theme from '@/shared/theme';
import { CommonCardInfoProps } from '../CommonCardInfo';

export default function ReviewCardInfo({ data }: CommonCardInfoProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction="row" gap="4px" alignItems="center">
      <Stack position="relative" sx={{ width: { xs: 20, md: 24 }, height: { xs: 20, md: 24 } }}>
        <Image
          src="/assets/images/star-icon/star-yellow-24x24.svg"
          alt="score icon"
          fill
          style={{ objectFit: 'contain' }}
        />
      </Stack>
      <Typo className={isMdDown ? 'text_M_13' : 'text_M_16'} style={{ color: colorChips.black[300] }}>
        {data.review?.averageScore?.toFixed(1) ?? '0.0'}
      </Typo>
      <Typo
        className={isMdDown ? 'text_M_13' : 'text_M_16'}
        style={{
          color: colorChips.grayScale[300],
          borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
          paddingRight: isMdDown ? '8px' : '16px',
        }}
      >
        ({data.review?.reviewer})
      </Typo>
      <Typo
        className={isMdDown ? 'text_M_13' : 'text_M_16'}
        style={{ color: colorChips.grayScale[300], paddingLeft: isMdDown ? '8px' : '16px' }}
      >
        경력
      </Typo>
      <Typo className={isMdDown ? 'text_M_13' : 'text_M_16'} style={{ color: colorChips.black[300] }}>
        {data.career}년
      </Typo>
    </Stack>
  );
}
