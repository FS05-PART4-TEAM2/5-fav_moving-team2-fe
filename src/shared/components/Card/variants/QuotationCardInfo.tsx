'use client';

import { Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import theme from '@/shared/theme';
import { CommonCardInfoProps } from '../CommonCardInfo';
import Image from 'next/image';

type QuotationCardInfoProps = Omit<CommonCardInfoProps, 'type'>;

export default function QuotationCardInfo({ data }: QuotationCardInfoProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

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

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={isMdDown ? '8px' : '16px'}
        paddingTop={isMdDown ? '14px' : '16px'}
      >
        <Typo className={isMdDown ? 'text_M_14' : 'text_M_18'} style={{ color: colorChips.black[400] }}>
          견적 금액
        </Typo>
        <Typo className={isMdDown ? 'text_B_18' : 'text_B_24'} style={{ color: colorChips.black[400] }}>
          {data.quoteAmount}원
        </Typo>
      </Stack>
    </>
  );
}
