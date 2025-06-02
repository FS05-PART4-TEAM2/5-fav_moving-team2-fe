import { useState, useEffect } from 'react';
import { getReceivedOfferDetailApi } from '../service/getReceivedOfferDetailApi';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { CustomerQuoteHistoryData } from '@/shared/types/types';
import { withMinLoadingTime } from '@/shared/utils/loadingUtils';

export const useOfferDetailData = (offerId: string) => {
  const router = useRouter();
  const [data, setData] = useState<CustomerQuoteHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // offerId가 없거나 이미 로딩했으면 중단
    if (!offerId || hasLoaded) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setHasLoaded(true);

      try {
        const response = await withMinLoadingTime(getReceivedOfferDetailApi(offerId));

        if (response.success) {
          setData(response.data);
        } else {
          alert('견적 상세 조회에 실패했습니다. 다시 시도해주세요.');
          router.push(PATH.customer.movingQuoteHistory);
        }
      } catch (err) {
        alert('견적 상세 조회에 실패했습니다. 다시 시도해주세요.');
        router.push(PATH.customer.movingQuoteHistory);
      } finally {
        setIsLoading(false);
        console.log('로딩 완료');
      }
    };

    fetchData();
  }, [offerId]); // offerId만 의존성으로 설정

  return { data, isLoading };
};
