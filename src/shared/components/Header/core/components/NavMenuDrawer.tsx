'use client';

import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { Drawer, Stack } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { UserType } from '@/shared/types/types';
import { HeaderNavMenu } from '../constants';
import Image from 'next/image';

interface NavItemProps {
  userType: UserType;
  isNavMenuOpen: boolean;
  onClose: () => void;
}

export const NavMenuDrawer = ({ userType, isNavMenuOpen, onClose }: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 보고있는 페이지 경로와 일치하는지 확인
  const isActiveRoute = (path: string) => {
    if (pathname === '/') {
      return true; // 랜딩페이지에서는 기본 black
    }
    return pathname?.startsWith(path) || false;
  };

  const handleClickNavItem = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Drawer anchor="right" open={isNavMenuOpen} onClose={onClose} sx={drawerSx}>
      <Stack direction="column">
        <Stack direction="row" sx={drawerHeaderSx}>
          <Image
            src={'/assets/images/x-icon/x-24x24.svg'}
            alt="close"
            width={24}
            height={24}
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </Stack>
        {HeaderNavMenu[userType as keyof typeof HeaderNavMenu].map((item) => (
          <Stack key={item.path} sx={{ padding: '24px 20px' }}>
            <Typo
              content={item.title}
              className="text_M_16"
              color={isActiveRoute(item.path) ? colorChips.black[400] : colorChips.grayScale[400]}
              customStyle={{ cursor: 'pointer' }}
              onClick={() => handleClickNavItem(item.path)}
            />
          </Stack>
        ))}
      </Stack>
    </Drawer>
  );
};

const drawerSx = {
  zIndex: 100000,
  '& .MuiDrawer-paper': {
    width: '220px',
    height: '100%',
    backgroundColor: colorChips.grayScale[50],
    right: 0,
    left: 'auto',
  },
};

const drawerHeaderSx = {
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '54px',
  padding: '15px 16px',
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
};
