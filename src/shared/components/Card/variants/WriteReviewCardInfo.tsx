'use client';

import { useRouter } from 'next/navigation';
import { Stack, useMediaQuery } from '@mui/material';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { PATH } from '@/shared/constants';
import theme from '@/shared/theme';
import { CommonCardInfoProps } from '../CommonCardInfo';
import Image from 'next/image';

type WriteReviewCardInfoProps = Omit<CommonCardInfoProps, 'type'>;

export default function WriteReviewCardInfo({ data }: WriteReviewCardInfoProps) {
  const router = useRouter();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typo className={isMdDown ? 'text_SB_14' : 'text_SB_18'}>{data.name} 기사님</Typo>
      </Stack>

      <Stack direction="row">
        <Stack direction="row" gap="4px">
          <Stack position="relative" sx={{ width: { xs: '20px', md: '24px' } }}>
            <Image
              src="/assets/images/star-icon/star-yellow-24x24.svg"
              alt="like icon"
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
        </Stack>
        <Stack direction="row" gap="6px" sx={{ textWrap: 'nowrap' }}>
          <Typo
            className={isMdDown ? 'text_M_13' : 'text_M_16'}
            style={{ color: colorChips.grayScale[300], paddingLeft: isMdDown ? '8px' : '16px' }}
          >
            경력
          </Typo>
          <Typo
            className={isMdDown ? 'text_M_13' : 'text_M_16'}
            style={{
              color: colorChips.black[300],
              borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
              paddingRight: isMdDown ? '8px' : '16px',
            }}
          >
            {data.career}년
          </Typo>
        </Stack>
        <Stack direction="row" gap="6px" sx={{ textWrap: 'nowrap' }}>
          <Typo
            className={isMdDown ? 'text_M_13' : 'text_M_16'}
            style={{ color: colorChips.black[300], paddingLeft: isMdDown ? '8px' : '16px' }}
          >
            {data.confirmation}건
          </Typo>
          <Typo
            className={isMdDown ? 'text_M_13' : 'text_M_16'}
            style={{
              color: colorChips.grayScale[300],
            }}
          >
            확정
          </Typo>
        </Stack>
      </Stack>

      <Stack direction={isMobile ? 'column' : 'row'} gap="8px" sx={{ paddingTop: '26px' }}>
        <SolidButton text="리뷰 작성하기" width="100%" onClick={() => router.push(PATH.mover.movingQuoteRequest)} />
      </Stack>
    </>
  );
}
