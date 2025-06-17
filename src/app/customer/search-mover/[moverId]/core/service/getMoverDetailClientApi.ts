import customAxios from '@/lib/customAxios';
import { SearchMoverDetailResponse } from '@/shared/types/types';

interface MoverDetailResponse {
  success: boolean;
  message: string;
  data: SearchMoverDetailResponse;
}

export async function getMoverDetailClientApi(moverId: string) {
  const res = await customAxios.get<MoverDetailResponse>(`/api/mover/${moverId}`);

  return res.data;
}
