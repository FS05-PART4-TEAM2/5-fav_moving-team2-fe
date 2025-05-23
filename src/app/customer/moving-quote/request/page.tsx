'use client';

import { Header } from '@/shared/components/Header/Header';
import { Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import ProgressBar from '@/shared/components/ProgressBar/ProgressBar';
import { useState, useRef, useEffect } from 'react';
import { OngoingQuoteView } from './components/OngoingQuoteView';

export default function Page() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [requestStep, setRequestStep] = useState<1 | 2 | 3 | 4>(1);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const hasOngoingQuote = true; // 진행중인 견적요청서 유무 TODO: API 연동 필요

  useEffect(() => {
    // hasOngoingQuote / 화면크기 변경 시 헤더 높이 재계산
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [hasOngoingQuote]);

  return (
    <Stack sx={{ minHeight: '100vh', width: '100%' }}>
      <Stack ref={headerRef} sx={headerContainerSx}>
        <Stack direction="column" width="100%" alignItems="center">
          {/* 헤더, 프로그레스바 */}
          <Header />
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            width="100%"
            maxWidth="1448px"
            height="fit-content"
            px="24px"
            py={{ xs: '24px', md: '32px' }}
            gap={{ xs: '16px', md: '24px' }}
          >
            <Typo content="견적요청" className="header_title" color={colorChips.black.b2b2b} />
            {!hasOngoingQuote && (
              <Box width="100%">
                <ProgressBar type="request" step={requestStep} />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack sx={{ ...mainContainerSx, marginTop: `${headerHeight}px` }}>
        <Stack sx={contentContainerSx}>
          {hasOngoingQuote ? (
            // 현재 진행중 견적 있는 경우
            <OngoingQuoteView />
          ) : (
            // 현재 진행중 견적 없는 경우 - 견적요청 프로그레스 표시
            <Typo
              content={'견적요청'}
              className="landing_title"
              color={colorChips.black[500]}
              customStyle={{ textAlign: 'center', whiteSpace: 'pre-line' }}
            />
          )}
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
  overflowY: 'hidden',
  paddingX: '24px',
  backgroundColor: colorChips.background.f7f7f7,
};

const contentContainerSx = {
  flex: 1,
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
