'use client';

import InputField from '@/shared/components/Input/InputField';
import { Stack } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';

export default function AuthForm() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Stack justifyContent="center" alignItems="center" gap="20px" height="100vh">
        <form onSubmit={methods.handleSubmit((data) => console.log(data))} noValidate>
          <section>
            <InputField name="name" />
          </section>

          <section>
            <InputField name="email" />
          </section>

          <section>
            <InputField name="phoneNumber" />
          </section>

          <section>
            <InputField name="password" />
          </section>

          <section>
            <InputField name="passwordConfirm" />
          </section>

          <button type="submit">로그인</button>
        </form>
      </Stack>
    </FormProvider>
  );
}
