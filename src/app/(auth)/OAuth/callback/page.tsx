'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { CircularProgress } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const blink = keyframes`
  0%   { opacity: 0; }
  33%  { opacity: 1; }
  66%  { opacity: 0; }
  100% { opacity: 0; }
`;

export default function OAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: 유저 정보 저장하는 로직 & 일반 로그인 처럼 로직 구현
    const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
    localStorage.removeItem('redirectAfterLogin');
    router.replace(redirectPath);
  }, [router]);

  return (
    <Stack width="100vw" height="100vh" justifyContent="center" alignItems="center" gap="16px">
      <CircularProgress size={64} thickness={5} />
      <Typo className="text_M_20" color={colorChips.grayScale[300]}>
        로그인 중 입니다
        <Box
          component="span"
          sx={{
            animation: `${blink} 1.4s infinite`,
            animationDelay: '0s',
            display: 'inline-block',
            ml: '4px',
          }}
        >
          .
        </Box>
        <Box
          component="span"
          sx={{
            animation: `${blink} 1.4s infinite`,
            animationDelay: '0.2s',
            display: 'inline-block',
            ml: '4px',
          }}
        >
          .
        </Box>
        <Box
          component="span"
          sx={{
            animation: `${blink} 1.4s infinite`,
            animationDelay: '0.4s',
            display: 'inline-block',
            ml: '4px',
          }}
        >
          .
        </Box>
      </Typo>
    </Stack>
  );
}
