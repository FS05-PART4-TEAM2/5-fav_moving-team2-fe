'use client';

import { ShareButtons } from '@/shared/components/Button/ShareButtons';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import { formattedPrice, formatToFullDateWithTime, formatToYYMMDD } from '@/shared/utils/dataFormatter';
import { QuoteDetailCard } from '../core/components/QuoteDetailCard';
import Chip from '@/shared/components/Chip/Chip';
import Image from 'next/image';
import { ToastPopup } from '@/shared/components/Popup/ToastPopup';
import { useOfferDetailData } from './core/hooks/useOfferDetailData';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { useQuoteConfirm } from '../core/hooks/useQuoteConfirm';
import { useCustomerLikeMover } from '@/shared/hooks/useCustomerLikeMover';
import { PATH } from '@/shared/constants';

export default function Page() {
  const params = useParams();
  const offerId = params.offerId as string;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { data, isLoading } = useOfferDetailData(offerId);
  const { handleConfirm } = useQuoteConfirm(offerId);
  // 찜하기 훅
  const { isLiked, likeCount, handleLikeClick } = useCustomerLikeMover({
    initialStatus: data?.offers[0].isLiked || false,
    initialLikeCount: data?.offers[0].likeCount || 0,
    moverId: data?.offers[0].moverId || '',
  });

  // 로딩 중일 때
  if (isLoading) {
    return (
      <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress size={40} />
      </Stack>
    );
  }

  if (!data) return null;

  const moverId = data.offers[0].moverId;
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${PATH.customer.searchMoverDetail(moverId)}`;
  const toastMsg = '확정하지 않은 견적이에요!';
  const isPending = !data.offers[0].isCompleted; // isCompleted가 false인 경우 : 대기중인 견적
  const isConfirmed = data.offers[0].isConfirmedMover; // 확정견적
  const isAssigned = data.offers[0].isAssigned; // 지정요청
  const moveType =
    data.moveType === 'SMALL_MOVE' ? '소형이사' : data.moveType === 'FAMILY_MOVE' ? '가정이사' : '사무실이사';
  const profileBaseProps = {
    nickname: data.offers[0].moverNickname,
    profileImage: data.offers[0].moverProfileImageUrl,
    totalRating: data.offers[0].totalRating,
    reviewCounts: data.offers[0].reviewCounts,
    career: data.offers[0].career,
    confirmedQuotationCount: data.offers[0].confirmedQuotationCount,
    likeCount: likeCount,
    isLiked: isLiked,
  };
  const quoteData = [
    { label: '견적 요청일', value: formatToYYMMDD(data.requestedAt) },
    { label: '서비스', value: moveType },
    { label: '이용일', value: formatToFullDateWithTime(data.moveDate) },
    { label: '출발지', value: data.startAddress },
    { label: '도착지', value: data.endAddress },
  ];
  const likeIconSrc = isLiked
    ? '/assets/images/like-icon/like-24x24-black.svg'
    : '/assets/images/like-icon/like-24x24-white.svg';

  return (
    <>
      <Stack sx={contentContainerSx}>
        <Stack width="100%" direction="column">
          <Stack sx={profileBoxSx}>
            <Stack sx={chipWrapperSx}>
              {/* 확정견적인 경우 */}
              {isConfirmed && <Chip type="confirmed" />}
              <Chip type={data.moveType} />
              {/* 지정요청일 경우 */}
              {isAssigned && <Chip type="select" />}
            </Stack>
            <Typo content={data.offers[0].intro} className="text_SB_14to24" color={colorChips.black[300]} />
            <MoverProfileBase {...profileBaseProps} />
          </Stack>
          <Stack sx={dividerSx} />

          <Stack sx={priceWrapperSx}>
            <Typo content="견적가" className="text_SB_16to24" color={colorChips.black[400]} />
            <Typo
              content={formattedPrice(Number(data.offers[0].price))}
              className="text_B_20to32"
              color={colorChips.black[400]}
            />
          </Stack>
          <Stack sx={dividerSx} />

          {!isDesktop && (
            <>
              {/* 데스크탑 아닐때는 공유버튼 여기 */}
              <ShareButtons title="기사님 공유하기" shareCategory="url" shareUrl={shareUrl} isDesktop={isDesktop} />
              <Stack sx={dividerSx} />
            </>
          )}

          <QuoteDetailCard quoteData={quoteData} />
          {!isPending && !isConfirmed && (
            // 받았던 견적(대기중x) && 확정x
            <Stack width="100%" paddingTop={{ xs: '8px', md: '22px' }}>
              <ToastPopup message={toastMsg} isOpen={true} onClose={() => {}} />
            </Stack>
          )}
        </Stack>

        {/* 데스크탑 */}
        {isDesktop && (
          <Stack flexShrink={0} width="330px" direction="column" gap="80px">
            {isPending && <SolidButton text={'견적 확정하기'} onClick={handleConfirm} />}
            <ShareButtons title="기사님 공유하기" shareCategory="url" shareUrl={shareUrl} isDesktop={isDesktop} />
          </Stack>
        )}
      </Stack>
      {!isDesktop && isPending && (
        <Stack sx={pendingButtonWrapperSx}>
          <Stack sx={likeButtonSx} onClick={handleLikeClick}>
            <Image src={likeIconSrc} alt="like" width={24} height={24} />
          </Stack>
          <SolidButton text={'견적 확정하기'} onClick={handleConfirm} />
        </Stack>
      )}
    </>
  );
}

const contentContainerSx = {
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { xs: 'flex-start', md: 'space-between' },
  gap: { xs: '0px', md: '120px' },
  height: '100%',
  paddingTop: { xs: '16px', sm: '24px' },
  paddingBottom: '110px', // 모바일 플로팅버튼 높이 포함
  paddingX: '24px',
};

const dividerSx = {
  flexShrink: 0,
  width: '100%',
  height: { xs: '24px', md: '40px' },
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
  marginBottom: { xs: '24px', md: '40px' },
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

const priceWrapperSx = {
  width: '100%',
  flexDirection: 'column',
  gap: { xs: '16x', md: '32px' },
};

const pendingButtonWrapperSx = {
  position: 'fixed',
  bottom: '0',
  width: '100%',
  height: '74px',
  paddingX: '24px',
  paddingY: '10px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: colorChips.grayScale[50],
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
