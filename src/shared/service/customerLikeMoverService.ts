import customAxios from '@/lib/customAxios';
import { GlobalResponse } from '../types/types';

/**
 * 기사 찜하기
 * @param moverId 기사 id
 * @returns 찜하기 성공 여부
 */
export const postLikeMoverApi = async (moverId: string) => {
  const response = await customAxios.post<GlobalResponse>(`/api/like/${moverId}/customer`);
  return response.data;
};

/**
 * 기사 찜 취소
 * @param moverId 기사 id
 * @returns 찜 취소 성공 여부
 */
export const deleteLikeMoverApi = async (moverId: string) => {
  const response = await customAxios.delete<GlobalResponse>(`/api/like/${moverId}/customer`);
  return response.data;
};
