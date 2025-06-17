'use client';

import { ChangeEvent } from 'react';
import { TextField, TextFieldProps, SxProps, Theme } from '@mui/material';

interface TextareaProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'multiline'> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  maxLength?: number;
}

export default function Textarea({
  value,
  onChange,
  error = false,
  helperText,
  placeholder = '내용을 입력해 주세요',
  maxLength = 500,
  ...rest
}: TextareaProps) {
  return (
    <TextField
      multiline
      fullWidth
      minRows={4}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText || `${value.length}/${maxLength}`}
      placeholder={placeholder}
      inputProps={{ maxLength }}
      variant="outlined"
      sx={
        ((theme) => ({
          mt: 2,
          '& .MuiInputBase-root': {
            borderRadius: '16px',
            fontFamily: 'pretendard',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '26px',
            padding: '12px',
            [theme.breakpoints.up('md')]: {
              fontSize: '20px',
              lineHeight: '32px',
            },
          },
          '& .MuiInputBase-inputMultiline': {
            padding: 0,
          },
          '& .MuiFormHelperText-root': {
            textAlign: 'right',
            fontFamily: 'pretendard',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '22px',
            mt: '4px',
            color: error ? theme.palette.error.main : undefined,
            [theme.breakpoints.up('md')]: {
              fontSize: '16px',
              lineHeight: '26px',
            },
          },
        })) as SxProps<Theme>
      }
      {...rest}
    />
  );
}
