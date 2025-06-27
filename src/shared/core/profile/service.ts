import customAxios from '@/lib/customAxios';
import { AxiosRequestConfig } from 'axios';

export async function updateCustomerProfile(formData: FormData) {
  const res = await customAxios.put('/api/profile/customer', formData, {
    useMultipart: true,
  } as AxiosRequestConfig & { useMultipart: boolean });
  return res.data;
}

export async function updateMoverProfile(formData: FormData) {
  const res = await customAxios.put('/api/profile/mover', formData, {
    useMultipart: true,
  } as AxiosRequestConfig & { useMultipart: boolean });
  return res.data;
}

export interface BaseInfoPayload {
  username: string;
  email: string;
  phoneNumber: string;
  currentPassword?: string;
  newPassword?: string;
}

export async function updateMoverBaseInfo(payload: BaseInfoPayload) {
  const res = await customAxios.put('/api/profile/mover/info', payload);
  return res.data;
}
