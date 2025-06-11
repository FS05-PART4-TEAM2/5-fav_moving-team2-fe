import { LikeMoverListItem } from '@/shared/types/types';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import Chip from '@/shared/components/Chip/Chip';

export const LikeMoverCard = ({ data }: { data: LikeMoverListItem }) => {
  const router = useRouter();
  // 서비스 여러개인 경우 1개만 보여줌
  const moveType = data.serviceList?.[0] ?? 'SMALL_MOVE';
  const profileBaseProps = {
    nickname: data.nickName ?? '',
    profileImage: data.profileImage ?? '',
    totalRating: data.totalRating,
    reviewCounts: data.reviewCounts,
    career: data.career,
    confirmedQuotationCount: data.confirmedCounts,
    likeCount: data.likeCount,
    isLiked: data.isLiked,
    likeColor: 'pink' as const,
  };

  const handleClickDetail = () => {
    router.push(`/customer/search-mover/${data.id}`);
  };

  return (
    <Stack sx={profileBoxSx} onClick={handleClickDetail}>
      <Stack sx={chipWrapperSx}>
        <Chip type={moveType} />
      </Stack>
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
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.03)',
  cursor: 'pointer',
};

const chipWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: { xs: '8px', md: '12px' },
};
