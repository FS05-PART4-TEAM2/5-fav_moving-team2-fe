import { useQuery } from '@tanstack/react-query';
import { getMoverDetailClientApi } from '../service/getMoverDetailClientApi';
import { moverKeys } from '@/shared/utils/queryKeys';

export const useMoverDetailData = (moverId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: moverKeys.detail(moverId),
    queryFn: () => getMoverDetailClientApi(moverId),
    enabled: !!moverId, // moverId가 있을 때만 쿼리 실행
    select: (response) => (response.success ? response.data : null),
    staleTime: 1000 * 60 * 60 * 24, // 별도 refetch 없으면 24시간 동안 fresh
    retry: 1,
  });

  return { data, isLoading, refetch };
};
