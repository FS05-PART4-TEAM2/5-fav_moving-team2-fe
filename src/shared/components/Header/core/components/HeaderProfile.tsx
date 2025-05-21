import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import Image from 'next/image';

interface HeaderProfileProps {
  isDesktop: boolean;
  profileImgSrc: string | null;
  nickname: string;
  userMenuIconSize: number;
  onToggle: () => void;
}

// TODO: 드롭다운 추가
export const HeaderProfile = ({
  isDesktop,
  profileImgSrc,
  nickname,
  userMenuIconSize,
  onToggle,
}: HeaderProfileProps) => {
  const imgSrc = profileImgSrc || '/assets/images/profile-icon/login-default-36x36.svg';
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Image
        src={imgSrc}
        alt="close"
        width={userMenuIconSize}
        height={userMenuIconSize}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
        priority
      />
      {isDesktop && <Typo content={nickname} className="text_M_18" color={colorChips.black[400]} />}
    </Stack>
  );
};
