import customAxios from '@/lib/customAxios';
import { CustomerQuoteHistoryData } from '@/shared/types/types';

interface OfferDetailResponse {
  success: boolean;
  message: string;
  data: CustomerQuoteHistoryData;
}

export async function getReceivedOfferDetailApi(offerId: string) {
  const res = await customAxios.get<OfferDetailResponse>(`/api/receivedQuo/customer/detail/${offerId}`, {
    fetchOptions: {
      // 기본 캐시 설정 사용 (revalidateTag와 호환)
      next: {
        tags: ['received-offer-detail'],
      },
    },
  });
  return res.data;
}
