import customAxios from '@/lib/customAxios';
import { SearchMoverListPayload, SearchMoverListResponse } from '@/shared/types/types';

interface MoverListResponse {
  success: boolean;
  message: string;
  data: SearchMoverListResponse;
}

export async function getMoverListApi(params: SearchMoverListPayload) {
  // null 값인 파라미터를 제외하고 API 파라미터 구성
  const apiParams: Record<string, any> = {};

  // region이 null이 아닌 경우에만 포함
  if (params.region !== null && params.region !== undefined) {
    apiParams.region = params.region;
  }

  // service가 null이 아닌 경우에만 포함
  if (params.service !== null && params.service !== undefined) {
    apiParams.service = params.service;
  }

  // keyword가 빈 문자열이 아닌 경우에만 포함
  if (params.keyword && params.keyword.trim() !== '') {
    apiParams.keyword = params.keyword.trim();
  }

  // 커서는 null이 아닌 경우에만 포함
  if (params.orderCursor !== null && params.orderCursor !== undefined) {
    apiParams.orderCursor = params.orderCursor;
  }

  if (params.idNumCursor !== null && params.idNumCursor !== undefined) {
    apiParams.idNumCursor = params.idNumCursor;
  }

  // limit, orderBy 항상 포함
  apiParams.limit = params.limit;
  apiParams.orderBy = params.orderBy;

  const res = await customAxios.get<MoverListResponse>('/api/mover', {
    params: apiParams,
  });
  return res.data;
}
