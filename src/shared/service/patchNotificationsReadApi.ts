import customAxios from '@/lib/customAxios';
import { GlobalResponse } from '@/shared/types/types';

export async function patchNotificationsReadApi(id: string) {
  const res = await customAxios.patch<GlobalResponse>(`/api/notifications/${id}/read`);
  if (res.data.success) {
    return true;
  }
  return false;
}
