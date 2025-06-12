import { useState, useRef } from 'react';
import { getPendingQuotesApi } from '../service/getPendingQuotesApi';
import { getReceivedQuotesApi } from '../service/getReceivedQuotesApi';
import { CustomerQuoteHistoryData } from '@/shared/types/types';
import { withMinLoadingTime } from '@/shared/utils/loadingUtils';

interface DataCache {
  pendingQuotes: CustomerQuoteHistoryData[] | null;
  receivedQuotes: CustomerQuoteHistoryData[] | null;
}

export const useQuoteHistoryData = () => {
  const [dataCache, setDataCache] = useState<DataCache>({
    pendingQuotes: null,
    receivedQuotes: null,
  });
  const [loadingStates, setLoadingStates] = useState({
    pendingQuotes: false,
    receivedQuotes: false,
  });

  // 이미 로딩을 시도했는지 추적
  const loadAttempted = useRef({
    pendingQuotes: false,
    receivedQuotes: false,
  });

  // 대기중 견적 데이터 로드
  const loadPendingQuotes = async () => {
    // 이미 데이터가 있거나 현재 로딩 중이면 재요청하지 않음
    if (dataCache.pendingQuotes || loadingStates.pendingQuotes) return;

    try {
      setLoadingStates((prev) => ({ ...prev, pendingQuotes: true }));

      // 이미 한 번 로딩을 시도했다면 최소 로딩 시간 없이 빠르게 로드
      const shouldShowMinLoading = !loadAttempted.current.pendingQuotes;
      loadAttempted.current.pendingQuotes = true;

      const response = shouldShowMinLoading
        ? await withMinLoadingTime(getPendingQuotesApi())
        : await getPendingQuotesApi();

      if (response.success) {
        setDataCache((prev) => ({ ...prev, pendingQuotes: response.data }));
      }
    } catch {
      alert('다시 시도해주세요.');
    } finally {
      setLoadingStates((prev) => ({ ...prev, pendingQuotes: false }));
    }
  };

  // 받았던 견적 데이터 로드
  const loadReceivedQuotes = async () => {
    // 이미 데이터가 있거나 현재 로딩 중이면 재요청하지 않음
    if (dataCache.receivedQuotes || loadingStates.receivedQuotes) return;

    try {
      setLoadingStates((prev) => ({ ...prev, receivedQuotes: true }));

      // 이미 한 번 로딩을 시도했다면 최소 로딩 시간 없이 빠르게 로드
      const shouldShowMinLoading = !loadAttempted.current.receivedQuotes;
      loadAttempted.current.receivedQuotes = true;

      const response = shouldShowMinLoading
        ? await withMinLoadingTime(getReceivedQuotesApi())
        : await getReceivedQuotesApi();

      if (response.success) {
        setDataCache((prev) => ({ ...prev, receivedQuotes: response.data }));
      }
    } catch {
      alert('다시 시도해주세요.');
    } finally {
      setLoadingStates((prev) => ({ ...prev, receivedQuotes: false }));
    }
  };

  // 강제 리패치 - 견적 확정 후 데이터 갱신용
  const refreshPendingQuotes = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, pendingQuotes: true }));
      const response = await getPendingQuotesApi();

      if (response.success) {
        setDataCache((prev) => ({ ...prev, pendingQuotes: response.data }));
      }
    } catch {
      console.error('대기중 견적 새로고침 실패:');
    } finally {
      setLoadingStates((prev) => ({ ...prev, pendingQuotes: false }));
    }
  };

  const refreshReceivedQuotes = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, receivedQuotes: true }));
      const response = await getReceivedQuotesApi();

      if (response.success) {
        setDataCache((prev) => ({ ...prev, receivedQuotes: response.data }));
      }
    } catch {
      console.error('받았던 견적 새로고침 실패:');
    } finally {
      setLoadingStates((prev) => ({ ...prev, receivedQuotes: false }));
    }
  };

  // 견적 확정 후 전체 데이터 갱신
  const refreshAllQuotes = async () => {
    await Promise.all([refreshPendingQuotes(), refreshReceivedQuotes()]);
  };

  return {
    dataCache,
    loadingStates,
    loadPendingQuotes,
    loadReceivedQuotes,
    refreshPendingQuotes,
    refreshReceivedQuotes,
    refreshAllQuotes,
  };
};
