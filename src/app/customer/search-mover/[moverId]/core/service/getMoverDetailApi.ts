import customAxios from '@/lib/customAxios';
import { SearchMoverDetailResponse } from '@/shared/types/types';

interface MoverDetailResponse {
  success: boolean;
  message: string;
  data: SearchMoverDetailResponse;
}

export async function getMoverDetailApi(moverId: string) {
  const res = await customAxios.get<MoverDetailResponse>(`/api/mover/${moverId}`, {
    fetchOptions: {
      cache: 'force-cache',
      next: {
        tags: ['mover-detail'],
      },
    },
  });
  return res.data;
}
