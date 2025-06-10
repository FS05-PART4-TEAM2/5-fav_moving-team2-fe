import { QueryClient } from '@tanstack/react-query';
import { moverKeys } from './queryKeys';
import { useSearchMoverStore } from '@/app/customer/search-mover/core/hooks/useSearchMoverStore';

// 이후 쿼리키 추가되면 여기에도 같이 추가
export const invalidateQueryKeys = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: moverKeys.all });
};
