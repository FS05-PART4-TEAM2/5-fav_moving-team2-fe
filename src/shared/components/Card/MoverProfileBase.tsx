import { Stack } from '@mui/material';
import Image from 'next/image';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

interface MoverProfileBaseProps {
  nickname: string;
  profileImage: string | null;
  totalRating: number; // 총 평점
  reviewCounts: number; // 리뷰 개수
  career: number; // 경력
  confirmedQuotationCount: number; // 확정 견적 개수
  likeCount: number; // 좋아요 개수
  isLiked: boolean; // 좋아요 여부
  likeColor?: 'black' | 'pink';
}

// TODO: 프로필 클릭했을 때 기사 상세페이지 이동 넣을지 말지 고민
/**
 * 카드 컴포넌트 베이스 - 기사 프로필 정보 표시
 * @description 기사님 찾기, 기사님 상세, 대기중견적, 견적 상세, 받았던견적, 찜한기사님... 에서 사용
 */
export function MoverProfileBase({
  nickname,
  profileImage,
  totalRating,
  reviewCounts,
  career,
  confirmedQuotationCount,
  likeCount,
  isLiked,
  likeColor = 'black',
}: MoverProfileBaseProps) {
  const hasProfileImage = profileImage !== null;
  const imgSrc = hasProfileImage ? profileImage : '/assets/images/profile-icon/login-default-36x36.svg';
  const filledHeart =
    likeColor === 'black'
      ? '/assets/images/like-icon/like-24x24-black.svg'
      : '/assets/images/like-icon/like-24x24-pink.svg';
  const likeIconSrc = isLiked ? filledHeart : '/assets/images/like-icon/like-24x24-white.svg';
  const formattedTotalRating = totalRating?.toFixed(1) ?? '0.0';

  return (
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
        />
      </Stack>

      <Stack width="100%" direction="column" gap="8px" alignItems="flex-start">
        {/* 닉네임 & 좋아요 */}
        <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
          <Typo className="text_SB_14to18" content={`${nickname} 기사님`} color={colorChips.black[300]} />
          <Stack direction="row" alignItems="center" gap={{ xs: '2px', md: '4px' }}>
            <Image src={likeIconSrc} alt="like" width={24} height={24} />
            <Typo content={likeCount.toString()} className="text_M_14to18" color={colorChips.primary[400]} />
          </Stack>
        </Stack>

        {/* 부가정보 */}
        <Stack width="100%" direction="row" alignItems="center">
          {/* 리뷰 정보 */}
          <Stack direction="row" gap={{ xs: '2px', md: '6px' }}>
            <Stack
              position="relative"
              sx={{
                width: {
                  xs: '20px',
                  md: '24px',
                },
              }}
            >
              <Image
                src="/assets/images/star-icon/star-yellow-24x24.svg"
                alt="like icon"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Stack>
            <Typo content={formattedTotalRating} className="text_M_13to16" style={{ color: colorChips.black[300] }} />
            <Typo content={`(${reviewCounts})`} className="text_M_13to16" color={colorChips.grayScale[300]} />
          </Stack>
          <Stack sx={borderRightSx} />
          {/* 경력 정보 */}
          <Stack direction="row" gap={{ xs: '4px', md: '6px' }}>
            <Typo content="경력" className="text_M_13to16" color={colorChips.grayScale[300]} />
            <Typo content={`${career}년`} className="text_M_13to16" color={colorChips.black[300]} />
          </Stack>
          <Stack sx={borderRightSx} />
          {/* 확정 견적 개수 */}
          <Stack direction="row" gap={{ xs: '4px', md: '6px' }}>
            <Typo content={`${confirmedQuotationCount}건`} className="text_M_13to16" color={colorChips.black[300]} />
            <Typo content="확정" className="text_M_13to16" color={colorChips.grayScale[300]} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

const profileBaseSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: { xs: '12px', md: '24px' },
  border: `1px solid ${colorChips.line.f2f2f2}`,
  borderRadius: '6px',
  padding: { xs: '16px 10px', md: '16px 18px' },
};

const profileImageSx = {
  '& img': {
    width: '46px',
    height: '46px',
    // 데스크탑에서 프로필 이미지 크기 조정
    '@media (min-width: 1200px)': {
      width: '56px !important',
      height: '56px !important',
    },
  },
};

const borderRightSx = {
  width: { xs: '8px', md: '16px' },
  height: '14px',
  borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
  marginRight: { xs: '8px', md: '16px' },
};
