import customAxios from '@/lib/customAxios';
import {
  GlobalResponseWithGeneric,
  UpdateCustomerProfileResponse,
  UpdateMoverProfileResponse,
} from '@/shared/types/types';
import { AxiosRequestConfig } from 'axios';

export async function updateCustomerProfile(
  formData: FormData,
): Promise<GlobalResponseWithGeneric<UpdateCustomerProfileResponse>> {
  const res = await customAxios.put<GlobalResponseWithGeneric<UpdateCustomerProfileResponse>>(
    '/api/profile/customer',
    formData,
    {
      useMultipart: true,
    } as AxiosRequestConfig & { useMultipart: boolean },
  );
  return res.data;
}

export async function updateMoverProfile(
  formData: FormData,
): Promise<GlobalResponseWithGeneric<UpdateMoverProfileResponse>> {
  const res = await customAxios.put<GlobalResponseWithGeneric<UpdateMoverProfileResponse>>(
    '/api/profile/mover',
    formData,
    {
      useMultipart: true,
    } as AxiosRequestConfig & { useMultipart: boolean },
  );
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
