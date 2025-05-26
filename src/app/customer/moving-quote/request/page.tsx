'use client';

import { useState, useRef, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Header } from '@/shared/components/Header/Header';
import ProgressBar from '@/shared/components/ProgressBar/ProgressBar';
import { OngoingQuoteViewFeature } from './features/OngoingQuoteVIew/Feature';
import { QuoteRequestFormFeature } from './features/QuoteRequestForm/Feature';
import { useRequestStepStore } from './core/hooks/useRequestStepStore';
import useUserStore from '@/shared/store/useUserStore';

export default function Page() {
  const { customerData } = useUserStore();
  const { requestStep } = useRequestStepStore();
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const hasQuotation = customerData?.hasQuotation ?? false;

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
  }, [hasQuotation]);

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
            {!hasQuotation && (
              <Box width="100%">
                <ProgressBar type="request" step={requestStep} />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack sx={{ ...mainContainerSx, marginTop: `${headerHeight}px` }}>
        <Stack sx={contentContainerSx}>
          {hasQuotation ? (
            // 현재 진행중 견적 있는 경우
            <OngoingQuoteViewFeature />
          ) : (
            // 현재 진행중 견적 없는 경우 - 견적요청 프로그레스 표시
            <QuoteRequestFormFeature />
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
  maxWidth: '1400px',
  margin: '0 auto',
  overflowY: 'scroll',
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: { xs: '20px', md: '40px' },
  paddingBottom: { xs: '40px', md: '60px' },
};
