'use client';

import { Stack } from '@mui/material';
import { Header } from '../Header/Header';
import { colorChips } from '@/shared/styles/colorChips';
import { TabBar } from '../Tab/TabBar';
import { TabBarProvider, useTabBarType, tabBarLabel, TabBarType } from '@/shared/context/TabBarProvider';
import { usePathname } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { Typo } from '@/shared/styles/Typo/Typo';

// 탭바 있는 페이지에서 사용
export const TabBarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // 페이지별 초기 탭 타입 설정
  const getInitialTabType = () => {
    if (pathname === PATH.customer.movingQuoteHistory) return 'pendingQuote';
    if (pathname === PATH.customer.myReview) return 'writeReview';
    if (pathname === PATH.mover.movingQuoteHistory) return 'quoteOffer';
    return 'pendingQuote';
  };

  return (
    <TabBarProvider initialTabType={getInitialTabType()}>
      <TabBarContent>{children}</TabBarContent>
    </TabBarProvider>
  );
};

export const TabBarContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { tabBarType, setTabBarType } = useTabBarType();

  // 일반유저 [내 견적 관리] 페이지
  const isCustomerMovingQuote = pathname === PATH.customer.movingQuoteHistory;
  // 일반유저 [이사 리뷰] 페이지
  const isCustomerReview = pathname === PATH.customer.myReview;
  // 기사님 [내 견적 관리] 페이지
  const isMoverMovingQuote = pathname === PATH.mover.movingQuoteHistory;

  // 일반유저 [찜한 기사님] 페이지
  const isCustomerPickMover = pathname === PATH.customer.pickMover;
  // [내 견적 관리] 상세 페이지 - 타이틀은 [견적 상세]로 동일
  const isDetailPage = pathname.split('/').length > 4;

  const headerTitle = isCustomerPickMover ? '찜한 기사님' : '견적 상세';

  const showTabBar = isCustomerMovingQuote || isCustomerReview || isMoverMovingQuote;
  const showTitle = isCustomerPickMover || isDetailPage;
  const bgColor = isDetailPage ? colorChips.grayScale[50] : colorChips.background.fafafa;

  const getTabBarConfig = () => {
    if (isCustomerMovingQuote) {
      return {
        firstVal: 'pendingQuote',
        firstLabel: tabBarLabel.pendingQuote,
        secondVal: 'receivedQuote',
        secondLabel: tabBarLabel.receivedQuote,
      };
    }
    if (isCustomerReview) {
      return {
        firstVal: 'writeReview',
        firstLabel: tabBarLabel.writeReview,
        secondVal: 'finishedReview',
        secondLabel: tabBarLabel.finishedReview,
      };
    }
    if (isMoverMovingQuote) {
      return {
        firstVal: 'quoteOffer',
        firstLabel: tabBarLabel.quoteOffer,
        secondVal: 'rejectedQuote',
        secondLabel: tabBarLabel.rejectedQuote,
      };
    }
    return null;
  };

  const tabBarConfig = getTabBarConfig();

  return (
    <Stack sx={{ minHeight: '100vh', width: '100%' }}>
      <Stack sx={headerContainerSx}>
        <Header />
        {showTabBar && tabBarConfig && (
          <Stack sx={tabBarContainerSx}>
            <TabBar
              currentVal={tabBarType}
              firstVal={tabBarConfig.firstVal}
              firstLabel={tabBarConfig.firstLabel}
              secondVal={tabBarConfig.secondVal}
              secondLabel={tabBarConfig.secondLabel}
              handleChange={(val) => setTabBarType(val as TabBarType)}
            />
          </Stack>
        )}
        {showTitle && (
          <Stack sx={tabBarContainerSx}>
            <Stack direction="row" alignItems="center" height="54px">
              <Typo content={headerTitle} className="header_title" color={colorChips.black[400]} />
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack sx={{ ...mainContainerSx, backgroundColor: bgColor }}>
        <Stack sx={contentContainerSx}>{children}</Stack>
      </Stack>
    </Stack>
  );
};

const headerContainerSx = {
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  zIndex: 99999,
  width: '100%',
  height: 'fit-content',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colorChips.grayScale[50],
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
};

const tabBarContainerSx = {
  width: '100%',
  maxWidth: '1448px',
  margin: '0 auto',
  padding: '0 24px',
};

const mainContainerSx = {
  flex: 1,
  width: '100%',
  marginTop: { xs: '108px', md: '142px' },
  overflowY: 'hidden',
};

const contentContainerSx = {
  flex: 1,
  height: '100%',
  width: '100%',
  maxWidth: '1448px',
  margin: '0 auto',
  // padding: '0 24px',
  overflowY: 'scroll',
};
