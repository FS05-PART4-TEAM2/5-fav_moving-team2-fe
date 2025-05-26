import customAxios from '@/lib/customAxios';
import { LoginPayload, SignupPayload } from '@/shared/types/types';

export async function login(userType: 'customer' | 'mover', payload: LoginPayload) {
  const res = await customAxios.post(`/api/auth/${userType}/login`, payload);
  console.log('res', res.data);
  return res.data;
}

export async function signup(userType: 'customer' | 'mover', payload: SignupPayload) {
  const res = await customAxios.post(`/api/auth/${userType}/signup`, payload);
  return res.data;
}

export async function logout(): Promise<void> {
  await customAxios.post('/api/auth/logout');
}
