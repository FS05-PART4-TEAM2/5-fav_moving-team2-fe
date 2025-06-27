import { QueryClient } from '@tanstack/react-query';
import { customerQuoteHistoryKeys, moverKeys, notificationKeys, reviewKeys } from './queryKeys';

// 이후 쿼리키 추가되면 여기에도 같이 추가
export const invalidateQueryKeys = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: moverKeys.all });
  queryClient.invalidateQueries({ queryKey: notificationKeys.all }); 
  queryClient.invalidateQueries({ queryKey: customerQuoteHistoryKeys.all});
  queryClient.invalidateQueries({ queryKey: reviewKeys.all });
};

export const removeQueryKeys = (queryClient: QueryClient) => {
  queryClient.removeQueries({ queryKey: moverKeys.all });
  queryClient.removeQueries({ queryKey: notificationKeys.all });
  queryClient.removeQueries({ queryKey: customerQuoteHistoryKeys.all });
  queryClient.removeQueries({ queryKey: reviewKeys.all });
};
