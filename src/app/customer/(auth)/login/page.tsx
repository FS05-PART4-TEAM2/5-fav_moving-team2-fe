'use client';

import { SolidButton } from '@/shared/components/Button/SolidButton';
import AuthForm from '../core/components/AuthFrom';
import { Stack } from '@mui/material';
import useUserStore from '@/shared/store/useUserStore';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';

export default function Login() {
  const router = useRouter();
  const { setUserInfo } = useUserStore();
  const handleLogin = () => {
    setUserInfo('customer', {
      id: '1',
      username: '일반유저',
      email: 'test@test.com',
      phoneNumber: '01012345678',
      profileImage: null,
    });
    router.push(PATH.customer.movingQuoteRequest);
  };
  return (
    <Stack>
      <AuthForm />
      <SolidButton text="일반유저 로그인" onClick={handleLogin} />
    </Stack>
  );
}
