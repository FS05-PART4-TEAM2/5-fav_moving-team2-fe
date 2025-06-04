import { useState, useEffect } from 'react';
import { getMoverDetailApi } from '../service/getMoverDetailApi';
import { useRouter } from 'next/navigation';
import { SearchMoverDetailResponse } from '@/shared/types/types';
import { withMinLoadingTime } from '@/shared/utils/loadingUtils';

export const useMoverDetailData = (moverId: string) => {
  const router = useRouter();
  const [data, setData] = useState<SearchMoverDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // offerId가 없거나 이미 로딩했으면 중단
    if (!moverId || hasLoaded) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setHasLoaded(true);

      try {
        const response = await withMinLoadingTime(getMoverDetailApi(moverId));

        if (response.success) {
          setData(response.data);
        } else {
          router.back();
        }
      } catch (err) {
        router.back();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [moverId]);

  return { data, isLoading };
};
