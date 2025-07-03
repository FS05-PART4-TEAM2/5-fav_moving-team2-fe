import customAxios from '@/lib/customAxios';
import { MoverDetailReviewResponse } from '@/shared/types/types';

export async function getReviewList(id: string, page: number, limit: number): Promise<MoverDetailReviewResponse> {
  const res = await customAxios.get<{ success: boolean; data: MoverDetailReviewResponse }>(`/api/review/${id}`, {
    params: { page, limit },
  });
  return res.data.data;
}

export async function getMoverDetail(id: string) {
  const res = await customAxios.get(`/api/mover/${id}`);
  return res.data.data;
}
