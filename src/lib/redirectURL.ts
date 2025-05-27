import { PATH } from '@/shared/constants';

export function redirectURL(userType: 'customer' | 'mover'): string {
  const currentPath = window.location.pathname + window.location.search;

  const ExcludePath = currentPath.includes('/login') || currentPath.includes('/signup') || currentPath === '/';

  if (!ExcludePath) {
    localStorage.setItem('redirectAfterLogin', currentPath);
  }

  return userType === 'customer' ? PATH.customer.login : PATH.mover.login;
}
