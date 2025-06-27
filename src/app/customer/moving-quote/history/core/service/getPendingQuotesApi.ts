import customAxios from '@/lib/customAxios';
import { CustomerQuoteHistoryData } from '@/shared/types/types';

interface PendingQuotesResponse {
  success: boolean;
  message: string;
  data: CustomerQuoteHistoryData[];
}

export async function getPendingQuotesApi() {
  const res = await customAxios.get<PendingQuotesResponse>('/api/receivedQuo/customer/pending');
  return res.data;
}
