import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { moverKeys } from '@/shared/utils/queryKeys';
import { getLikeMoverListApi } from '../service/getLikeMoverListApi';

export const useLikeMoverList = (limit: number = 6) => {
  const MIN_LOADING_TIME = 500;

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: moverKeys.likeList(),
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const startTime = Date.now();

      const response = await getLikeMoverListApi({
        page: pageParam,
        limit,
      });

      // 최소 로딩 시간 보장
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
      }

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNextPage) {
        return undefined;
      }
      return lastPage.data.page + 1;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const likeMovers = useMemo(() => {
    const allMovers = data?.pages.flatMap((page) => page.data.list) ?? [];
    // 중복 제거 (id 기준)
    return Array.from(new Map(allMovers.map((mover) => [mover.id, mover])).values());
  }, [data]);

  // 찜한 기사님 목록을 무효화하고 새로고침하는 함수
  const invalidateLikeMoverList = useCallback(() => {
    const currentQueryKey = moverKeys.likeList();
    queryClient.invalidateQueries({ queryKey: currentQueryKey });
  }, [queryClient]);

  return {
    likeMovers,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    invalidateLikeMoverList,
  };
};
