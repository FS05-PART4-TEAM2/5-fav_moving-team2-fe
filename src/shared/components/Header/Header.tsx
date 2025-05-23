'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { HeaderLogo } from './core/components/HeaderLogo';
import { DesktopNavMenu } from './core/components/DesktopNavMenu';
import { NavMenuDrawer } from './core/components/NavMenuDrawer';
import Image from 'next/image';
import { HeaderAlarm } from './core/components/HeaderAlarm';
import { HeaderProfile } from './core/components/HeaderProfile';
import { PATH } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { Typo } from '@/shared/styles/Typo/Typo';
import useUserStore from '@/shared/store/useUserStore';

export const Header = () => {
  const router = useRouter();
  const theme = useTheme();
  const [openDropdown, setOpenDropdown] = useState<'alarm' | 'user' | null>(null);
  const [isNavMenuDrawerOpen, setIsNavMenuDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const userMenuIconSize = isDesktop ? 36 : 24;

  const { userType, userInfo } = useUserStore();
  const userName = userInfo?.username ?? '';
  const profileImg = userInfo?.profileImage ?? null;

  // 알림 / 프로필 드롭다운 토글(둘 중 하나만 열리도록)
  const handleDropdownToggle = (dropdown: 'alarm' | 'user') => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  const handleNavMenuDrawerOpen = () => {
    setOpenDropdown(null);
    setIsNavMenuDrawerOpen(true);
  };

  return (
    <Stack direction="row" sx={headerBgSx}>
      <Stack sx={headerContainerSx}>
        <Stack sx={navWrapperSx}>
          <HeaderLogo />
          {/* 데스크탑에서만 페이지 네비 아이템 보여줌 */}
          {isDesktop && <DesktopNavMenu userType={userType} />}
        </Stack>

        <Stack sx={userMenuSx}>
          {userType === 'temp' ? (
            isDesktop && (
              // 비회원 - 데스크탑에서 로그인버튼
              <Button
                sx={{
                  width: '116px',
                  height: '44px',
                  borderRadius: '16px',
                  padding: '16px',
                  backgroundColor: colorChips.primary[300],
                  '&:hover': {
                    backgroundColor: colorChips.primary[200],
                  },
                }}
                onClick={() => router.push(PATH.customer.login)}
              >
                <Typo content={'로그인'} className="text_SB_18" color={colorChips.grayScale[50]} textAlign={'center'} />
              </Button>
            )
          ) : (
            // 로그인 유저 - 알림 / 프로필 드롭다운
            <Stack sx={userMenuSx}>
              <HeaderAlarm
                isDesktop={isDesktop}
                userMenuIconSize={userMenuIconSize}
                openDropdown={openDropdown === 'alarm'}
                onToggle={() => handleDropdownToggle('alarm')}
              />
              <HeaderProfile
                userType={userType}
                isDesktop={isDesktop}
                profileImgSrc={profileImg}
                nickname={userName}
                userMenuIconSize={userMenuIconSize}
                openDropdown={openDropdown === 'user'}
                onToggle={() => handleDropdownToggle('user')}
              />
            </Stack>
          )}

          {/* 태블릿&모바일 - 메뉴 drawer : 비회원 / 로그인 유저 모두 공통 */}
          {!isDesktop && (
            <Image
              src={'/assets/images/menu-icon/menu-24x24.svg'}
              alt="close"
              width={userMenuIconSize}
              height={userMenuIconSize}
              onClick={handleNavMenuDrawerOpen}
              style={{ cursor: 'pointer' }}
              priority
            />
          )}
        </Stack>
      </Stack>

      {!isDesktop && isNavMenuDrawerOpen && (
        <NavMenuDrawer
          userType={userType}
          isNavMenuOpen={isNavMenuDrawerOpen}
          onClose={() => setIsNavMenuDrawerOpen(false)}
        />
      )}
    </Stack>
  );
};

const headerBgSx = {
  alignItems: 'center',
  width: '100%',
  maxWidth: '1448px',
  height: { xs: '54px', md: '88px' },
  padding: '0 24px',
  backgroundColor: colorChips.grayScale[50],
};

const headerContainerSx = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  width: '100%',
  maxWidth: '1400px',
};

const navWrapperSx = {
  width: 'fit-content',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '80px',
};

const userMenuSx = {
  width: 'fit-content',
  flexDirection: 'row',
  alignItems: 'center',
  gap: { xs: '24px', md: '32px' },
};
