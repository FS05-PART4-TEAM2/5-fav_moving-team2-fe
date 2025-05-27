'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';
import { Region } from '@/shared/constants';
import Chip from '../../Chip/Chip';
import { Typo } from '@/shared/styles/Typo/Typo';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';

interface RegionSelectorProps {
  userType: 'customer' | 'mover';
}

export default function RegionSelector({ userType }: RegionSelectorProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const title = userType === 'customer' ? '내가 사는 지역' : '서비스 가능 지역';
  const helperText =
    typeof errors.region?.message === 'string'
      ? `* ${errors.region.message}`
      : '* 내가 사는 지역은 수정 기능에서 변경할 수 있습니다';

  return (
    <Stack component="section" spacing={1} pt={isMd ? '20px' : '32px'}>
      <Stack direction="row" gap="4px">
        <Typo className={isMd ? 'text_SB_16' : 'text_SB_20'} style={{ color: colorChips.black[300] }} content={title} />
        <Typo className={isMd ? 'text_SB_16' : 'text_SB_20'} style={{ color: colorChips.primary[300] }} content="*" />
      </Stack>
      <Typo
        className={isMd ? 'text_M_13' : 'text_M_16'}
        sx={{ color: errors.region ? 'error.main' : '#7C7C7C' }}
        content={helperText}
      />

      <Controller
        name="region"
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
                md: '440px',
              },
            }}
          >
            {Region.map((label) => {
              const selected = (field.value ?? []).includes(label);
              const chipType = selected ? 'moveType' : 'region';

              return (
                <Chip
                  key={`${label}-${selected ? 'moveType' : 'region'}`}
                  type={chipType}
                  onClick={() => {
                    const current = field.value ?? [];
                    const next = selected ? current.filter((r: string) => r !== label) : [...current, label];
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
