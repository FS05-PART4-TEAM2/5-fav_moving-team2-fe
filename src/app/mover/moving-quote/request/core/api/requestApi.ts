import customAxios from '@/lib/customAxios';
import { GetMoverQuotationsParams, RejectQuotationPayload, SendQuotationPayload } from '@/shared/types/types';

export async function getMoverQuotations(params: GetMoverQuotationsParams & { cursor?: string }) {
  const queryParams = new URLSearchParams();

  if (params.type) queryParams.append('type', params.type.join(','));
  if (params.region) queryParams.append('region', params.region.join(','));
  if (params.isAssigned !== undefined) queryParams.append('isAssigned', String(params.isAssigned));
  if (params.username) queryParams.append('username', params.username);
  if (params.sorted) queryParams.append('sorted', params.sorted);
  if (params.cursor) queryParams.append('cursor', params.cursor);

  const url = `/api/quotation/mover?${queryParams.toString()}`;
  const res = await customAxios.get(url);
  return res.data;
}

export const sendQuotationAPI = async (payload: SendQuotationPayload) => {
  const response = await customAxios.post('/api/quotation/mover', payload);
  return response.data;
};

export const rejectQuotationAPI = async (payload: RejectQuotationPayload) => {
  const response = await customAxios.put('/api/assignMover', payload);
  return response.data;
};
