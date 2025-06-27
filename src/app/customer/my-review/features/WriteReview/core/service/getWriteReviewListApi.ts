import customAxios from '@/lib/customAxios';
import { CustomerWriteReviewListResponseData } from '@/shared/types/types';

interface WriteReviewListResponse {
  success: boolean;
  message: string;
  data: CustomerWriteReviewListResponseData;
}

type WriteReviewListPayload = {
  page: number;
  limit: number;
};

export async function getWriteReviewListApi(payload: WriteReviewListPayload) {
  const res = await customAxios.get<WriteReviewListResponse>('/api/review/customer/offer', { params: payload });
  return res.data;
}
