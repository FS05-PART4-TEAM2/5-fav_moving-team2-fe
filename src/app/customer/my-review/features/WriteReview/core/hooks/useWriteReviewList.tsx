import { useTheme, useMediaQuery } from '@mui/material';
import { getWriteReviewListApi } from '../service/getWriteReviewListApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { reviewKeys } from '@/shared/utils/queryKeys';

export const useWriteReviewList = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 1200px 이상
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // 743px 이하
  const [page, setPage] = useState(1);

  // 화면 크기에 따른 동적 limit 설정
  const getLimit = () => {
    if (isDesktop) return 6;
    if (isTablet) return 4;
    return 6; // 기본값
  };

  const limit = getLimit();

  const { data, isLoading, refetch } = useQuery({
    queryKey: reviewKeys.writeList({ page, limit }),
    queryFn: async () => {
      const response = await getWriteReviewListApi({ page, limit });
      if (!response.success) {
        throw new Error('Failed to fetch write review list');
      }
      return response.data;
    },
  });

  // 페이지 변경 핸들러
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return { 
    data: data ?? null, 
    isLoading, 
    handleChangePage,
    refetch,
  };
};
