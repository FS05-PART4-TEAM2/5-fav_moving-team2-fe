import { PATH } from '@/shared/constants';

export function redirectURL(userType: 'customer' | 'mover'): string {
  const currentPath = window.location.pathname + window.location.search;

  if (!currentPath.includes('/login')) {
    localStorage.setItem('redirectAfterLogin', currentPath);
  }

  return userType === 'customer' ? PATH.customer.login : PATH.mover.login;
}
