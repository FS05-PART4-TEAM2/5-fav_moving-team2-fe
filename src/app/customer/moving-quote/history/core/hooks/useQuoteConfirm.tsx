import { postQuoteConfirmApi } from '../service/postQuoteConfirmApi';
import { useQuoteHistoryData } from './useQuoteHistoryData';
import { PATH } from '@/shared/constants';
import { useRouter } from 'next/navigation';

export const useQuoteConfirm = (offerId: string) => {
  const { refreshAllQuotes } = useQuoteHistoryData();
  const router = useRouter();

  const handleConfirm = async () => {
    const res = await postQuoteConfirmApi(offerId);
    if (res.success) {
      // 1. 견적 데이터 새로고침
      await refreshAllQuotes();
      // 2. 받았던 견적 탭으로 이동
      router.push(PATH.customer.movingQuoteHistory + '?tab=received');
    }
  };

  return { handleConfirm };
};
