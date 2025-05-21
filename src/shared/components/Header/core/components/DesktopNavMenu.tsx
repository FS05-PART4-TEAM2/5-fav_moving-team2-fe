'use client';

import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { Stack } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { UserType } from '@/shared/types/types';
import { HeaderNavMenu } from '../constants';
import { PATH } from '@/shared/constants';

interface NavItemProps {
  userType: UserType;
}

export const DesktopNavMenu = ({ userType }: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 보고있는 페이지 경로와 일치하는지 확인
  const isActiveRoute = (path: string) => {
    return pathname?.startsWith(path) || false;
  };

  return (
    <Stack direction="row" alignItems="center" gap="40px" width="fit-content">
      {userType === 'temp' ? (
        <Typo
          content={'기사님 찾기'}
          className="text_B_18"
          color={colorChips.black[400]}
          customStyle={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
          onClick={() => router.push(PATH.customer.searchMover)}
        />
      ) : (
        <>
          {HeaderNavMenu[userType as keyof typeof HeaderNavMenu].map((item) => (
            <Typo
              key={item.path}
              content={item.title}
              className="text_B_18"
              color={isActiveRoute(item.path) ? colorChips.black[400] : colorChips.grayScale[400]}
              customStyle={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              onClick={() => router.push(item.path)}
            />
          ))}
        </>
      )}
    </Stack>
  );
};
