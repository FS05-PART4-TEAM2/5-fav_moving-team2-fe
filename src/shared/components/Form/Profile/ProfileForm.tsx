'use client';

import Grid from '@mui/material/Grid';
import InputField from '@/shared/components/Input/InputField';
import { Box, Divider } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { OutlinedButton } from '../../Button/OutlinedButton';
import { SolidButton } from '../../Button/SolidButton';
import { Stack, useMediaQuery } from '@mui/system';
import RegionSelector from './RegionSelector';
import ServiceSelector from './ServiceSelector';
import ProfileImageUploader from './ProfileImageUploader';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';

interface ProfileFormProps {
  mode: 'create' | 'modify';
  userType: 'customer' | 'mover';
}

export default function ProfileForm({ mode, userType }: ProfileFormProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const methods = useForm();
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = methods;

  const isModify = mode === 'modify';
  const isCustomer = userType === 'customer';

  const dividerSpacing = {
    create: {
      customer: { first: { mt: '32px', mb: '64px' }, rest: { mt: '16px', mb: '20px' } },
      mover: { first: { mt: '48px', mb: '48px' }, rest: { mt: '24px', mb: '20px' } },
    },
    modify: {
      customer: { first: { mt: '40px', mb: '40px' }, rest: { mt: '32px', mb: '20px' } },
      mover: { first: { mt: '40px', mb: '40px' }, rest: { mt: '16px', mb: '20px' } },
    },
  } as const;

  const LeftGrid = isModify || !isCustomer;
  const DividerSpacingMediaT = isMd ? dividerSpacing[mode][userType].rest.mt : dividerSpacing[mode][userType].first.mt;
  const DividerSpacingMediaB = isMd ? dividerSpacing[mode][userType].rest.mb : dividerSpacing[mode][userType].first.mb;

  const onSubmit = (data: unknown) => {
    console.log(data);
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
      >
        <Stack gap={isMd ? '16px' : '32px'}>
          <Typo
            className={isMd ? 'text_B_18' : 'text_SB_32'}
            style={{ color: colorChips.black[400] }}
            content={isModify ? '프로필 수정' : '프로필 등록'}
          />
          {!isModify && (
            <Typo
              className={isMd ? 'text_SB_16' : 'text_SB_20'}
              style={{ color: isMd ? colorChips.black[100] : colorChips.black[200] }}
              content={'추가 정보를 입력하여 회원가입을 완료해주세요'}
            />
          )}
        </Stack>
        <Divider
          sx={{
            borderColor: colorChips.line['f2f2f2'],
            mt: DividerSpacingMediaT,
            mb: DividerSpacingMediaB,
          }}
        />
        {/* 반응형 방향 설정: row ↔ column */}
        <Grid
          container
          spacing={isMd ? 0 : 9}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={isCustomer ? '' : 'flex-start'}
        >
          {LeftGrid && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack gap={isMd ? '20px' : '32px'}>
                <Stack component="section">
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.black[300] }}
                    content={'이름'}
                  />
                  <InputField
                    name="username"
                    override={{
                      backgroundColor: colorChips.background['f7f7f7'],
                    }}
                  />
                </Stack>
                <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
                <Stack component="section" spacing={2}>
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.black[300] }}
                    content={'이메일'}
                  />
                  <InputField
                    name="email"
                    override={{
                      backgroundColor: colorChips.background['f7f7f7'],
                    }}
                  />
                </Stack>
                <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
                <Stack component="section" spacing={2}>
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.black[300] }}
                    content={'전화번호'}
                  />
                  <InputField
                    name="phoneNumber"
                    override={{
                      backgroundColor: colorChips.background['f7f7f7'],
                    }}
                  />
                </Stack>
                <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
                <Stack component="section" spacing={2}>
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.black[300] }}
                    content={'현재 비밀번호'}
                  />
                  <InputField
                    name="currentPassword"
                    override={{
                      backgroundColor: colorChips.background['f7f7f7'],
                    }}
                  />
                </Stack>
                <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
                <Stack component="section" spacing={2}>
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.black[300] }}
                    content={'새 비밀번호'}
                  />
                  <InputField
                    name="newPassword"
                    override={{
                      backgroundColor: colorChips.background['f7f7f7'],
                    }}
                  />
                </Stack>
                <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
                <Stack component="section" spacing={2}>
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.black[300] }}
                    content={'새 비밀번호 확인'}
                  />
                  <InputField
                    name="newPasswordConfirm"
                    override={{
                      backgroundColor: colorChips.background['f7f7f7'],
                    }}
                  />
                </Stack>
                <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
              </Stack>
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              sx={{
                paddingTop: isMd ? '20px' : '',
                alignItems: 'flex-start',
              }}
            >
              <ProfileImageUploader />

              <ServiceSelector userType={userType} />

              <RegionSelector userType={userType} />
            </Stack>
          </Grid>
        </Grid>

        {/* 버튼 영역 */}
        <Stack mt={6} width="100%">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width="100%"
            spacing={2}
            justifyContent={isCustomer ? 'center' : 'flex-end'}
          >
            {isModify ? (
              isMd ? (
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
                  <OutlinedButton type="button" text="취소" disabled={isSubmitting || !isDirty || !isValid} />
                  <SolidButton type="submit" text="수정하기" disabled={isSubmitting || !isDirty || !isValid} />
                </>
              )
            ) : (
              <SolidButton type="submit" text="시작하기" width="100%" disabled={isSubmitting || !isDirty || !isValid} />
            )}
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
