import customAxios from '@/lib/customAxios';
import {
  GetMoverQuotationsParams,
  GetMoverQuotationsResponse,
  InfiniteQuotationPage,
  MoverQuotationStats,
  RejectQuotationPayload,
  SendQuotationPayload,
} from '@/shared/types/types';

export async function getMoverQuotations(
  params: GetMoverQuotationsParams & {
    cursorId?: string;
    cursorDate?: string;
    take?: number;
  },
): Promise<InfiniteQuotationPage> {
  const queryParams = new URLSearchParams();

  if (params.type) queryParams.append('type', params.type.join(','));
  if (params.region) queryParams.append('region', params.region.join(','));
  if (params.isAssigned !== undefined) queryParams.append('isAssigned', String(params.isAssigned));
  if (params.username) queryParams.append('username', params.username);
  if (params.sorted) queryParams.append('sorted', params.sorted);
  if (params.cursorId) queryParams.append('cursorId', params.cursorId);
  if (params.cursorDate) queryParams.append('cursorDate', params.cursorDate);
  if (params.take) queryParams.append('take', String(params.take));

  const url = `/api/quotation/mover?${queryParams.toString()}`;
  const res = await customAxios.get<GetMoverQuotationsResponse>(url);

  return {
    data: res.data.data.data,
    nextCursor: res.data.data.nextCursor,
  };
}

export async function getMoverQuotationStats(
  params: Omit<GetMoverQuotationsParams, 'cursorId' | 'cursorDate' | 'take'>,
): Promise<MoverQuotationStats> {
  const queryParams = new URLSearchParams();

  if (params.type) queryParams.append('type', params.type.join(','));
  if (params.region) queryParams.append('region', params.region.join(','));
  if (params.isAssigned !== undefined) queryParams.append('isAssigned', String(params.isAssigned));
  if (params.username) queryParams.append('username', params.username);
  if (params.sorted) queryParams.append('sorted', params.sorted);

  const url = `/api/quotation/mover/count?${queryParams.toString()}`;
  const res = await customAxios.get<{ data: MoverQuotationStats }>(url);
  return res.data.data;
}

export const sendQuotationAPI = async (payload: SendQuotationPayload) => {
  const response = await customAxios.post('/api/quotation/mover', payload);
  return response.data;
};

export const rejectQuotationAPI = async (payload: RejectQuotationPayload) => {
  const response = await customAxios.put('/api/assignMover', payload);
  return response.data;
};
