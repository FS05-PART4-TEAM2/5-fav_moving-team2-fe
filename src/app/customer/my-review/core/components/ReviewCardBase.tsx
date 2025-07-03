import { colorChips } from '@/shared/styles/colorChips';
import { Stack, Rating } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { MovingType } from '@/shared/types/types';
import Image from 'next/image';
import { formatToFullDate, formattedPrice } from '@/shared/utils/dataFormatter';
import Chip from '@/shared/components/Chip/Chip';

interface ReviewCardBaseProps {
  nickname: string;
  profileImage: string | null;
  moveDate: string;
  moveType: MovingType;
  price: string;
  isAssigned: boolean;
  reviewDate?: string;
  rating?: number;
}

export const ReviewCardBase = ({
  nickname,
  profileImage,
  moveDate,
  moveType,
  price,
  isAssigned,
  reviewDate,
  rating,
}: ReviewCardBaseProps) => {
  const hasProfileImage = profileImage !== null;
  const imgSrc = hasProfileImage ? profileImage : '/assets/images/profile-icon/login-default-36x36.svg';
  const formattedPriceText = formattedPrice(Number(price));
  const formattedMoveDate = formatToFullDate(moveDate);
  const formattedReviewDate = reviewDate ? `작성일 ${formatToFullDate(reviewDate)}` : '';

  return (
    <Stack sx={contentWrapperSx}>
      <Stack sx={headerWrapperSx}>
        <Stack sx={chipWrapperSx}>
          <Chip type={moveType} />
          {/* 지정요청일 경우 */}
          {isAssigned && <Chip type="select" />}
        </Stack>
        {/* 작성일 */}
        {reviewDate && (
          <Stack flexShrink={0} display={{ xs: 'none', md: 'block' }}>
            <Typo content={formattedReviewDate} className="text_R_18" color={colorChips.grayScale[300]} />
          </Stack>
        )}
      </Stack>
      <Stack sx={profileBaseSx}>
        <Stack sx={profileImageSx}>
          {/* 프로필이미지 */}
          <Image
            src={imgSrc}
            alt="profile image"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '46px', // 기본 모바일 사이즈
              height: '46px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: hasProfileImage ? `2px solid ${colorChips.primary[400]}` : 'none',
            }}
            priority
            unoptimized
          />
        </Stack>
        {/* 닉네임 & 견적정보 & (별점) */}
        <Stack width="100%" height="100%" direction="column" gap="16px" alignItems="flex-start">
          <Stack
            width="100%"
            height="100%"
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            gap={{ xs: '6px', md: '10px' }}
          >
            {/* 닉네임 */}
            <Typo className="text_SB_14to24" content={`${nickname} 기사님`} color={colorChips.black[300]} />
            {/* 견적정보 */}
            <Stack width="100%" direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" gap={{ xs: '6px', md: '12px' }}>
                <Typo content={'이사일'} className="text_M_14to20" color={colorChips.grayScale[500]} />
                <Typo content={formattedMoveDate} className="text_M_14to20" style={{ color: colorChips.black[400] }} />
              </Stack>
              <Stack sx={borderRightSx} />
              <Stack direction="row" alignItems="center" gap={{ xs: '6px', md: '12px' }}>
                <Typo content={'견적가'} className="text_M_14to20" color={colorChips.grayScale[500]} />
                <Typo content={formattedPriceText} className="text_M_14to20" style={{ color: colorChips.black[400] }} />
              </Stack>
            </Stack>
          </Stack>
          {/* 별점 */}
          {rating && (
            <Stack display={{ xs: 'none', md: 'block' }}>
              <Rating
                name="review-read-only"
                value={rating}
                precision={0.1}
                readOnly
                icon={<StarIcon filled={true} />}
                emptyIcon={<StarIcon filled={false} />}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

// 커스텀 별 아이콘 컴포넌트
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <Image
    src={filled ? `/assets/images/star-icon/star-yellow-24x24.svg` : `/assets/images/star-icon/star-gray-24x24.svg`}
    alt="star"
    width={24}
    height={24}
  />
);

const contentWrapperSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  gap: { xs: '10px', md: '24px' },
};

const headerWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
};

const chipWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: { xs: '8px', md: '12px' },
};

const profileBaseSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: { xs: '16px', md: '24px' },
  border: { xs: 'none', md: `1px solid ${colorChips.line.f2f2f2}` },
  borderRadius: '6px',
  padding: { xs: '10px 0px', md: '16px 18px' },
};

const profileImageSx = {
  '& img': {
    width: '46px',
    height: '46px',
    // 데스크탑에서 프로필 이미지 크기 조정
    '@media (min-width: 1200px)': {
      width: '96px !important',
      height: '96px !important',
    },
  },
};

const borderRightSx = {
  width: { xs: '12.5px', md: '16px' },
  height: '14px',
  borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
  marginRight: { xs: '12.5px', md: '16px' },
};
