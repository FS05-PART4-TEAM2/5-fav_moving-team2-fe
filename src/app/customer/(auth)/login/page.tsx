'use client';

import AuthForm from '@/shared/components/Form/Auth/AuthForm';

export default function Login() {
  return <AuthForm mode="login" userType="customer" />;
}
