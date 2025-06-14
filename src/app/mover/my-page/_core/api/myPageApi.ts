import customAxios from '@/lib/customAxios';
import { MoverDetailReviewResponse } from '@/shared/types/types';

export async function getReviewList(id: string, page: number): Promise<MoverDetailReviewResponse> {
  const res = await customAxios.get<{ success: boolean; data: MoverDetailReviewResponse }>(`/api/review/${id}`, {
    params: { page },
  });
  return res.data.data;
}
