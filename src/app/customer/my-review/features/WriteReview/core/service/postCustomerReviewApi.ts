import customAxios from '@/lib/customAxios';
import { WriteReviewPayload, WriteReviewResponseData } from '@/shared/types/types';

interface WriteReviewResponse {
  success: boolean;
  message: string;
  data: WriteReviewResponseData;
}

export async function postCustomerReviewApi(offerId: string, payload: WriteReviewPayload) {
  const res = await customAxios.post<WriteReviewResponse>(`/api/review/customer/offer/${offerId}`, payload);
  return res.data;
}
