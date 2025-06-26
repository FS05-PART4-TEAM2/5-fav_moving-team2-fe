import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotificationsApi } from '@/shared/service/getNotificationsApi';
import { notificationKeys } from '../utils/queryKeys';
import useUserStore from '@/shared/store/useUserStore';

interface PageParam {
  cursorId: string | null;
  cursorDate: string | null;
}

export function useNotificationsQuery() {
  const { isAuthenticated, userType } = useUserStore();
  const enabled = isAuthenticated && userType !== 'temp';

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: notificationKeys.list(),
    queryFn: ({ pageParam }) => 
      getNotificationsApi({ cursorId: pageParam.cursorId, cursorDate: pageParam.cursorDate, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const notifications = lastPage.data.data;
      if (notifications.length === 0) return undefined;
      
      const lastNotification = notifications[notifications.length - 1];
      return {
        cursorId: lastNotification.id,
        cursorDate: lastNotification.createdAt,
      };
    },
    initialPageParam: { cursorId: null, cursorDate: null } as PageParam,
    enabled,
  });

  return {
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
}
