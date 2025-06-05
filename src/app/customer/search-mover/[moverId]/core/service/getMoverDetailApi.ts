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
      // 기본 캐시 설정 사용 (revalidateTag와 호환)
      next: {
        tags: ['mover-detail'],
      },
    },
  });
  return res.data;
}
