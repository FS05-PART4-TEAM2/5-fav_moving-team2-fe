import { SolidButton } from '@/shared/components/Button/SolidButton';
import { colorChips } from '@/shared/styles/colorChips';
import { Stack } from '@mui/material';
import Image from 'next/image';

interface MobileWidgetsFeatureProps {
  nickname: string;
  isAssigned: boolean;
  likeIconSrc: string;
  handleLikeClick: () => void;
  handleAssignRequest: () => void;
}

export const MobileWidgetsFeature = ({
  isAssigned,
  likeIconSrc,
  handleLikeClick,
  handleAssignRequest,
}: MobileWidgetsFeatureProps) => {
  return (
    <Stack sx={mobileButtonWrapperSx}>
      <Stack
        sx={{
          ...likeButtonSx,
          cursor: 'pointer',
          opacity: 1,
        }}
        onClick={handleLikeClick}
      >
        <Image src={likeIconSrc} alt="like" width={24} height={24} />
      </Stack>
      <SolidButton text={'지정 견적 요청하기'} onClick={handleAssignRequest} disabled={isAssigned} />
    </Stack>
  );
};

const mobileButtonWrapperSx = {
  position: 'fixed',
  bottom: '0',
  width: 'calc(100% - 48px)',
  height: '74px',
  paddingY: '10px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: colorChips.grayScale[50],
  display: { xs: 'flex', md: 'none' }, // 모바일에서만 표시
};

const likeButtonSx = {
  flexShrink: 0,
  width: '54px',
  height: '54px',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colorChips.grayScale[50],
  borderRadius: '16px',
  border: `1px solid ${colorChips.line.e6e6e6}`,
  cursor: 'pointer',
};
