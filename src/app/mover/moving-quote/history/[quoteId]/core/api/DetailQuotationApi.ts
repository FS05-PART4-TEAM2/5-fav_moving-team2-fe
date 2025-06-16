import customAxios from '@/lib/customAxios';
import { SentQuotationAPIData } from '../../../core/hook/historyHooks';

interface GetSentQuotationDetailResponse {
  success: boolean;
  data: SentQuotationAPIData;
}

export async function getDetailQuotationDetailApi(id: string): Promise<GetSentQuotationDetailResponse> {
  try {
    const res = await customAxios.get<GetSentQuotationDetailResponse>(`/api/quotation/mover/sent/${id}`);
    return res.data;
  } catch (error) {
    console.error('❌ 견적 상세 API 오류:', error);
    throw error;
  }
}
