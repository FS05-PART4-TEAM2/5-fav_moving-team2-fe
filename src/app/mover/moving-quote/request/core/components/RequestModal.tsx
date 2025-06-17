'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Divider, Stack } from '@mui/material';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import InputField from '@/shared/components/Input/InputField';
import { colorChips } from '@/shared/styles/colorChips';
import { UserCardData } from '@/shared/components/Card/CardPresets';
import Card from '@/shared/components/Card/Card';
import { Typo } from '@/shared/styles/Typo/Typo';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { rejectQuotationAPI, sendQuotationAPI } from '../api/requestApi';

type Mode = 'request' | 'reject';

interface RequestModalProps {
  mode: Mode;
  requestCardData: UserCardData;
  onClose: () => void;
  onSuccess?: () => void;
}

interface RequestFormData {
  quoteAmount?: string;
  comment?: string;
}

export default function RequestModal({ mode, requestCardData, onClose, onSuccess }: RequestModalProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const methods = useForm<RequestFormData>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (data: RequestFormData) => {
    try {
      const quotationId = requestCardData.id;
      if (!quotationId) throw new Error('quotationId가 없습니다.');

      if (mode === 'request') {
        const customerId = requestCardData.customerId;
        if (!customerId) throw new Error('customerId가 없습니다.');

        const payload = {
          price: Number(data.quoteAmount),
          comment: data.comment ?? '',

          customerId: requestCardData.customerId as string,
          quotationId: requestCardData.id as string,
          isAssignQuo: !!requestCardData.isAssignQuo,
        };
        await sendQuotationAPI(payload);
      } else {
        const payload = {
          quotationId: requestCardData.id as string,
          comment: data.comment ?? '',
        };
        await rejectQuotationAPI(payload);
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert(mode === 'request' ? '견적 전송에 실패했습니다.' : '반려 요청에 실패했습니다.');
    }
  };

  const modalContent = () => {
    if (mode === 'request') {
      return (
        <>
          <Stack spacing={3}>
            <Card type="request" data={requestCardData} isModal />
            <Stack spacing={2}>
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.black[400] }}
                content="견적가를 입력해 주세요"
              />

              <InputField
                name="quoteAmount"
                override={{
                  backgroundColor: colorChips.background['f7f7f7'],
                }}
              />
            </Stack>

            <Divider
              sx={{
                borderColor: colorChips.line['f2f2f2'],
                my: isMd ? '20px' : '32px',
              }}
            />

            <Stack spacing={2}>
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.black[400] }}
                content="코멘트를 입력해 주세요"
              />
              <InputField
                name="comment"
                override={{
                  backgroundColor: colorChips.background['f7f7f7'],
                }}
              />
            </Stack>
            <SolidButton type="submit" text="견적 보내기" isLoading={isSubmitting} disabled={!isValid} width="100%" />
          </Stack>
        </>
      );
    }

    return (
      <Stack spacing={1}>
        <Card type="request" data={requestCardData} isModal />

        <Stack spacing={2}>
          <Typo
            className={isMd ? 'text_SB_16' : 'text_SB_20'}
            style={{ color: colorChips.black[400] }}
            content="반려 사유를 입력해 주세요"
          />
          <InputField
            name="comment"
            override={{
              backgroundColor: colorChips.background['f7f7f7'],
            }}
          />
        </Stack>
        <SolidButton type="submit" text="반려하기" isLoading={isSubmitting} disabled={!isValid} width="100%" />
      </Stack>
    );
  };

  return (
    <FormProvider {...methods}>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
        {modalContent()}
      </Stack>
    </FormProvider>
  );
}
