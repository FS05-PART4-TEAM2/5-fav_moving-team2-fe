'use client';

import { createContext, useContext, useState } from 'react';

export type TabBarType =
  | 'pendingQuote'
  | 'receivedQuote'
  | 'writeReview'
  | 'finishedReview'
  | 'quoteOffer'
  | 'rejectedQuote';

export const tabBarLabel = {
  pendingQuote: '대기 중인 견적',
  receivedQuote: '받았던 견적',
  writeReview: '작성 가능한 리뷰',
  finishedReview: '내가 작성한 리뷰',
  quoteOffer: '보낸 견적 조회',
  rejectedQuote: '반려 요청',
};

const TabBarTypeContext = createContext<{
  tabBarType: TabBarType;
  setTabBarType: (v: TabBarType) => void;
}>({
  tabBarType: 'pendingQuote',
  setTabBarType: () => {},
});

export const TabBarProvider = ({
  children,
  initialTabType = 'pendingQuote',
}: {
  children: React.ReactNode;
  initialTabType?: TabBarType;
}) => {
  const [tabBarType, setTabBarType] = useState<TabBarType>(initialTabType);
  return <TabBarTypeContext.Provider value={{ tabBarType, setTabBarType }}>{children}</TabBarTypeContext.Provider>;
};

export const useTabBarType = () => {
  return useContext(TabBarTypeContext);
};
