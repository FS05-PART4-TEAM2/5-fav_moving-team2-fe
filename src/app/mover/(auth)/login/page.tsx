'use client';

import AuthForm from '@/shared/components/Form/Auth/AuthForm';

export default function Login() {
<<<<<<< HEAD
  return <AuthForm mode="login" userType="mover" />;
=======
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
>>>>>>> d8262923dc14ece38e22fc662bd060543b8bc688
}
