import customAxios from '@/lib/customAxios';
import { SearchMoverListPayload, SearchMoverListResponse } from '@/shared/types/types';

interface MoverListResponse {
  success: boolean;
  message: string;
  data: SearchMoverListResponse;
}

export async function getMoverListApi(params: SearchMoverListPayload) {
  const res = await customAxios.get<MoverListResponse>('/api/mover/list', {
    params,
  });
  return res.data;
}
