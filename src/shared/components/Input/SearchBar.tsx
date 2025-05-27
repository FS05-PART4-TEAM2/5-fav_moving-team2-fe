'use client';

import { useState } from 'react';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { Stack, SxProps, SystemStyleObject, Theme, useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import Image from 'next/image';
import { typographyStyles } from '@/shared/styles/Typo/TypoStyles';
import { colorChips } from '@/shared/styles/colorChips';

interface SearchBarProps {
  isModal?: boolean;
  placeholder?: string;
  onSearch?: (text: string) => void;
}

export default function SearchBar({
  isModal = false,
  placeholder = '텍스트를 입력해 주세요.',
  onSearch,
}: SearchBarProps) {
  const [input, setInput] = useState('');
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const iconSize = isMd ? 24 : 36;
  const inputFont = (isMd ? typographyStyles.text_R_14 : typographyStyles.text_R_20) as SystemStyleObject<Theme>;

  const inputStyle: SxProps<Theme> = {
    '& .MuiInputBase-input': {
      ...inputFont,
      color: colorChips.black[400],
    },
    '& .MuiInputBase-input::placeholder': {
      color: colorChips.grayScale[400],
    },
  };

  const handleClear = () => setInput('');
  const handleSearch = () => {
    if (onSearch) onSearch(input.trim());
  };

  return (
    <TextField
      fullWidth
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleSearch();
      }}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{
        startAdornment: !isModal && (
          <InputAdornment position="start">
            <Image
              src="/assets/images/input-icon/search-36x36.svg"
              alt="검색 아이콘"
              width={iconSize}
              height={iconSize}
            />
          </InputAdornment>
        ),
        endAdornment: isModal && (
          <InputAdornment position="end">
            <Stack direction="row" gap={isMd ? '12px' : '16px'} alignItems="center">
              {input.length >= 0 && (
                <IconButton
                  onClick={handleClear}
                  size="small"
                  sx={{
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src="/assets/images/x-icon/x-circle-36x36.svg"
                    alt="지우기 아이콘"
                    width={iconSize}
                    height={iconSize}
                  />
                </IconButton>
              )}
              <IconButton
                onClick={handleSearch}
                size="small"
                sx={{
                  p: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  cursor: 'pointer',
                }}
              >
                <Image
                  src="/assets/images/input-icon/search-36x36.svg"
                  alt="검색 아이콘"
                  width={iconSize}
                  height={iconSize}
                />
              </IconButton>
            </Stack>
          </InputAdornment>
        ),
        sx: {
          backgroundColor: isModal ? colorChips.background['fafafa'] : colorChips.background['f7f7f7'],
          borderRadius: '16px',
          p: isMd ? '14px 16px' : '14px 24px',
          height: 48,
        },
      }}
      sx={inputStyle}
    />
  );
}
