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
    setUserInfo('mover', {
      id: '1',
      username: '기사님',
      email: 'test@test.com',
      phoneNumber: '01012345678',
      profileImage: '/assets/images/profile-icon/avatartion-blue-01.svg',
    });
    router.push(PATH.mover.movingQuoteRequest);
  };
  return (
    <Stack>
      <AuthForm />
      <SolidButton text="기사님 로그인" onClick={handleLogin} />
    </Stack>
  );
}
