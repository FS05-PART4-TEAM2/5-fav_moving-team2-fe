import { useState, useEffect } from 'react';
import { getWriteReviewListApi } from '../service/getWriteReviewListApi';
import { CustomerWriteReviewListResponseData } from '@/shared/types/types';
import { withMinLoadingTime } from '@/shared/utils/loadingUtils';
import { useTheme, useMediaQuery } from '@mui/material';

export const useWriteReviewList = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 1200px 이상
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // 743px 이하

  const [data, setData] = useState<CustomerWriteReviewListResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(1);

  // 화면 크기에 따른 동적 limit 설정
  const getLimit = () => {
    if (isDesktop) return 6;
    if (isTablet) return 4;
    return 6; // 기본값
  };

  const fetchData = async (currentPage: number = page) => {
    setIsLoading(true);

    try {
      const limit = getLimit();
      const response = await withMinLoadingTime(getWriteReviewListApi({ page: currentPage, limit }));

      if (response.success) {
        setData(response.data);
      }
    } catch {
      alert('다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 핸들러
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchData(value);
  };

  useEffect(() => {
    if (hasLoaded) {
      return;
    }

    setHasLoaded(true);
    fetchData(1);
  }, []);

  // 화면 크기가 변경되면 데이터를 다시 가져옴
  useEffect(() => {
    if (hasLoaded) {
      setPage(1); // 페이지를 1로 리셋
      fetchData(1);
    }
  }, [isDesktop, isTablet]);

  return { data, isLoading, handleChangePage };
};
