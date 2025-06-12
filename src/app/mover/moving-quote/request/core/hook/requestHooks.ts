import { useInfiniteQuery } from '@tanstack/react-query';
import { getMoverQuotations } from '../api/requestApi';
import { GetMoverQuotationsParams } from '@/shared/types/types';

export const useMoverQuotations = (params: GetMoverQuotationsParams) => {
  return useInfiniteQuery({
    queryKey: ['moverQuotations', params],
    queryFn: ({ pageParam = undefined }) => getMoverQuotations({ ...params, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 3,
  });
};
