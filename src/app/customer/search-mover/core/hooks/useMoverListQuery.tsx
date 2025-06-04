import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useSearchMoverStore } from './useSearchMoverStore';
import { moverKeys } from '@/shared/utils/queryKeys';
import { getMoverListApi } from '../service/getMoverListApi';

export const useMoverList = () => {
  const { params } = useSearchMoverStore();
  const { region, service, order, keyword, idNumCursor, orderCursor, limit } = params;

  const LIMIT = 10;
  const MIN_LOADING_TIME = 500;

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: moverKeys.list({ region, service, order, keyword, idNumCursor, orderCursor, limit }),
    queryFn: async ({ pageParam }: { pageParam: number | null }) => {
      const startTime = Date.now();
      const response = await getMoverListApi({ region, service, order, keyword, idNumCursor, orderCursor, limit });

      // 최소 로딩 시간 보장
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
      }

      return response;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.data.orderNextCursor || null,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const movers = useMemo(() => {
    const allMovers = data?.pages.flatMap((page) => page.data.list) ?? [];
    // 중복 제거
    return Array.from(new Map(allMovers.map((mover) => [mover.id, mover])).values());
  }, [data]);

  // params가 변경될 때만 수동으로 invalidate하는 함수
  const invalidateMoverList = useCallback(() => {
    const currentQueryKey = moverKeys.list({ region, service, order, keyword, idNumCursor, orderCursor, limit });
    queryClient.invalidateQueries({ queryKey: currentQueryKey });
  }, [queryClient, region, service, order, keyword, idNumCursor, orderCursor, limit]);

  useEffect(() => {
    invalidateMoverList();
  }, [params]);

  return {
    movers,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    invalidateMoverList,
  };
};
