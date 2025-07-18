import { ProfileDrowndownMenu } from '@/shared/components/Header/core/constants';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { UserType } from '@/shared/types/types';
import { Collapse, Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from '@/shared/core/Auth/service';
import useUserStore from '@/shared/store/useUserStore';
import { removeQueryKeys } from '@/shared/utils/invalidateQueryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchMoverStore } from '@/app/customer/search-mover/core/hooks/useSearchMoverStore';

interface HeaderProfileProps {
  isDesktop: boolean;
  userType: UserType;
  profileImgSrc: string | null;
  nickname: string;
  userMenuIconSize: number;
  openDropdown: boolean;
  onToggle: () => void;
}

export const HeaderProfile = ({
  isDesktop,
  userType,
  profileImgSrc,
  nickname,
  userMenuIconSize,
  openDropdown,
  onToggle,
}: HeaderProfileProps) => {
  const queryClient = useQueryClient();
  const { logout: clearUserStore } = useUserStore();
  const { reset: resetSearchMoverStore } = useSearchMoverStore();
  const router = useRouter();
  const hasProfileImg = profileImgSrc !== null;
  const imgSrc = hasProfileImg ? profileImgSrc : '/assets/images/profile-icon/login-default-36x36.svg';
  const userTitle = `${nickname} 고객님`;

  const handleClickMenu = (path: string) => {
    onToggle();
    router.push(path);
  };

  const handleClickLogout = async () => {
    const res = await logout();
    if (res.success) {
      clearUserStore(); // 유저스토어 초기화
      removeQueryKeys(queryClient); // 캐시 무효화(기사님 데이터)
      resetSearchMoverStore(); // 기사님 검색필터 초기화
      router.push('/'); // 로그아웃 후 랜딩페이지로 이동
    } else {
      alert('다시 시도해주세요.');
    }
    onToggle();
  };

  if (userType === 'temp') {
    return null;
  }

  return (
    <Stack sx={headerUserStyle} onClick={onToggle}>
      <Stack direction="row" sx={{ cursor: 'pointer', alignItems: 'center', gap: '16px' }}>
        <Image
          src={imgSrc}
          alt="profile"
          width={userMenuIconSize}
          height={userMenuIconSize}
          onClick={onToggle}
          style={{
            cursor: 'pointer',
            borderRadius: '50%',
            objectFit: 'cover',
            border: hasProfileImg ? `2px solid ${colorChips.primary[400]}` : 'none',
          }}
          priority
          unoptimized
        />
        {isDesktop && <Typo content={nickname} className="text_M_18" color={colorChips.black[400]} />}
      </Stack>

      <Collapse in={openDropdown} sx={CollapseSx}>
        {/* 00고객님 */}
        <Typo
          className={isDesktop ? 'text_B_18' : 'text_B_16'}
          content={userTitle}
          color={colorChips.black[400]}
          customStyle={{ padding: isDesktop ? '14px 24px' : '8px 12px' }}
        />
        {/* 메뉴 */}
        <Stack direction="column">
          {ProfileDrowndownMenu[userType as keyof typeof ProfileDrowndownMenu].map((menu) => (
            <Typo
              key={menu.title}
              className={isDesktop ? 'text_M_16' : 'text_M_14'}
              content={menu.title}
              color={colorChips.black[400]}
              customStyle={{
                cursor: 'pointer',
                padding: isDesktop ? '14px 24px' : '8px 12px',
              }}
              onClick={() => handleClickMenu(menu.path)}
            />
          ))}
        </Stack>
        {/* 로그아웃 */}
        <Typo
          className={isDesktop ? 'text_M_14' : 'text_R_12'}
          content={'로그아웃'}
          color={colorChips.grayScale[500]}
          textAlign="center"
          customStyle={{
            cursor: 'pointer',
            padding: isDesktop ? '14px 12px 8px' : '12px 12px 8px',
            borderTop: `1px solid ${colorChips.line.f2f2f2}`,
            marginTop: isDesktop ? '6px' : '8px',
          }}
          onClick={handleClickLogout}
        />
      </Collapse>
    </Stack>
  );
};

const headerUserStyle = {
  width: 'fit-content',
  height: 'fit-content',
  position: 'relative',
};

const CollapseSx = {
  position: 'absolute',
  width: { xs: '152px', md: '248px' },
  top: { xs: '30px', md: '50px' },
  right: { xs: '-48px', md: '-10px' },
  zIndex: 1000,
  borderRadius: '16px',
  bgcolor: colorChips.grayScale[50],
  border: `1px solid ${colorChips.line.e6e6e6}`,
  boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
  padding: { xs: '10px 6px 6px', md: '16px 4px 6px' },
};
