import customAxios from '@/lib/customAxios';
import { CustomerQuoteHistoryData } from '@/shared/types/types';

interface ReceivedQuotesResponse {
  success: boolean;
  message: string;
  data: CustomerQuoteHistoryData[];
}

export async function getReceivedQuotesApi() {
  const res = await customAxios.get<ReceivedQuotesResponse>('/api/receivedQuo/customer/completed');
  return res.data;
}
