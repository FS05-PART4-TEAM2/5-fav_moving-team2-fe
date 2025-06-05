import { useState, useEffect } from 'react';
import { getMoverReviewListApi } from '../service/getMoverReviewListApi';
import { useRouter } from 'next/navigation';
import { MoverDetailReviewResponse } from '@/shared/types/types';
import { withMinLoadingTime } from '@/shared/utils/loadingUtils';

export const useMoverReviewList = (moverId: string) => {
  const router = useRouter();
  const [data, setData] = useState<MoverDetailReviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const LIMIT = 5; // 페이지당 리뷰 개수 기본값 5
  //TODO: 모바일 3, 태블릿 4, 데탑 5

  useEffect(() => {
    // offerId가 없거나 이미 로딩했으면 중단
    if (!moverId || hasLoaded) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setHasLoaded(true);

      try {
        const response = await withMinLoadingTime(getMoverReviewListApi(moverId, { page, limit: LIMIT }));

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
