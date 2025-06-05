'use client';

import { useState } from 'react';
import { colorChips } from '@/shared/styles/colorChips';
import { CircularProgress, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import useUserStore from '@/shared/store/useUserStore';
import Image from 'next/image';
import { useMoverDetailData } from './core/hooks/useMoverDetailData';
import { useMoverReviewList } from './features/MoverReview/core/hooks/useMoverReviewList';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { MoverInfoFeature } from './features/MoverInfo/feature';
import { DesktopWidgetsFeature } from './features/DesktopWidgets/feature';
import { postAssignMoverApi } from './core/service/postAssignMoverApi';
import { PATH } from '@/shared/constants';
import { CommonModal } from '@/shared/components/Modal/CommonModal';
import { revalidateMoverDetail } from './core/service/revalidateMoverDetail';
import { Typo } from '@/shared/styles/Typo/Typo';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const moverId = params.moverId as string;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOptimisticAssigned, setIsOptimisticAssigned] = useState(false); // 낙관적 UI 상태
  const { userType, customerData } = useUserStore();

  const { data: moverInfo, isLoading: isMoverInfoLoading } = useMoverDetailData(moverId);
  const { data: reviewData, isLoading: isReviewLoading, handleChangePage } = useMoverReviewList(moverId);

  // 초기 로딩시에만 페이지 전체 로딩 표시 (둘 다 로딩 중일 때)
  if ((isMoverInfoLoading && isReviewLoading) || (!moverInfo && !reviewData)) {
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
    // TODO: 찜하기 api 추가 - 비회원 요청시 로그인페이지로 이동
    console.log('like');
  };
  // 지정 견적 요청
  const handleAssignRequest = async () => {
    if (userType === 'temp') {
      // 비회원 요청시 로그인페이지로 이동
      alert('로그인 후 이용해주세요.');
      router.push(PATH.customer.login);
      return;
    }
    // 로그인한 일반유저 활성견적 없는 경우 - 견적 생성 모달 띄우기
    if (!customerData?.hasQuotation) {
      setIsOpenModal(true);
      return;
    }

    try {
      const res = await postAssignMoverApi(moverId);
      if (res.success) {
        alert('기사님 지정 요청이 저장되었습니다!');

        // 낙관적 UI 업데이트 - 지정요청 chip 표시, 버튼 비활성화
        setIsOptimisticAssigned(true);

        // 캐시 무효화 (다음 접근시 새 데이터 사용)
        await revalidateMoverDetail();
      }
    } catch (error) {
      alert('다시 시도해 주세요.');
    }
  };

  // 낙관적 UI를 위한 moverInfo 객체 수정
  const displayMoverInfo = {
    ...moverInfo,
    isAssigned: moverInfo.isAssigned || isOptimisticAssigned,
  };

  const moverInfoProps = {
    data: displayMoverInfo,
    isDesktop: isDesktop,
    shareUrl: shareUrl,
    shareLinkTitle: shareLinkTitle,
    reviewData: reviewData,
    handleChangePage: handleChangePage,
    isReviewLoading: isReviewLoading, // 리뷰 로딩 상태 전달
  };
  const widgetProps = {
    userType: userType,
    nickname: displayMoverInfo.nickname,
    isAssigned: displayMoverInfo.isAssigned,
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
      {/* 모바일 찜하기, 지정견적요청 버튼 */}
      {!isDesktop && (
        <Stack sx={mobileButtonWrapperSx}>
          <Stack sx={likeButtonSx} onClick={handleLikeClick}>
            <Image src={likeIconSrc} alt="like" width={24} height={24} />
          </Stack>
          <SolidButton
            text={'지정 견적 요청하기'}
            onClick={handleAssignRequest}
            disabled={displayMoverInfo.isAssigned}
          />
        </Stack>
      )}
      {/* 활성견적 없는 경우 모달 */}
      {isOpenModal && (
        <CommonModal
          modalTitle="지정 견적 요청하기"
          isOpen={isOpenModal}
          handleClickClose={() => setIsOpenModal(false)}
        >
          <Stack sx={modalContentSx}>
            <Typo content="일반 견적 요청을 먼저 진행해 주세요." className="text_M_18" color={colorChips.black[300]} />
            <SolidButton text={'일반 견적 요청하기'} onClick={() => router.push(PATH.customer.movingQuoteRequest)} />
          </Stack>
        </CommonModal>
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

const modalContentSx = {
  width: '100%',
  flexDirection: 'column',
  gap: { xs: '24px', md: '40px' },
  marginTop: { xs: '30px', md: '40px' },
};
