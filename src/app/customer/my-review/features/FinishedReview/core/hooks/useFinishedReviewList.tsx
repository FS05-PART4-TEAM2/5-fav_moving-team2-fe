import { useState, useEffect, useCallback } from 'react';
import { getFinishedReviewListApi } from '../service/getFinishedReviewListApi';
import useUserStore from '@/shared/store/useUserStore';
import { CustomerFinishedReviewListResponseData } from '@/shared/types/types';
import { withMinLoadingTime } from '@/shared/utils/loadingUtils';
import { useTheme, useMediaQuery } from '@mui/material';

export const useFinishedReviewList = () => {
  const [data, setData] = useState<CustomerFinishedReviewListResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 1200px 이상
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // 743px 이하
  const { userType, userInfo } = useUserStore();

  const customerId = userInfo?.id ?? '';

  // 화면 크기에 따른 동적 limit 설정
  const getLimit = useCallback(() => {
    if (isDesktop) return 6;
    if (isTablet) return 4;
    return 6; // 기본값
  }, [isDesktop, isTablet]);

  const fetchData = useCallback(
    async (currentPage: number = page) => {
      setIsLoading(true);

      try {
        const limit = getLimit();
        const response = await withMinLoadingTime(getFinishedReviewListApi(customerId, { page: currentPage, limit }));

        if (response.success) {
          setData(response.data);
        }
      } catch {
        alert('다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    },
    [page, getLimit, customerId],
  );

  // 페이지 변경 핸들러
  const handleChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      fetchData(value);
    },
    [fetchData],
  );

  useEffect(() => {
    if (hasLoaded) {
      return;
    }

    setHasLoaded(true);
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 화면 크기가 변경되면 데이터를 다시 가져옴
  useEffect(() => {
    if (hasLoaded) {
      setPage(1); // 페이지를 1로 리셋
      fetchData(1);
    }
  }, [isDesktop, isTablet, hasLoaded, fetchData]);

  // userType이 customer가 아닌 경우 early return
  if (userType !== 'customer') {
    return { data: null, isLoading: false, handleChangePage: () => {} };
  }

  return { data, isLoading, handleChangePage };
};
