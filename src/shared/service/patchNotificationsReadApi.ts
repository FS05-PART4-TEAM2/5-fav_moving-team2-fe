import customAxios from '@/lib/customAxios';
import { GlobalResponse } from '@/shared/types/types';

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function patchNotificationsReadApi(id: string) {
  try {
    const res = await customAxios.patch<GlobalResponse>(`/api/notifications/${id}/read`);
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: '알림 읽음 처리에 실패했습니다.',
      data: {} as GlobalResponse,
    };
  }
}


// export async function patchNotificationsReadApi(id: string, token: string) {
//   try{
//     const requestHeaders: HeadersInit = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     };

//     const url = `${apiUrl}/api/notifications/${id}/read`;

//     const res = await fetch(url, {
//       method: 'PATCH',
//       headers: requestHeaders,
//       credentials: 'include',
//     });

//     const data: GlobalResponse = await res.json();

//     return data;
//   } catch {
//     return {
//       success: false,
//       message: '알림 읽음 처리에 실패했습니다.',
//       data: {} as GlobalResponse,
//     };
//   }
// }
