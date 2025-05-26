'use client';

import { Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Typo } from '@/shared/styles/Typo/Typo';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';

interface AuthHeaderProps {
  mode: 'login' | 'signup';
  userType: 'customer' | 'mover';
}

export default function AuthHeader({ mode, userType }: AuthHeaderProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const isLogin = mode === 'login';
  const isCustomer = userType === 'customer';

  const logoW = isMd ? 112 : 140;
  const logoH = isMd ? 64 : 80;
  const siteLoginPath = isCustomer ? PATH.mover.login : PATH.customer.login;
  const siteSignupPath = isCustomer ? PATH.mover.signup : PATH.customer.signup;
  const siteText = isCustomer ? '기사님 전용 페이지' : '일반 유저 전용 페이지';

  return (
    <Stack spacing={2} alignItems="center">
      <Image
        src="/assets/images/logo-icon/logo-text-01.svg"
        alt="logo"
        width={logoW}
        height={logoH}
        style={{ cursor: 'pointer' }}
        onClick={() => router.push('/')}
      />

      <Stack direction="row" gap={isMd ? '4px' : '8px'}>
        <Typo
          className={isMd ? 'text_R_14' : 'text_R_20'}
          style={{ color: isMd ? colorChips.black[100] : colorChips.black[200] }}
        >
          {isCustomer ? '기사님이신가요?' : '일반 유저라면?'}
        </Typo>
        <Typo
          className={isMd ? 'text_SB_12' : 'text_SB_20'}
          onClick={() => router.push(`${isLogin ? siteLoginPath : siteSignupPath}`)}
          style={{ color: colorChips.primary[300], textDecoration: 'underline', cursor: 'pointer' }}
        >
          {siteText}
        </Typo>
      </Stack>
    </Stack>
  );
}
