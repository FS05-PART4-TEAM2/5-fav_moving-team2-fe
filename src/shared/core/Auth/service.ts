import customAxios from '@/lib/customAxios';
import { GlobalResponse, LoginPayload, SignupPayload } from '@/shared/types/types';
import { AxiosResponse } from 'axios';

export async function OAuthLogin(provider: 'google' | 'kakao' | 'naver', userType: 'customer' | 'mover') {
  const res = await customAxios.get(`/api/auth/${provider}/${userType}/login`);
  return res;
}

export async function OAuthProfile(type: 'customer' | 'mover') {
  const res = await customAxios.get(`/api/profile/${type}`);
  return res.data;
}

export async function login(userType: 'customer' | 'mover', payload: LoginPayload) {
  const res = await customAxios.post(`/api/auth/${userType}/login`, payload);
  return res.data;
}

export async function signup(userType: 'customer' | 'mover', payload: SignupPayload) {
  const res = await customAxios.post(`/api/auth/${userType}/signup`, payload);
  return res.data;
}

type LogoutResponse = GlobalResponse & AxiosResponse;
export async function logout(): Promise<LogoutResponse> {
  const res = await customAxios.post('/api/auth/logout');
  return res.data;
}
