import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useSearchMoverStore } from './useSearchMoverStore';
import { moverKeys } from '@/shared/utils/queryKeys';
import { getMoverListApi } from '../service/getMoverListApi';

export const useMoverList = () => {
  const { params, updateParams } = useSearchMoverStore();
  const { region, service, orderBy, keyword, limit } = params;
  const MIN_LOADING_TIME = 500;

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: moverKeys.list({ region, service, orderBy, keyword, limit }),
    queryFn: async ({
      pageParam,
    }: {
      pageParam: { orderCursor: number | null; idNumCursor: number | null } | null;
    }) => {
      const startTime = Date.now();

      const response = await getMoverListApi({
        region,
        service,
        orderBy,
        keyword,
        orderCursor: pageParam?.orderCursor,
        idNumCursor: pageParam?.idNumCursor,
        limit,
      });

      // 최소 로딩 시간 보장
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
      }

      return response;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) {
        return undefined;
      }

      return {
        orderCursor: lastPage.data.orderNextCursor,
        idNumCursor: lastPage.data.idNumNextCursor,
      };
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const movers = useMemo(() => {
    const allMovers = data?.pages.flatMap((page) => page.data.list) ?? [];
    // 중복 제거
    return Array.from(new Map(allMovers.map((mover) => [mover.id, mover])).values());
  }, [data]);

  // params가 변경될 때 쿼리를 무효화하고 커서를 초기화하는 함수
  const invalidateMoverList = useCallback(() => {
    const currentQueryKey = moverKeys.list({ region, service, orderBy, keyword, limit });
    queryClient.invalidateQueries({ queryKey: currentQueryKey });

    // 파라미터가 변경되면 store의 커서도 초기화
    updateParams('orderCursor', null);
    updateParams('idNumCursor', null);
  }, [queryClient, region, service, orderBy, keyword, limit, updateParams]);

  // 필터 관련 params가 변경될 때만 무효화 (커서 변경은 제외)
  useEffect(() => {
    invalidateMoverList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, service, orderBy, keyword]);

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
