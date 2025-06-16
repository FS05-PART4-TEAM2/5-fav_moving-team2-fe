import { QueryClient } from '@tanstack/react-query';
import { moverKeys, notificationKeys } from './queryKeys';

// 이후 쿼리키 추가되면 여기에도 같이 추가
export const invalidateQueryKeys = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: moverKeys.all });
  queryClient.invalidateQueries({ queryKey: notificationKeys.list() }); 
};
