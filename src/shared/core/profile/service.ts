import customAxios from '@/lib/customAxios';

export async function updateCustomerProfile(formData: FormData) {
  const res = await customAxios.put('/api/profile/customer', formData);
  return res.data;
}

export async function updateMoverProfile(formData: FormData) {
  const res = await customAxios.put('/api/profile/mover', formData);
  return res.data;
}

interface BaseInfoPayload {
  username: string;
  email: string;
  phoneNumber: string;
  currPassword?: string;
  newPassword?: string;
}

export async function updateMoverBaseInfo(payload: BaseInfoPayload) {
  const res = await customAxios.put('/api/profile/mover/info', payload);
  return res.data;
}
