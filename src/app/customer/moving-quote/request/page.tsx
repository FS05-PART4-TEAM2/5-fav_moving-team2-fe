'use client';

import { Header } from '@/shared/components/Header/Header';
import { useRouter } from 'next/navigation';
import { Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import ProgressBar from '@/shared/components/ProgressBar/ProgressBar';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [requestStep, setRequestStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <Stack sx={{ minHeight: '100vh', width: '100%' }}>
      <Stack sx={headerContainerSx}>
        <Stack direction="column" width="100%" alignItems="center">
          {/* 헤더, 프로그레스바 */}
          <Header />
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            width="100%"
            maxWidth="1448px"
            height={{ xs: '96px', md: '128px' }}
            px="24px"
            gap={{ xs: '16px', md: '24px' }}
          >
            <Typo content="견적요청" className="header_title" color={colorChips.black.b2b2b} />
            <Box width="100%">
              <ProgressBar type="request" step={requestStep} />
            </Box>
          </Stack>
        </Stack>
      </Stack>

      <Stack sx={mainContainerSx}>
        <Stack sx={contentContainerSx}>
          {/* 견적요청 컨텐츠 영역 */}
          <Typo
            content={'견적요청'}
            className="landing_title"
            color={colorChips.black[500]}
            customStyle={{ textAlign: 'center', whiteSpace: 'pre-line' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

const headerContainerSx = {
  flexDirection: 'row',
  position: 'fixed',
  top: 0,
  zIndex: 99999,
  width: '100%',
  height: 'fit-content',
  justifyContent: 'center',
  backgroundColor: colorChips.grayScale[50],
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
};

const mainContainerSx = {
  flex: 1,
  width: '100%',
  marginTop: { xs: '151px', md: '217px' },
  overflowY: 'hidden',
  paddingX: '24px',
  backgroundColor: colorChips.background.f7f7f7,
};

const contentContainerSx = {
  height: '100%',
  width: '100%',
  maxWidth: { xs: '327px', md: '1448px' },
  margin: '0 auto',
  overflowY: 'scroll',
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '40px',
  paddingBottom: '60px',
};
