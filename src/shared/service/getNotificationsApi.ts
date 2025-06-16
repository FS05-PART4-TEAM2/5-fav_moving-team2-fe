import customAxios from '@/lib/customAxios';
import { NotificationResponseData } from '@/shared/types/types';

interface NotificationResponse {
  success: boolean;
  message: string;
  data: NotificationResponseData;
}

interface NotificationPayload {
  cursorId?: string | null;
  cursorDate?: string | null;
  limit?: number;
}

export async function getNotificationsApi(params: NotificationPayload) {
  const queryParams: Record<string, string | number> = {
    limit: params.limit || 10,
  };

  if (params.cursorId) {
    queryParams.cursorId = params.cursorId;
  }

  if (params.cursorDate) {
    queryParams.cursorDate = params.cursorDate;
  }

  const res = await customAxios.get<NotificationResponse>('/api/notifications', {
    params: queryParams,
  });
  return res.data;
}
