import { useInfiniteQuery } from '@tanstack/react-query';
import { getMoverQuotations } from '../api/requestApi';
import { CursorInfo, GetMoverQuotationsParams, InfiniteQuotationPage } from '@/shared/types/types';

export const useMoverQuotations = (params: GetMoverQuotationsParams) =>
  useInfiniteQuery<
    InfiniteQuotationPage,
    Error,
    InfiniteQuotationPage,
    [string, GetMoverQuotationsParams],
    CursorInfo | undefined
  >({
    queryKey: ['moverQuotations', params],
    queryFn: ({ pageParam }) => getMoverQuotations({ ...params, ...pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });
