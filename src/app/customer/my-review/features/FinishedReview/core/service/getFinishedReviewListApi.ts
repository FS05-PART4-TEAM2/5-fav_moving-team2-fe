import customAxios from '@/lib/customAxios';
import { CustomerFinishedReviewListResponseData } from '@/shared/types/types';

interface FinishedReviewListResponse {
  success: boolean;
  message: string;
  data: CustomerFinishedReviewListResponseData;
}

type FinishedReviewListPayload = {
  page: number;
  limit: number;
};

export async function getFinishedReviewListApi(customerId: string, payload: FinishedReviewListPayload) {
  const res = await customAxios.get<FinishedReviewListResponse>(`/api/review/customer/${customerId}`, {
    params: payload,
    fetchOptions: {
      // cache: 'force-cache',
      next: {
        tags: ['finished-review-list'],
      },
    },
  });
  return res.data;
}
