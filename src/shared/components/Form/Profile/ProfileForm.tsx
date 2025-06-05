'use client';

import Grid from '@mui/material/Grid';
import { Stack, Divider } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { OutlinedButton } from '../../Button/OutlinedButton';
import { SolidButton } from '../../Button/SolidButton';
import { useMediaQuery } from '@mui/system';
import { colorChips } from '@/shared/styles/colorChips';
import theme from '@/shared/theme';
import ProfileFormHeader from './ProfileFormHeader';
import ProfileFormLeft from './ProfileFormLeft';
import ProfileFormRight from './ProfileFormRight';
import { CustomerProfileForm, MoverBaseInfoForm, MoverProfileForm } from '@/shared/types/types';
import { updateCustomerProfile, updateMoverBaseInfo, updateMoverProfile } from '@/shared/core/profile/service';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PATH, REGIONS, SERVICE_TYPES } from '@/shared/constants';
import useUserStore from '@/shared/store/useUserStore';

interface ProfileFormProps {
  mode: 'create' | 'modify' | 'baseInfo';
  userType: 'customer' | 'mover';
  defaultValues?: Partial<FormTypes>;
}

type FormTypes = CustomerProfileForm | MoverProfileForm | MoverBaseInfoForm;

export default function ProfileForm({ mode, userType, defaultValues }: ProfileFormProps) {
  const { customerData } = useUserStore();
  const methods = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: defaultValues ?? {
      service: [],
      region: [],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = methods;
  const router = useRouter();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const isModify = mode === 'modify';
  const isBaseInfo = mode === 'baseInfo';
  const isCustomer = userType === 'customer';
  const isCreate = mode === 'create';

  const dividerSpacing = {
    create: {
      customer: { first: { mt: '32px', mb: '64px' }, rest: { mt: '16px', mb: '20px' } },
      mover: { first: { mt: '48px', mb: '48px' }, rest: { mt: '24px', mb: '20px' } },
    },
    modify: {
      customer: { first: { mt: '40px', mb: '40px' }, rest: { mt: '32px', mb: '20px' } },
      mover: { first: { mt: '40px', mb: '40px' }, rest: { mt: '16px', mb: '20px' } },
    },
    baseInfo: {
      customer: { first: { mt: '40px', mb: '40px' }, rest: { mt: '32px', mb: '20px' } },
      mover: { first: { mt: '40px', mb: '40px' }, rest: { mt: '16px', mb: '20px' } },
    },
  } as const;

  const LeftGrid = isModify || !isCustomer;
  const DividerSpacingMediaT = isMd ? dividerSpacing[mode][userType].rest.mt : dividerSpacing[mode][userType].first.mt;
  const DividerSpacingMediaB = isMd ? dividerSpacing[mode][userType].rest.mb : dividerSpacing[mode][userType].first.mb;

  // TODO alert부분 나중에 모달로 수정하면 좋을듯
  const onSubmit = async (data: FormTypes) => {
    const getServiceKey = (label: string) => SERVICE_TYPES.find((s) => s.label === label)?.key ?? '';
    const getRegionKey = (label: string) => REGIONS.find((r) => r.label === label)?.key ?? '';

    try {
      // mover 기본 수정 일떄
      if (isBaseInfo && !isCustomer) {
        const d = data as MoverBaseInfoForm;
        const res = await updateMoverBaseInfo(d);

        if (!res || res.success !== true) {
          throw new Error(res?.message ?? '기본 정보 저장에 실패했습니다.');
        }

        alert('프로필이 성공적으로 저장되었습니다.');
        router.back();
        return;
      }

      // Customer + 등록 일때
      if (isCustomer && isCreate) {
        const d = data as CustomerProfileForm;
        const serviceKeys = (d.service ?? []).map(getServiceKey).filter(Boolean);
        const regionKeys = (d.region ?? []).map(getRegionKey).filter(Boolean);

        const formData = new FormData();

        if (d.profileImage && d.profileImage instanceof File) {
          formData.append('profileImage', d.profileImage);
        }
        formData.append('wantService', serviceKeys.join(','));
        formData.append('livingPlace', regionKeys.join(','));

        const res = await updateCustomerProfile(formData);

        if (!res || res.success !== true) {
          throw new Error(res?.message ?? '프로필 등록에 실패했습니다.');
        }

        const hasQuotation = customerData?.hasQuotation;

        if (!hasQuotation) {
          router.push(PATH.customer.movingQuoteRequest);
          return;
        }

        router.push(PATH.customer.movingQuoteHistory);
        return;
      }

      // Customer + 수정 일때
      if (isCustomer && isModify) {
        const d = data as CustomerProfileForm;
        const formData = new FormData();
        const serviceKeys = (d.service ?? []).map(getServiceKey).filter(Boolean);
        const regionKeys = (d.region ?? []).map(getRegionKey).filter(Boolean);

        if (d.username) formData.append('username', d.username);
        if (d.currPassword) formData.append('currPassword', d.currPassword);
        if (d.newPassword) formData.append('newPassword', d.newPassword);
        if (d.profileImage && d.profileImage instanceof File) {
          formData.append('profileImage', d.profileImage);
        }
        formData.append('phoneNumber', d.phoneNumber);
        formData.append('wantService', serviceKeys.join(','));
        formData.append('livingPlace', regionKeys.join(','));

        const res = await updateCustomerProfile(formData);

        if (!res || res.success !== true) {
          throw new Error(res?.message ?? '프로필 수정에 실패했습니다.');
        }

        alert('프로필이 성공적으로 저장되었습니다.');
        router.back();
        return;
      }

      // mover 생성 / 수정 일때
      if (!isCustomer && !isBaseInfo) {
        const d = data as MoverProfileForm;

        const serviceKeys = (d.service ?? []).map(getServiceKey).filter(Boolean);
        const regionKeys = (d.region ?? []).map(getRegionKey).filter(Boolean);

        const formData = new FormData();

        if (d.profileImage && d.profileImage instanceof File) {
          formData.append('profileImage', d.profileImage);
        }
        formData.append('nickname', d.nickname);
        formData.append('career', d.career);
        formData.append('intro', d.intro);
        formData.append('detailDescription', d.detailDescription);
        formData.append('serviceList', serviceKeys.join(','));
        formData.append('serviceArea', regionKeys.join(','));

        const res = await updateMoverProfile(formData);

        if (!res || res.success !== true) {
          throw new Error(res?.message ?? '프로필 저장에 실패했습니다.');
        }

        if (isModify) {
          router.back();
          return;
        }

        router.push(PATH.mover.movingQuoteRequest);
        return;
      }
      //TODO 등록 수정 같은 것에는 모달을 넣는게 UX적으로 좋지않나.... 나중에 추가하기

      throw new Error('알 수 없는 요청입니다.');
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
        maxWidth={isCustomer && !isModify ? (isMd ? '327px' : '640px') : undefined}
        mx="auto"
        pt={isMd ? '16px' : '24px'}
        pb="40px"
        mb="38px"
      >
        <ProfileFormHeader mode={mode} userType={userType} />
        <Divider
          sx={{
            borderColor: colorChips.line['f2f2f2'],
            mt: DividerSpacingMediaT,
            mb: DividerSpacingMediaB,
          }}
        />

        <Grid
          container
          spacing={isMd ? 0 : 9}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={isCustomer ? '' : 'flex-start'}
        >
          {LeftGrid && (
            <Grid size={{ xs: 12, md: 6 }}>
              <ProfileFormLeft mode={mode} userType={userType} />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 6 }} sx={{ width: '100%' }}>
            <Stack spacing={6}>
              <ProfileFormRight mode={mode} userType={userType} />

              {isCreate && !isCustomer && (
                <SolidButton
                  type="submit"
                  text="시작하기"
                  width="100%"
                  disabled={isSubmitting || !isDirty || !isValid}
                />
              )}
            </Stack>
          </Grid>
        </Grid>

        {!isCreate && (
          <Stack mt={7} width="100%">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              {isMd ? (
                <>
                  <SolidButton
                    type="submit"
                    text="수정하기"
                    width="100%"
                    disabled={isSubmitting || !isDirty || !isValid}
                  />
                  <OutlinedButton
                    type="button"
                    text="취소"
                    width="100%"
                    disabled={isSubmitting || !isDirty || !isValid}
                  />
                </>
              ) : (
                <>
                  <OutlinedButton
                    type="button"
                    text="취소"
                    width="100%"
                    disabled={isSubmitting || !isDirty || !isValid}
                  />
                  <SolidButton
                    type="submit"
                    text="수정하기"
                    width="100%"
                    disabled={isSubmitting || !isDirty || !isValid}
                  />
                </>
              )}
            </Stack>
          </Stack>
        )}

        {isCreate && isCustomer && (
          <Stack mt={7} width="100%">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <SolidButton type="submit" text="시작하기" width="100%" disabled={isSubmitting || !isDirty || !isValid} />
            </Stack>
          </Stack>
        )}
      </Stack>
    </FormProvider>
  );
}
