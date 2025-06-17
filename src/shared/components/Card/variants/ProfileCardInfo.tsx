'use client';

import { Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import theme from '@/shared/theme';
import { CommonCardInfoProps } from '../CommonCardInfo';

type ProfileCardInfoProps = Omit<CommonCardInfoProps, 'type'>;

export default function ProfileCardInfo({ data, bgColor }: ProfileCardInfoProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        backgroundColor: bgColor ? colorChips.background.fafafa : 'white',
        border: `1px solid ${colorChips.line['f2f2f2']}`,
        borderRadius: '6px',
        boxShadow: '4px 4px 16px rgba(233, 233, 233, 0.1)',
        px: { xs: '14px', md: '16px' },
        py: { xs: '16px', md: '20px' },
      }}
    >
      <Stack direction="row" width="100%" sx={{ gap: { xs: '12px', lg: '24px' } }}>
        {!isMdDown && (
          <Stack
            sx={{
              width: { xs: 46, lg: 56 },
              height: { xs: 46, lg: 56 },
              borderRadius: '50%',
              overflow: 'hidden',
              border: `2px solid black`,
              position: 'relative',
            }}
          >
            <Image
              src={data.userProfileImage || '/assets/images/profile-icon/login-default-36x36.svg'}
              alt="user profile Image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Stack>
        )}

        <Stack direction="column">
          <Stack direction="row">
            <Stack direction="row" gap="4px">
              <Stack
                position="relative"
                sx={{
                  width: {
                    xs: '20px',
                    md: '24px',
                  },
                  height: {
                    xs: '20px',
                    md: '24px',
                  },
                }}
              >
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
                ({data.review?.reviewer ?? 0})
              </Typo>
            </Stack>

            <Stack direction="row" gap="6px" sx={{ whiteSpace: 'nowrap' }}>
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
                {data.career ?? 0}년
              </Typo>
            </Stack>

            <Stack direction="row" gap="6px" sx={{ whiteSpace: 'nowrap' }}>
              <Typo
                className={isMdDown ? 'text_M_13' : 'text_M_16'}
                style={{ color: colorChips.black[300], paddingLeft: isMdDown ? '8px' : '16px' }}
              >
                {data.confirmation ?? 0}건
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
          <Stack direction={isMobile ? 'column' : 'row'} gap="20px" sx={{ pt: isMdDown ? '14px' : '16px' }}>
            <Stack
              direction="row"
              gap="6px"
              alignItems="center"
              sx={{
                borderRight: isMobile ? '' : `1px solid ${colorChips.line['e6e6e6']}`,
                pr: isMobile ? '' : '16px',
              }}
            >
              <Typo
                className="text_M_14"
                style={{
                  backgroundColor: colorChips.background['f4f7fb'],
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textWrap: 'nowrap',
                  color: colorChips.grayScale[500],
                }}
              >
                제공 서비스
              </Typo>
              <Typo
                className="text_M_14"
                style={{
                  color: colorChips.black[300],
                }}
              >
                {(data.service ?? []).join(', ')}
              </Typo>
            </Stack>
            <Stack direction="row" gap="6px" alignItems="center">
              <Typo
                className="text_M_14"
                style={{
                  backgroundColor: colorChips.background['f4f7fb'],
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textWrap: 'nowrap',
                  color: colorChips.grayScale[500],
                }}
              >
                지역
              </Typo>
              <Typo className="text_M_14" style={{ color: colorChips.black[300] }}>
                {(data.region ?? []).join(', ')}
              </Typo>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
