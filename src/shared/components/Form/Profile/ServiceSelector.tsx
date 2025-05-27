'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Service } from '@/shared/constants';
import Chip from '../../Chip/Chip';

interface ServiceSelectorProps {
  userType: 'customer' | 'mover';
}

export default function ServiceSelector({ userType }: ServiceSelectorProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const title = userType === 'customer' ? '이용 서비스' : '제공 서비스';
  const helperText =
    typeof errors.service?.message === 'string' ? `* ${errors.service.message}` : '* 이용할 서비스를 선택해 주세요';

  return (
    <Stack
      component="section"
      spacing={1}
      py={isMd ? '20px' : '32px'}
      sx={{
        borderTop: `1px solid ${colorChips.line['f2f2f2']}`,
        borderBottom: `1px solid ${colorChips.line['f2f2f2']}`,
      }}
    >
      <Stack direction="row" gap="4px">
        <Typo className={isMd ? 'text_SB_16' : 'text_SB_20'} style={{ color: colorChips.black[300] }} content={title} />
        <Typo className={isMd ? 'text_SB_16' : 'text_SB_20'} style={{ color: colorChips.primary[300] }} content="*" />
      </Stack>

      <Typo
        className={isMd ? 'text_M_13' : 'text_M_16'}
        sx={{ color: errors.service ? 'error.main' : '#7C7C7C' }}
        content={helperText}
      />

      <Controller
        name="service"
        control={control}
        rules={{
          validate: (value) => (value && value.length > 0 ? true : '1개 이상 선택해주세요.'),
        }}
        render={({ field }) => (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={isMd ? '8px' : '14px'}
            sx={{
              width: {
                xs: '300px',
                sm: '350px',
                md: '416px',
              },
            }}
          >
            {Service.map((label) => {
              const selected = (field.value ?? []).includes(label);
              const chipType = selected ? 'moveType' : 'region';

              return (
                <Chip
                  key={`${label}-${chipType}`}
                  type={chipType}
                  onClick={() => {
                    const current = field.value ?? [];
                    const next = selected ? current.filter((s: string) => s !== label) : [...current, label];
                    field.onChange(next);
                  }}
                >
                  {label}
                </Chip>
              );
            })}
          </Stack>
        )}
      />
    </Stack>
  );
}
