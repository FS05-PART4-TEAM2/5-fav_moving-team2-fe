'use client';

import AuthForm from '@/shared/components/Form/Auth/AuthForm';

export default function Login() {
<<<<<<< HEAD
  return <AuthForm mode="login" userType="customer" />;
=======
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
>>>>>>> d8262923dc14ece38e22fc662bd060543b8bc688
}
