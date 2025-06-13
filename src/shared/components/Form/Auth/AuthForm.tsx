'use client';

import InputField from '@/shared/components/Input/InputField';
import { Stack } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { SolidButton } from '../../Button/SolidButton';
import useUserStore from '@/shared/store/useUserStore';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import AuthHeader from './AuthHeader';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import AuthFormOAuth from './AuthFormOAuth';
import { login, signup } from '@/shared/core/Auth/service';
import { CustomerLoginData, LoginPayload, MoverLoginData, SignupPayload } from '@/shared/types/types';
import { invalidateQueryKeys } from '@/shared/utils/invalidateQueryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchMoverStore } from '@/app/customer/search-mover/core/hooks/useSearchMoverStore';

interface AuthFormProps {
  mode: 'login' | 'signup';
  userType: 'customer' | 'mover';
}

type FormValues = LoginPayload & Partial<SignupPayload> & { passwordConfirm?: string };

export default function AuthForm({ mode, userType }: AuthFormProps) {
  const queryClient = useQueryClient();
  const methods = useForm<FormValues>();
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const router = useRouter();
  const { setUserInfo, setCustomerData, setMoverData } = useUserStore();
  const { reset: resetSearchMoverStore } = useSearchMoverStore();

  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isCustomer = userType === 'customer';

  const siteCustomerPath = isLogin ? PATH.customer.signup : PATH.customer.login;
  const siteMoverPath = isLogin ? PATH.mover.signup : PATH.mover.login;
  const siteQuestionText = isLogin ? '아직 무빙 회원이 아니신가요?' : '이미 무빙 회원이신가요?';
  const siteMoveText = isLogin ? '이메일로 회원가입하기' : '로그인';

  const watchFields = watch();
  const isAllFilled = isLogin
    ? Boolean(watchFields.email && watchFields.password)
    : Boolean(
        watchFields.username &&
          watchFields.email &&
          watchFields.phoneNumber &&
          watchFields.password &&
          watchFields.passwordConfirm,
      );

  const isDisabled = !isAllFilled || isSubmitting;

  const onSubmit = async (data: FormValues) => {
    try {
      if (isLogin) {
        const loginData: LoginPayload = {
          email: data.email,
          password: data.password,
        };
        const res = await login(userType, loginData);

        if (userType === 'customer') {
          const customer = (res?.data as CustomerLoginData).customer;

          if (!customer) {
            throw new Error('로그인 응답에 customer 정보가 없습니다.');
          }

          setUserInfo('customer', {
            id: customer.id,
            username: customer.username,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            profileImage: customer.profileImage,
            isProfile: customer.isProfile,
          });

          setCustomerData({
            wantService: customer.wantService,
            livingPlace: customer.livingPlace,
            hasQuotation: customer.hasQuotation,
          });

          invalidateQueryKeys(queryClient);
          resetSearchMoverStore();

          //development 일때만 로컬에 저장
          if (process.env.NODE_ENV === 'development') {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
          }

          if (!customer.isProfile) {
            router.push(PATH.customer.profile);
          } else if (!customer.hasQuotation) {
            // 활성견적 x : 견적요청 페이지
            router.push(PATH.customer.movingQuoteRequest);
          } else {
            // 활성견적 o : 내견적관리 페이지
            router.push(PATH.customer.movingQuoteHistory);
          }
        }
        if (userType === 'mover') {
          const mover = (res?.data as MoverLoginData).mover;

          if (!mover) {
            throw new Error('로그인 응답에 mover 정보가 없습니다.');
          }

          setUserInfo('mover', {
            id: mover.id,
            username: mover.username,
            email: mover.email,
            phoneNumber: mover.phoneNumber,
            profileImage: mover.profileImage,
            isProfile: mover.isProfile,
          });

          setMoverData({
            nickname: mover.nickname,
            serviceArea: mover.serviceArea,
            serviceList: mover.serviceList,
            intro: mover.intro,
            career: String(mover.career),
            detailDescription: mover.detailDescription,
          });

          invalidateQueryKeys(queryClient);
          resetSearchMoverStore();

          //development 일때만 로컬에 저장
          if (process.env.NODE_ENV === 'development') {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
          }

          if (!mover.isProfile) {
            router.push(PATH.mover.profile);
          } else {
            router.push(PATH.mover.movingQuoteRequest);
          }
        }
      }
      if (isSignup) {
        const { username, email, password, phoneNumber } = data as SignupPayload;

        await signup(userType, {
          username,
          email,
          password,
          phoneNumber,
        });

        const redirectPath = userType === 'customer' ? PATH.customer.login : PATH.mover.login;
        return router.push(redirectPath);
      }
    } catch (err) {
      console.error('[Auth 실패]', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Stack alignItems="center" pt={isMd ? '57px' : '26px'} pb={isMd ? '111px' : '114px'}>
        <Stack justifyContent="center" width={isMd ? '327px' : '640px'} gap={isMd ? '32px' : '56px'}>
          <AuthHeader mode={mode} userType={userType} />

          <Stack component="form" onSubmit={handleSubmit(onSubmit)} noValidate gap="32px">
            {isSignup && (
              <Stack component="section">
                <Typo className={isMd ? 'text_R_14' : 'text_R_20'} style={{ color: colorChips.black[400] }}>
                  이름
                </Typo>
                <InputField name="username" />
              </Stack>
            )}

            <Stack component="section">
              <Typo className={isMd ? 'text_R_14' : 'text_R_20'} style={{ color: colorChips.black[400] }}>
                이메일
              </Typo>
              <InputField name="email" />
            </Stack>

            {isSignup && (
              <Stack component="section">
                <Typo className={isMd ? 'text_R_14' : 'text_R_20'} style={{ color: colorChips.black[400] }}>
                  전화번호
                </Typo>
                <InputField name="phoneNumber" />
              </Stack>
            )}

            <Stack component="section">
              <Typo className={isMd ? 'text_R_14' : 'text_R_20'} style={{ color: colorChips.black[400] }}>
                비밀번호
              </Typo>
              <InputField name="password" />
            </Stack>

            {isSignup && (
              <Stack component="section">
                <Typo className={isMd ? 'text_R_14' : 'text_R_20'} style={{ color: colorChips.black[400] }}>
                  비밀번호 확인
                </Typo>
                <InputField name="passwordConfirm" />
              </Stack>
            )}

            <Stack component="section" pt="24px" gap={isMd ? '16px' : '24px'} alignItems="center">
              <SolidButton type="submit" text={isLogin ? '로그인' : '시작하기'} disabled={isDisabled} />
              <Stack direction="row" gap={isMd ? '4px' : '8px'} alignItems="center">
                <Typo
                  className={isMd ? 'text_R_12' : 'text_R_20'}
                  style={{ color: isMd ? colorChips.black[100] : colorChips.black[200] }}
                >
                  {siteQuestionText}
                </Typo>
                <Typo
                  className={isMd ? 'text_SB_12' : 'text_SB_20'}
                  onClick={() => router.push(`${isCustomer ? siteCustomerPath : siteMoverPath}`)}
                  style={{ color: colorChips.primary[300], textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {siteMoveText}
                </Typo>
              </Stack>
            </Stack>
          </Stack>
          <AuthFormOAuth userType={userType} />
        </Stack>
      </Stack>
    </FormProvider>
  );
}
