'use client';

import { Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import theme from '@/shared/theme';
import { CommonCardInfoProps } from '../CommonCardInfo';
import dayjs from 'dayjs';

type WaitRequestCardInfoProps = Omit<CommonCardInfoProps, 'type'>;

export default function WaitRequestCardInfo({ data }: WaitRequestCardInfoProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const formatted = (date: string): string => {
    return dayjs(date).format('YYYY.MM.DD(dd)');
  };

  return (
    <>
      <Stack
        direction={isMdDown ? 'column' : 'row'}
        gap="20px"
        sx={{ textWrap: 'nowrap', pt: isMdDown ? '14px' : '24px' }}
      >
        <Stack
          direction="row"
          gap="6px"
          alignItems="center"
          sx={{ borderRight: isMdDown ? '' : `1px solid ${colorChips.line['e6e6e6']}`, pr: isMdDown ? '' : '16px' }}
        >
          <Typo
            className="text_M_14"
            style={{
              backgroundColor: colorChips.background['f4f7fb'],
              padding: '2px 6px',
              borderRadius: '4px',
              color: colorChips.grayScale[500],
            }}
          >
            이사일
          </Typo>
          <Typo className="text_M_14" style={{ color: colorChips.black[300] }}>
            {formatted(data.moveDay ?? '')}
          </Typo>
        </Stack>
        <Stack direction="row">
          <Stack direction="row" gap="6px" alignItems="center">
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              출발
            </Typo>
            <Typo
              className="text_M_14"
              style={{
                color: colorChips.black[300],
                borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                paddingRight: '14px',
              }}
            >
              {data.startPoint}
            </Typo>
          </Stack>
          <Stack direction="row" gap="6px" alignItems="center" sx={{ pl: isMdDown ? '14px' : '16px' }}>
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              도착
            </Typo>
            <Typo className="text_M_14" style={{ color: colorChips.black[300] }}>
              {data.endPoint}
            </Typo>
          </Stack>
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
          180,000원
        </Typo>
      </Stack>
    </>
  );
}
