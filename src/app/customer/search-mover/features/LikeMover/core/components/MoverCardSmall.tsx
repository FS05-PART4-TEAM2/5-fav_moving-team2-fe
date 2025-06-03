import { SearchMoverListItem } from '@/shared/types/types';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import Image from 'next/image';
import Chip from '@/shared/components/Chip/Chip';

export const MoverCardSmall = ({ data }: { data: SearchMoverListItem }) => {
  const router = useRouter();
  const moveType = data.serviceList?.[0] ?? 'SMALL_MOVE';
  const chipMoveType = moveType === 'SMALL_MOVE' ? 'small' : moveType === 'FAMILY_MOVE' ? 'home' : 'office';
  const hasProfileImage = data.profileImage !== null;
  const imgSrc = data.profileImage ?? '/assets/images/profile-icon/login-default-36x36.svg';
  const filledHeart = '/assets/images/like-icon/like-24x24-black.svg';
  const likeIconSrc = data.isLiked ? filledHeart : '/assets/images/like-icon/like-24x24-white.svg';
  const formattedTotalRating = data.totalRating.toFixed(1) ?? '0.0';

  // TODO :디테일 페이지 이동 확인
  const handleClickDetail = () => {
    router.push(`/customer/search-mover/${data.id}`);
  };

  return (
    <Stack sx={profileBoxSx} onClick={handleClickDetail}>
      <Stack sx={chipWrapperSx}>
        <Chip type={chipMoveType} isSmall={true} />
        {/* 지정요청일 경우 */}
        {data.isAssigned && <Chip type="select" isSmall={true} />}
      </Stack>
      <Typo content={data.intro} className="text_SB_14" color={colorChips.black[300]} />
      {/* 프로필카드 */}
      <Stack sx={profileBaseSx}>
        {/* 프로필이미지 */}
        <Image
          src={imgSrc}
          alt="profile image"
          width={46}
          height={46}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
            border: hasProfileImage ? `2px solid ${colorChips.primary[400]}` : 'none',
          }}
          priority
        />

        <Stack width="100%" direction="column" gap="8px" alignItems="flex-start">
          {/* 닉네임 & 좋아요 */}
          <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
            <Typo className="text_SB_14" content={`${data.nickName} 기사님`} color={colorChips.black[300]} />
            <Stack direction="row" alignItems="center" gap={{ xs: '2px', md: '4px' }}>
              <Image src={likeIconSrc} alt="like" width={20} height={20} />
              <Typo content={data.likeCount.toString()} className="text_M_13" color={colorChips.primary[400]} />
            </Stack>
          </Stack>

          {/* 부가정보 */}
          <Stack width="100%" direction="row" alignItems="center">
            {/* 리뷰 정보 */}
            <Stack direction="row" gap="2px">
              <Image src="/assets/images/star-icon/star-yellow-24x24.svg" alt="like icon" width={20} height={20} />
              <Typo content={formattedTotalRating} className="text_M_13" style={{ color: colorChips.black[300] }} />
              <Typo content={`(${data.reviewCounts})`} className="text_M_13" color={colorChips.grayScale[300]} />
            </Stack>
            <Stack sx={borderRightSx} />
            {/* 경력 정보 */}
            <Stack direction="row" gap={{ xs: '4px', md: '6px' }}>
              <Typo content="경력" className="text_M_13" color={colorChips.grayScale[300]} />
              <Typo content={`${data.career}년`} className="text_M_13" color={colorChips.black[300]} />
            </Stack>
            <Stack sx={borderRightSx} />
            {/* 확정 견적 개수 */}
            <Stack direction="row" gap={{ xs: '4px', md: '6px' }}>
              <Typo content={`${data.confirmedCounts}건`} className="text_M_13" color={colorChips.black[300]} />
              <Typo content="확정" className="text_M_13" color={colorChips.grayScale[300]} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const profileBoxSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: '14px',
  border: `0.5px solid ${colorChips.line.f2f2f2}`,
  borderRadius: '16px',
  padding: '16px 14px',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.03)',
  cursor: 'pointer',
};

const chipWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '8px',
};

const profileBaseSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '12px',
  border: `1px solid ${colorChips.line.f2f2f2}`,
  borderRadius: '6px',
  padding: '10px',
};

const borderRightSx = {
  width: '8px',
  height: '14px',
  borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
  marginRight: '8px',
};
