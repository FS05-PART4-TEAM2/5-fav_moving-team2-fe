import { SearchMoverDetailResponse } from '@/shared/types/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface MoverDetailResponse {
  success: boolean;
  message: string;
  data: SearchMoverDetailResponse;
}

export async function getMoverDetailApi(moverId: string) {
  try {
    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const url = `${apiUrl}/api/mover/${moverId}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: requestHeaders,
      next: {
        tags: ['mover-detail'],
      },
    });

    const data: MoverDetailResponse = await res.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: '기사님 정보를 불러오는데 실패했습니다.',
      data: {} as SearchMoverDetailResponse,
    };
  }
}
