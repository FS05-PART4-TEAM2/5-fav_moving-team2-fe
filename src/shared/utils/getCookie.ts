import { getCookie } from 'cookies-next';

export function getAccessToken(): string | undefined {
  const accessToken = getCookie('accessToken');
  return accessToken?.toString();
}