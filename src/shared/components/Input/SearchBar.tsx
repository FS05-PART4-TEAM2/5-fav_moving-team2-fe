'use client';

import { useState } from 'react';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { Stack, SxProps, Theme, useMediaQuery } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@/shared/theme';
import Image from 'next/image';
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
  const closeIconSize = isMd ? 20 : 28;

  const inputStyle: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
      p: { xs: '14px 16px', md: '14px 24px' },
      height: { xs: '52px', md: '64px' },
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputBase-input': {
      p: 0,
      fontFamily: 'pretendard',
      fontSize: { xs: '14px', md: '20px' },
      fontWeight: 400,
      color: colorChips.black[400],
      '&::placeholder': {
        color: colorChips.grayScale[400],
        opacity: 1,
      },
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
            <Image src="/assets/images/input-icon/search-36x36.svg" alt="search" width={iconSize} height={iconSize} />
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
                      backgroundColor: colorChips.background.f7f7f7,
                    },
                    cursor: 'pointer',
                  }}
                >
                  <CloseIcon
                    sx={{
                      width: closeIconSize,
                      height: closeIconSize,
                      color: colorChips.grayScale[200],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
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
                  alt="search"
                  width={iconSize}
                  height={iconSize}
                />
              </IconButton>
            </Stack>
          </InputAdornment>
        ),
        sx: {
          backgroundColor: isModal ? colorChips.background['fafafa'] : colorChips.background['f7f7f7'],
          border: 'none',
          borderRadius: '16px',
        },
      }}
      sx={inputStyle}
    />
  );
}
