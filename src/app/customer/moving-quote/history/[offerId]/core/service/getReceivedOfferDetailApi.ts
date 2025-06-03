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
      cache: 'force-cache',
      next: {
        tags: ['received-offer-detail'],
      },
    },
  });
  return res.data;
}
