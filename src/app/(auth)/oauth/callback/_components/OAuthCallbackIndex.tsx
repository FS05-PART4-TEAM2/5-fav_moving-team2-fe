'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { CircularProgress } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { keyframes } from '@emotion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useUserStore from '@/shared/store/useUserStore';
import { PATH } from '@/shared/constants';
import { OAuthProfile } from '@/shared/core/Auth/service';
import { GetCustomerProfileData, GetMoverProfileData } from '@/shared/types/types';
import customAxios from '@/lib/customAxios';

const blink = keyframes`
  0%   { opacity: 0; }
  33%  { opacity: 1; }
  66%  { opacity: 0; }
  100% { opacity: 0; }
`;

export default function OAuthCallbackIndex() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUserInfo, setCustomerData, setMoverData } = useUserStore();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const type = searchParams.get('type') as 'customer' | 'mover';

    if (!accessToken || !refreshToken || !type) {
      console.error('쿼리 파라미터 누락');
      return;
    }

    const refresh = async () => {
      await customAxios.post('/api/auth/refresh', {
        refreshToken,
      });
    };

    const OAuthLogin = async () => {
      try {
        await refresh();
        localStorage.setItem('accessToken', accessToken);
        if (process.env.NODE_ENV === 'development') {
          localStorage.setItem('refreshToken', refreshToken);
        }

        const res = await OAuthProfile(type);

        if (type === 'customer') {
          const user = res.data as GetCustomerProfileData;
          setUserInfo('customer', {
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profileImage: user.profileImage,
            isProfile: user.isProfile,
          });

          setCustomerData({
            wantService: user.wantService,
            livingPlace: user.livingPlace,
            hasQuotation: user.hasQuotation,
          });

          if (!user.isProfile) {
            router.push(PATH.customer.profile);
          } else if (!user.hasQuotation) {
            router.push(PATH.customer.movingQuoteRequest);
          } else {
            router.push(PATH.customer.movingQuoteHistory);
          }
        }

        if (type === 'mover') {
          const user = res.data as GetMoverProfileData;
          setUserInfo('mover', {
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profileImage: user.profileImage,
            isProfile: user.isProfile,
          });

          setMoverData({
            nickname: user.nickname,
            serviceArea: user.serviceArea,
            serviceList: user.serviceList,
            intro: user.intro,
            career: user.career,
            detailDescription: user.detailDescription,
            likeCount: user.likeCount,
            totalRating: user.totalRating,
            reviewCounts: user.reviewCounts,
            confirmQuotation: user.confirmQuotation,
          });

          if (!user.isProfile) {
            router.push(PATH.mover.profile);
          } else {
            router.push(PATH.mover.movingQuoteRequest);
          }
        }
      } catch (error) {
        console.error('유저 정보 처리 중 오류 발생:', error);
      }
    };

    OAuthLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
