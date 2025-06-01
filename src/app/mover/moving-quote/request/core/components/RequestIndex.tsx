'use client';

import { useState } from 'react';
import { Stack } from '@mui/material';
import { CommonModal } from '@/shared/components/Modal/CommonModal';
// import { ResponsiveModal } 등도 md 이하에서 필요하면 추가
// import { RejectModalContent } from './RejectModalContent';

import Card from '@/shared/components/Card/Card';
import { mockData } from '../mockData';
import RequestModal from './RequestModal';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';

export default function RequestIndex() {
  const [modalType, setModalType] = useState<'request' | 'reject' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const userData = mockData;

  const handleOpenModal = (type: 'request' | 'reject', id: string) => {
    setModalType(type);
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedId(null);
  };

  return (
    <>
      <Stack width="100%" pt={isMd ? '14px' : '32px'}>
        <Typo
          className={isMd ? 'text_SB_18' : 'text_SB_24'}
          style={{ color: colorChips.black[400] }}
          content="받은 요청"
        />
        <Stack spacing={3} padding="24px 0">
          {userData.map((card) => (
            <Card
              key={card.id}
              type="request"
              data={card}
              onRequestClick={(id) => handleOpenModal('request', id)}
              onRejectClick={(id) => handleOpenModal('reject', id)}
            />
          ))}
        </Stack>

        {/* 모달 - 견적 보내기 */}
        {modalType === 'request' && selectedId && (
          <CommonModal modalTitle="견적 보내기" isOpen handleClickClose={handleCloseModal}>
            <RequestModal
              mode="request"
              onClose={handleCloseModal}
              requestCardData={userData.find((card) => card.id === selectedId)!}
            />
          </CommonModal>
        )}

        {/* 모달 - 반려 */}
        {modalType === 'reject' && selectedId && (
          <CommonModal modalTitle="반려 사유 작성" isOpen handleClickClose={handleCloseModal}>
            <RequestModal
              mode="reject"
              onClose={handleCloseModal}
              requestCardData={userData.find((card) => card.id === selectedId)!}
            />
          </CommonModal>
        )}
      </Stack>
    </>
  );
}
