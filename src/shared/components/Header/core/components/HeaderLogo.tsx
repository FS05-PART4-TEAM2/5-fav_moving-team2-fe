'use client';

import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// 데스크탑 / 태블릿&모바일 - 로고 사이즈 다름
// 태블릿&모바일 : 디폴트 - 텍스트 x / 랜딩페이지 - 텍스트 o

export const HeaderLogo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLanding = pathname === '/';

  const hideLogoText = !isLanding && isMobile; // 랜딩페이지가 아닐때, 모바일에서만 텍스트 숨김
  const handleClickLogo = () => router.push('/');

  // 사이즈는 태블릿부터 작아짐
  const logoImgSrc = isTablet ? '/assets/images/logo-icon/logo-img-01.svg' : '/assets/images/logo-icon/logo-img-02.svg';
  const logoTextSrc = isTablet
    ? '/assets/images/logo-icon/logo-text-01.svg'
    : '/assets/images/logo-icon/logo-text-02.svg';
  const logoImgWidth = isTablet ? 30 : 40;
  const logoImgHeight = isTablet ? 34 : 44;
  const logoTextWidth = isTablet ? 52 : 68;
  const logoTextHeight = isTablet ? 32 : 40;

  return (
    <Stack
      direction="row"
      onClick={handleClickLogo}
      sx={{
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'fit-content',
        gap: { xs: '6px', md: '8px' },
      }}
    >
      <Image src={logoImgSrc} width={logoImgWidth} height={logoImgHeight} alt="Moving logo" priority />
      {!hideLogoText && (
        <Image src={logoTextSrc} width={logoTextWidth} height={logoTextHeight} alt="Moving logo" priority />
      )}
    </Stack>
  );
};
