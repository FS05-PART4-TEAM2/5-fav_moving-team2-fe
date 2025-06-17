'use client';

import { Stack } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import Chip from '@/shared/components/Chip/Chip';
import { useMoverDetailData } from '../../../core/hooks/useMoverDetailData';

export const ProfileSection = ({ moverId }: { moverId: string }) => {
  const { data } = useMoverDetailData(moverId);
  if (!data) return null;

  const isAssigned = data.isAssigned;
  const profileBaseProps = {
    nickname: data.nickname,
    profileImage: data.profileImage,
    totalRating: data.totalRating,
    reviewCounts: data.reviewCounts,
    career: data.career,
    confirmedQuotationCount: data.confirmedCounts,
    likeCount: data.likeCount,
    isLiked: data.isLiked,
  };

  return (
    <Stack sx={profileBoxSx}>
      <Stack sx={chipWrapperSx}>
        <Chip type={data.serviceList?.[0] ?? 'SMALL_MOVE'} />
        {/* 지정요청한 이력 있는 경우 */}
        {isAssigned && <Chip type="select" />}
      </Stack>
      <Typo content={data.intro} className="text_SB_14to24" color={colorChips.black[300]} />
      <MoverProfileBase {...profileBaseProps} />
    </Stack>
  );
};

const profileBoxSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '14px', md: '16px' },
  border: `0.5px solid ${colorChips.line.f2f2f2}`,
  borderRadius: '16px',
  padding: { xs: '16px 14px', md: '20px 24px' },
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.05)',
};

const chipWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: { xs: '8px', md: '12px' },
};
