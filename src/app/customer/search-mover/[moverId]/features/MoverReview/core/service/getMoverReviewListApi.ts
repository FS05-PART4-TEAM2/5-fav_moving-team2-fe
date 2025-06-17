import customAxios from '@/lib/customAxios';
import { MoverDetailReviewResponse } from '@/shared/types/types';

interface MoverReviewListResponse {
  success: boolean;
  message: string;
  data: MoverDetailReviewResponse;
}

type MoverReviewPayload = {
  page: number;
  limit: number;
};

export async function getMoverReviewListApi(moverId: string, payload: MoverReviewPayload) {
  const res = await customAxios.get<MoverReviewListResponse>(`/api/review/${moverId}`, {
    params: payload,
    fetchOptions: {
      // cache: 'force-cache',
      next: {
        tags: ['mover-review-list'],
      },
    },
  });
  return res.data;
}
