'use client';

import { Header } from '@/shared/components/Header/Header';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { OutlinedButton } from '@/shared/components/Button/OutlinedButton';
import { useRouter } from 'next/navigation';
import { Stack, useTheme, useMediaQuery } from '@mui/material';
import { PATH } from '@/shared/constants';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import Image from 'next/image';
import useUserStore from '@/shared/store/useUserStore';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const { userType } = useUserStore();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTemp = userType === 'temp';

  const landingText = '원하는 이사 서비스를 요청하고\n견적을 받아보세요';
  const authBtnWidth = isDesktop ? '340px' : '100%';
  const handleClickLogin = () => {
    router.push(PATH.customer.login);
  };
  const handleClickSignup = () => {
    router.push(PATH.customer.signup);
  };

  return (
    <Stack sx={{ minHeight: '100vh', width: '100%' }}>
      <Stack sx={headerContainerSx}>
        <Header />
      </Stack>

      <Stack sx={mainContainerSx}>
        <Stack sx={contentContainerSx}>
          <Typo
            content={landingText}
            className="landing_title"
            color={colorChips.black[500]}
            customStyle={{ textAlign: 'center', whiteSpace: 'pre-line' }}
          />

          <Stack width="100%" direction={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="center">
            {isDesktop ? (
              <Image src={'/assets/images/home-images/md-01.svg'} width={432} height={598} alt="소형이사" />
            ) : (
              <Image src={'/assets/images/home-images/sm-01.svg'} width={327} height={240} alt="소형이사" />
            )}
            <Stack direction="column">
              {isDesktop ? (
                <>
                  <Image src={'/assets/images/home-images/md-02.svg'} width={764} height={287} alt="가정이사" />
                  <Image
                    src={'/assets/images/home-images/md-03.svg'}
                    width={764}
                    height={287}
                    alt="기업, 사무실 이사"
                  />
                </>
              ) : (
                <>
                  <Image src={'/assets/images/home-images/sm-02.svg'} width={327} height={240} alt="가정이사" />
                  <Image
                    src={'/assets/images/home-images/sm-03.svg'}
                    width={327}
                    height={240}
                    alt="기업, 사무실 이사"
                  />
                </>
              )}
            </Stack>
          </Stack>

          {isTemp && (
            <Stack sx={authBtnWrapperSx}>
              <SolidButton width={authBtnWidth} text="로그인" onClick={handleClickLogin} borderRadius="50px" />
              <OutlinedButton width={authBtnWidth} text="회원가입" onClick={handleClickSignup} borderRadius="50px" />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

const headerContainerSx = {
  flexDirection: 'row',
  position: 'fixed',
  top: 0,
  zIndex: 99999,
  width: '100%',
  height: 'fit-content',
  justifyContent: 'center',
  backgroundColor: colorChips.grayScale[50],
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
};

const mainContainerSx = {
  flex: 1,
  width: '100%',
  marginTop: { xs: '55px', md: '89px' },
  overflowY: 'hidden',
  paddingX: '24px',
  backgroundColor: colorChips.background.f4f7fb,
};

const contentContainerSx = {
  height: '100%',
  width: '100%',
  maxWidth: { xs: '327px', md: '1448px' },
  margin: '0 auto',
  overflowY: 'scroll',
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: { xs: '44px', md: '48px' },
  paddingTop: { xs: '64px', md: '80px' },
  paddingBottom: { xs: '65px', md: '54px' },
};

const authBtnWrapperSx = {
  width: '100%',
  height: 'fit-content',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: 'center',
  justifyContent: 'center',
  gap: { xs: '8px', md: '16px' },
};
