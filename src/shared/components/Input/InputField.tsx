'use client';

import { useState } from 'react';
import { Controller, useFormContext, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { fieldPresets, PresetFieldName, presetValidators } from './InputFieldPresets';
import { SxProps, Theme } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';

type InputFieldProps<T extends FieldValues> = {
  name: Path<T> & PresetFieldName;
  override?: Partial<Omit<TextFieldProps, 'name'>> & {
    backgroundColor?: string;
  };
};

export default function InputField<T extends FieldValues>({ name, override = {} }: InputFieldProps<T>) {
  const { control, getValues, trigger } = useFormContext<T>();
  const [showPassword, setShowPassword] = useState(false);
  const { backgroundColor, sx: overrideSx, ...textFieldOverride } = override ?? {};

  const isTextarea = name === 'detailDescription' || name === 'quoteInfo' || name === 'reject';
  const isCommaField = name === 'quoteAmount';
  const preset = fieldPresets[name];
  if (!preset) throw new Error(`정의되지 않은 필드 이름: ${name}`);

  const isPasswordField =
    name === 'password' ||
    name === 'passwordConfirm' ||
    name === 'currentPassword' ||
    name === 'newPassword' ||
    name === 'newPasswordConfirm';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : preset.type;

  let resolvedRules = (preset.rules ?? {}) as RegisterOptions<T, Path<T>>;

  if (name === 'passwordConfirm' && typeof presetValidators.passwordConfirm === 'function') {
    const getPassword = () => getValues('password' as Path<T>);
    resolvedRules = {
      ...resolvedRules,
      validate: (value: string) => presetValidators.passwordConfirm(value, getPassword),
    };
  }

  const formatComma = (value: string): string => {
    const raw = value.replace(/,/g, '');
    if (!raw || isNaN(Number(raw)) || Number(raw) === 0) return ''; // ← 핵심
    return Number(raw).toLocaleString();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={resolvedRules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          placeholder={preset.placeholder}
          type={inputType}
          autoComplete={preset.autoComplete}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          multiline={isTextarea}
          minRows={isTextarea ? 6 : undefined}
          maxRows={isTextarea ? 12 : undefined}
          value={
            isCommaField
              ? field.value === '0' || field.value === 0 || !field.value
                ? ''
                : formatComma(field.value)
              : field.value ?? ''
          }
          onChange={
            isCommaField
              ? (e) => {
                  const raw = e.target.value.replace(/,/g, '');
                  if (/^\d*$/.test(raw)) {
                    field.onChange(raw);
                  }
                }
              : field.onChange
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              trigger(name);
            }
          }}
          InputProps={{
            ...override?.InputProps,
            endAdornment: isPasswordField ? (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" aria-label="비밀번호 보기 토글">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
          sx={
            ((theme) => ({
              mt: 2,

              '& .MuiInputBase-root': {
                borderRadius: '16px',
                fontFamily: 'pretendard',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '26px',
                backgroundColor: backgroundColor ?? 'white',
                border: backgroundColor ? '1px solid transparent' : `1px solid ${colorChips.line['e6e6e6']}`,
                '&:hover': {
                  border: `1px solid ${colorChips.primary[300]}`,
                },
                '&.Mui-focused': {
                  border: `1px solid ${colorChips.primary[300]}`,
                },
                '&.Mui-error': {
                  border: `1px solid ${colorChips.secondary.red[200]}`,
                },
                '& fieldset': {
                  border: 'none',
                },

                ...(isTextarea && {
                  height: '160px',
                  alignItems: 'start',
                }),
                [theme.breakpoints.up('md')]: {
                  fontSize: '20px',
                  lineHeight: '32px',
                },
              },

              '& .MuiInputBase-inputMultiline': isTextarea
                ? {
                    overflowY: 'auto',
                    height: '100% !important',
                    boxSizing: 'border-box',
                    fontFamily: 'pretendard',
                    fontSize: '16px',
                    lineHeight: '26px',
                    [theme.breakpoints.up('md')]: {
                      fontSize: '20px',
                      lineHeight: '32px',
                    },

                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: colorChips.grayScale[300],
                      borderRadius: '3px',
                    },

                    scrollbarWidth: 'thin',
                    scrollbarColor: `${colorChips.grayScale[300]}, transparent`,
                  }
                : {},
              '& .MuiFormHelperText-root': {
                textAlign: 'right',
                marginLeft: 0,
                marginTop: '4px',
                fontFamily: 'pretendard',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '22px',
                color: fieldState.error ? theme.palette.error.main : undefined,
                [theme.breakpoints.up('md')]: {
                  fontSize: '16px',
                  lineHeight: '26px',
                },
              },
              ...overrideSx,
            })) as SxProps<Theme>
          }
          {...textFieldOverride}
        />
      )}
    />
  );
}
