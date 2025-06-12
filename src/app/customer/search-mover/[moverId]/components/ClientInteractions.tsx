'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import useUserStore from '@/shared/store/useUserStore';
import { DesktopWidgetsFeature } from '../features/DesktopWidgets/feature';
import { MobileWidgetsFeature } from '../features/MobileWidgets/feature';
import { useCustomerLikeMover } from '@/shared/hooks/useCustomerLikeMover';
import { postAssignMoverApi } from '../core/service/postAssignMoverApi';
import { PATH } from '@/shared/constants';
import { CommonModal } from '@/shared/components/Modal/CommonModal';
import { Typo } from '@/shared/styles/Typo/Typo';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { colorChips } from '@/shared/styles/colorChips';
import { useMoverDetailData } from '../core/hooks/useMoverDetailData';

interface ClientInteractionsProps {
  moverId: string;
  shareUrl: string;
  shareLinkTitle: string;
}

export const ClientInteractions = ({ moverId, shareUrl, shareLinkTitle }: ClientInteractionsProps) => {
  const router = useRouter();
  const { data: moverInfo, refetch } = useMoverDetailData(moverId);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOptimisticAssigned, setIsOptimisticAssigned] = useState(false);
  const { userType, customerData } = useUserStore();

  // 찜하기 훅 - moverInfo가 없어도 기본값으로 호출
  const { isLiked, likeCount, handleLikeClick } = useCustomerLikeMover({
    initialStatus: moverInfo?.isLiked || false,
    initialLikeCount: moverInfo?.likeCount || 0,
    moverId,
  });

  // 모든 훅 호출 후에 조건부 렌더링
  if (!moverInfo) {
    return null;
  }

  const likeIconSrc = isLiked
    ? '/assets/images/like-icon/like-24x24-black.svg'
    : '/assets/images/like-icon/like-24x24-white.svg';

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
        // 캐시 무효화 후 데이터 다시 가져오기
        await refetch();
      }
    } catch (error) {
      alert('다시 시도해 주세요.');
    }
  };

  // 낙관적 UI를 위한 moverInfo 객체 수정
  const displayMoverInfo = {
    ...moverInfo,
    isAssigned: moverInfo.isAssigned || isOptimisticAssigned,
    isLiked: isLiked, // 찜하기 상태 업데이트
    likeCount: likeCount, // 찜 개수 업데이트
  };

  const widgetProps = {
    userType: userType,
    nickname: displayMoverInfo.nickname,
    isAssigned: displayMoverInfo.isAssigned,
    likeIconSrc: likeIconSrc,
    shareUrl: shareUrl,
    shareLinkTitle: shareLinkTitle,
    handleLikeClick: handleLikeClick,
    handleAssignRequest: handleAssignRequest,
  };

  return (
    <>
      {/* 데스크탑 찜하기, 지정견적요청, 공유 버튼*/}
      <DesktopWidgetsFeature {...widgetProps} />

      {/* 모바일 찜하기, 지정견적요청 버튼 */}
      <MobileWidgetsFeature {...widgetProps} />

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
};

const modalContentSx = {
  width: '100%',
  flexDirection: 'column',
  gap: { xs: '24px', md: '40px' },
  marginTop: { xs: '30px', md: '40px' },
};
