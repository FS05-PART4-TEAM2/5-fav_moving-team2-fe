import { SearchMoverListItem } from '@/shared/types/types';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import Chip from '@/shared/components/Chip/Chip';

export const MoverCard = ({ data }: { data: SearchMoverListItem }) => {
  const router = useRouter();
  // 서비스 여러개인 경우 1개만 보여줌
  const moveType = data.serviceList?.[0] ?? 'SMALL_MOVE';
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

  const handleClickDetail = () => {
    router.push(`/customer/search-mover/${data.id}`);
  };

  return (
    <Stack sx={profileBoxSx} onClick={handleClickDetail}>
      <Stack sx={chipWrapperSx}>
        <Chip type={moveType} />
        {/* 지정요청일 경우 */}
        {data.isAssigned && <Chip type="select" />}
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
