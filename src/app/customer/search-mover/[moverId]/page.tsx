'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { CircularProgress, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useMoverDetailData } from './core/hooks/useMoverDetailData';
import { useMoverReviewList } from './features/MoverReview/core/hooks/useMoverReviewList';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { MoverInfoFeature } from './features/MoverInfo/feature';
import { DesktopWidgetsFeature } from './features/DesktopWidgets/feature';

export default function Page() {
  const params = useParams();
  const moverId = params.moverId as string;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { data: moverInfo, isLoading: isMoverInfoLoading } = useMoverDetailData(moverId);
  const { data: reviewData, isLoading: isReviewLoading } = useMoverReviewList(moverId);

  // 로딩 중일 때
  if (isMoverInfoLoading || isReviewLoading) {
    return (
      <Stack height="100vh">
        <Stack flex={1} alignItems="center" justifyContent="center">
          <CircularProgress size={40} />
        </Stack>
      </Stack>
    );
  }

  if (!moverInfo || !reviewData) return null;

  // TODO: 공유URL 수정 - 현재페이지
  const shareUrl = `/customer/search-mover/${moverId}`;
  const shareLinkTitle = '나만 알기엔 아쉬운 기사님인가요?';
  const likeIconSrc = moverInfo.isLiked
    ? '/assets/images/like-icon/like-24x24-black.svg'
    : '/assets/images/like-icon/like-24x24-white.svg';
  const handleLikeClick = () => {
    // TODO: 찜하기 api 추가
    console.log('like');
  };
  const handleAssignRequest = () => {
    // TODO: 지정 견적 요청 api 추가
    console.log('assign request');
  };

  const moverInfoProps = {
    data: moverInfo,
    isDesktop: isDesktop,
    shareUrl: shareUrl,
    shareLinkTitle: shareLinkTitle,
    reviewData: reviewData,
  };
  const widgetProps = {
    nickname: moverInfo.nickname,
    isAssigned: moverInfo.isAssigned,
    isDesktop: isDesktop,
    likeIconSrc: likeIconSrc,
    shareUrl: shareUrl,
    shareLinkTitle: shareLinkTitle,
    handleLikeClick: handleLikeClick,
    handleAssignRequest: handleAssignRequest,
  };

  return (
    <>
      <Stack sx={contentContainerSx}>
        <MoverInfoFeature {...moverInfoProps} />
        {/* 데스크탑 찜하기, 지정견적요청, 공유 버튼*/}
        {isDesktop && <DesktopWidgetsFeature {...widgetProps} />}
      </Stack>
      {/* 모바일 찜하기, 지정견적요청 버튼*/}
      {!isDesktop && (
        <Stack sx={mobileButtonWrapperSx}>
          <Stack sx={likeButtonSx} onClick={handleLikeClick}>
            <Image src={likeIconSrc} alt="like" width={24} height={24} />
          </Stack>
          <SolidButton text={'지정 견적 요청하기'} onClick={handleAssignRequest} disabled={moverInfo.isAssigned} />
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
