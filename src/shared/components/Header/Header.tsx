'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { HeaderLogo } from './core/components/HeaderLogo';
import { DesktopNavMenu } from './core/components/DesktopNavMenu';
import { UserType } from '@/shared/types/types';
import { NavMenuDrawer } from './core/components/NavMenuDrawer';
import Image from 'next/image';
import { HeaderAlarm } from './core/components/HeaderAlarm';
import { HeaderProfile } from './core/components/HeaderProfile';

export const Header = () => {
  const theme = useTheme();
  const [openDropdown, setOpenDropdown] = useState<'alarm' | 'user' | null>(null);
  const [isNavMenuDrawerOpen, setIsNavMenuDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const userMenuIconSize = isDesktop ? 36 : 24;

  // TODO: 여기 api 연결하고 스토어에서 데이터 가져올것
  // TODO: temp유저, 랜딩페이지 내비메뉴, 로그인 버튼 수정하기
  let tempUserType = 'mover';
  let tempUserNickname = '2팀짱';
  let tempProfileImg = null;

  // 알림 / 프로필 드롭다운 토글(둘 중 하나만 열리도록)
  const handleDropdownToggle = (dropdown: 'alarm' | 'user') => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    // TODO: 아직 드롭다운 컴포넌트 추가해야됨
  };
  const handleNavMenuDrawerOpen = () => {
    setIsNavMenuDrawerOpen(true);
  };

  return (
    <Stack direction="row" sx={headerBgSx}>
      <Stack sx={headerContainerSx}>
        <Stack sx={navWrapperSx}>
          <HeaderLogo />
          {/* 데스크탑에서만 페이지 네비 아이템 보여줌 */}
          {isDesktop && <DesktopNavMenu userType={tempUserType as UserType} />}
        </Stack>

        <Stack sx={userMenuSx}>
          <HeaderAlarm userMenuIconSize={userMenuIconSize} onToggle={() => handleDropdownToggle('alarm')} />
          <HeaderProfile
            isDesktop={isDesktop}
            profileImgSrc={tempProfileImg}
            nickname={tempUserNickname}
            userMenuIconSize={userMenuIconSize}
            onToggle={() => handleDropdownToggle('user')}
          />
          {/* 태블릿&모바일 - 네비 메뉴 drawer 열림 */}
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
      {isNavMenuDrawerOpen && (
        <NavMenuDrawer
          userType={tempUserType as UserType}
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
