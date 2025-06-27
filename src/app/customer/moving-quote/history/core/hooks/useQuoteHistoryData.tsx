import { useQuery } from '@tanstack/react-query';
import { getPendingQuotesApi } from '../service/getPendingQuotesApi';
import { getReceivedQuotesApi } from '../service/getReceivedQuotesApi';
import { customerQuoteHistoryKeys } from '@/shared/utils/queryKeys';

export const useQuoteHistoryData = () => {
  const { 
    data: pendingQuotes, 
    isLoading: isPendingLoading,
    refetch: refetchPending 
  } = useQuery({
    queryKey: customerQuoteHistoryKeys.pendingList(),
    queryFn: async () => {
      const response = await getPendingQuotesApi();
      if (!response.success) {
        throw new Error('Failed to fetch pending quotes');
      }
      return response.data;
    },
  });

  const { 
    data: receivedQuotes, 
    isLoading: isReceivedLoading,
    refetch: refetchReceived 
  } = useQuery({
    queryKey: customerQuoteHistoryKeys.receivedList(),
    queryFn: async () => {
      const response = await getReceivedQuotesApi();
      if (!response.success) {
        throw new Error('Failed to fetch received quotes');
      }
      return response.data;
    },
  });

  // 견적 확정 후 전체 데이터 갱신
  const refreshAllQuotes = async () => {
    try {
      await Promise.all([
        refetchReceived(),
        refetchPending()
      ]);
    } catch (error) {
      alert('견적 데이터 갱신 중 오류가 발생했습니다.');
    }
  };

  return {
    dataCache: {
      pendingQuotes: pendingQuotes ?? null,
      receivedQuotes: receivedQuotes ?? null,
    },
    loadingStates: {
      pendingQuotes: isPendingLoading,
      receivedQuotes: isReceivedLoading,
    },
    refreshPendingQuotes: refetchPending,
    refreshReceivedQuotes: refetchReceived,
    refreshAllQuotes,
  };
};
