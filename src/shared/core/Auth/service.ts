import customAxios from '@/lib/customAxios';
import {
  GlobalResponse,
  GlobalResponseWithGeneric,
  LoginPayload,
  SignupPayload,
  UserLoginData,
  UserProfileData,
  UserSignupData,
} from '@/shared/types/types';
import { AxiosResponse } from 'axios';

export async function OAuthLogin(provider: 'google' | 'kakao' | 'naver', userType: 'customer' | 'mover') {
  const res = await customAxios.get(`/api/auth/${provider}/${userType}/login`);
  return res;
}

export async function OAuthProfile(type: 'customer' | 'mover'): Promise<GlobalResponseWithGeneric<UserProfileData>> {
  const res = await customAxios.get<GlobalResponseWithGeneric<UserProfileData>>(`/api/profile/${type}`);
  return res.data;
}

export async function login(
  userType: 'customer' | 'mover',
  payload: LoginPayload,
): Promise<GlobalResponseWithGeneric<UserLoginData>> {
  const res = await customAxios.post<GlobalResponseWithGeneric<UserLoginData>>(`/api/auth/${userType}/login`, payload);
  return res.data;
}

export async function signup(
  userType: 'customer' | 'mover',
  payload: SignupPayload,
): Promise<GlobalResponseWithGeneric<UserSignupData>> {
  const res = await customAxios.post<GlobalResponseWithGeneric<UserSignupData>>(
    `/api/auth/${userType}/signup`,
    payload,
  );
  return res.data;
}

type LogoutResponse = GlobalResponse & AxiosResponse;
export async function logout(): Promise<LogoutResponse> {
  const res = await customAxios.post('/api/auth/logout');
  return res.data;
}
