import customAxios from '@/lib/customAxios';
import { CustomerRequestPayload, CustomerRequestResponse } from '@/shared/types/types';

export async function postCustomerRequest(payload: CustomerRequestPayload) {
  const res = await customAxios.post<CustomerRequestResponse>('/api/quotation/customer', payload);
  return res.data;
}
