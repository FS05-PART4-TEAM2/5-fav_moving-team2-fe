import { useTheme, useMediaQuery } from '@mui/material';
import { getFinishedReviewListApi } from '../service/getFinishedReviewListApi';
import useUserStore from '@/shared/store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { reviewKeys } from '@/shared/utils/queryKeys';

export const useFinishedReviewList = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 1200px 이상
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // 743px 이하
  const { userType, userInfo } = useUserStore();
  const [page, setPage] = useState(1);

  const customerId = userInfo?.id ?? '';

  // 화면 크기에 따른 동적 limit 설정
  const getLimit = useCallback(() => {
    if (isDesktop) return 6;
    if (isTablet) return 4;
    return 6; // 기본값
  }, [isDesktop, isTablet]);

  const limit = getLimit();

  const { data, isLoading, refetch } = useQuery({
    queryKey: reviewKeys.finishedList({ page, limit }),
    queryFn: async () => {
      const response = await getFinishedReviewListApi(customerId, { page, limit });
      if (!response.success) {
        throw new Error('Failed to fetch finished review list');
      }
      return response.data;
    },
    enabled: userType === 'customer' && !!customerId,
  });

  // 페이지 변경 핸들러
  const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  // userType이 customer가 아닌 경우 early return
  if (userType !== 'customer') {
    return { data: null, isLoading: false, handleChangePage: () => {} };
  }

  return { 
    data: data ?? null, 
    isLoading, 
    handleChangePage,
    refetch,
  };
};
