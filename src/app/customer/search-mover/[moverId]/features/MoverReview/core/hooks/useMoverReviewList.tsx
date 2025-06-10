import { useState, useEffect } from 'react';
import { getMoverReviewListApi } from '../service/getMoverReviewListApi';
import { useRouter } from 'next/navigation';
import { MoverDetailReviewResponse } from '@/shared/types/types';
import { withMinLoadingTime } from '@/shared/utils/loadingUtils';
import { useTheme, useMediaQuery } from '@mui/material';

export const useMoverReviewList = (moverId: string) => {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 1200px 이상
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 744px - 1199px
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 743px 이하

  const [data, setData] = useState<MoverDetailReviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(1);

  // 화면 크기에 따른 동적 limit 설정
  const getLimit = () => {
    if (isDesktop) return 5;
    if (isTablet) return 4;
    if (isMobile) return 3;
    return 5; // 기본값
  };

  const fetchData = async (currentPage: number = page) => {
    if (!moverId) return;

    setIsLoading(true);

    try {
      const limit = getLimit();
      const response = await withMinLoadingTime(getMoverReviewListApi(moverId, { page: currentPage, limit }));

      if (response.success) {
        setData(response.data);
      } else {
        router.back();
      }
    } catch (err) {
      router.back();
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
    // moverId가 없거나 이미 로딩했으면 중단
    if (!moverId || hasLoaded) {
      return;
    }

    setHasLoaded(true);
    fetchData(1);
  }, [moverId]);

  // 화면 크기가 변경되면 데이터를 다시 가져옴
  useEffect(() => {
    if (hasLoaded && moverId) {
      setPage(1); // 페이지를 1로 리셋
      fetchData(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  return { data, isLoading, handleChangePage };
};
