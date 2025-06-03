import customAxios from '@/lib/customAxios';

interface QuoteConfirmResponse {
  success: boolean;
  message: string;
  data: { id: string };
}

export async function postQuoteConfirmApi(offerId: string) {
  const res = await customAxios.post<QuoteConfirmResponse>(`/api/receivedQuo/customer/pending/${offerId}`);
  return res.data;
}
