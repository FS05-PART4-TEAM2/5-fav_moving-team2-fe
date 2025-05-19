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

type InputFieldProps<T extends FieldValues> = {
  name: Path<T> & PresetFieldName;
  override?: Partial<Omit<TextFieldProps, 'name'>>;
};

export default function InputField<T extends FieldValues>({ name, override = {} }: InputFieldProps<T>) {
  const { control, getValues } = useFormContext<T>();
  const [showPassword, setShowPassword] = useState(false);

  const preset = fieldPresets[name];
  if (!preset) throw new Error(`정의되지 않은 필드 이름: ${name}`);

  const isPasswordField = name === 'password' || name === 'passwordConfirm';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : preset.type;

  let resolvedRules = (preset.rules ?? {}) as RegisterOptions<T, Path<T>>;

  if (name === 'passwordConfirm' && typeof presetValidators.passwordConfirm === 'function') {
    const getPassword = () => getValues('password' as Path<T>);
    resolvedRules = {
      ...resolvedRules,
      validate: (value: string) => presetValidators.passwordConfirm(value, getPassword),
    };
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={resolvedRules}
      defaultValue={preset.defaultValue as T[typeof name]}
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
                [theme.breakpoints.up('md')]: {
                  fontSize: '20px',
                  lineHeight: '32px',
                },
              },
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
              ...override?.sx,
            })) as SxProps<Theme>
          }
          {...override}
        />
      )}
    />
  );
}
