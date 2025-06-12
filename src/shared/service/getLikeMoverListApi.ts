import customAxios from '@/lib/customAxios';
import { LikeMoverListResponseData } from '@/shared/types/types';

interface LikeMoverListResponse {
  success: boolean;
  message: string;
  data: LikeMoverListResponseData;
}

interface LikeMoverListPayload {
  page: number;
  limit: number;
}

export async function getLikeMoverListApi(params: LikeMoverListPayload) {
  const res = await customAxios.get<LikeMoverListResponse>('/api/like/customer', {
    params,
  });
  return res.data;
}
