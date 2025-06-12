import { Stack } from '@mui/material';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { CustomerRequestPayload, MovingType } from '@/shared/types/types';
import { useRequestStepStore } from '../../core/hooks/useRequestStepStore';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { EditButton } from '../../core/components/EditButton';
import { SelectAddressButton } from './core/components/SelectAddressButton';
import { useState, useEffect } from 'react';
import { SelectAddressModal } from './core/components/SelectAddressModal';

interface RequestAreaFeatureProps {
  startAddress: string;
  endAddress: string;
  updateParams: (key: keyof CustomerRequestPayload, value: string | MovingType | null) => void;
  handleSubmit: () => void;
}

export const RequestAreaFeature = ({
  startAddress,
  endAddress,
  updateParams,
  handleSubmit,
}: RequestAreaFeatureProps) => {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const { requestStep, decreaseStep, increaseStep } = useRequestStepStore();

  const areaQ = '이사 지역을 선택해주세요.';

  // 컴포넌트 마운트 시 메시지들을 순차적으로 보여주기
  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleMessages(1), 50);
    const timer2 = setTimeout(() => setVisibleMessages(2), 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // 주소 선택완료한 경우 각각 수정하기 버튼 보여주기
  const hasStartAddress = startAddress.length > 0;
  const hasEndAddress = endAddress.length > 0;

  // 주소 선택완료, 프로그레스 스텝 5인 경우(타입, 날짜, 주소 모두 선택완료 상태) 견적확정 버튼 보여주기
  const showSubmitButton = hasStartAddress && hasEndAddress && requestStep === 5;
  const submitButtonDisabled = !hasStartAddress || !hasEndAddress || isEditing;

  const handleChangeStartAddress = (address: string) => {
    updateParams('startAddress', address);
    if (!isEditing) {
      increaseStep();
    }
  };
  const handleChangeEndAddress = (address: string) => {
    updateParams('endAddress', address);
    if (!isEditing) {
      increaseStep();
    }
  };
  const handleClickStartEdit = () => {
    setIsStartModalOpen(true);
    setIsEditing(true);
    decreaseStep();
  };
  const handleClickEndEdit = () => {
    setIsEndModalOpen(true);
    setIsEditing(true);
    decreaseStep();
  };
  const handleCloseEditModal = () => {
    setIsEditing(false);
    increaseStep(); // 수정 모달에서 그냥 취소하고 나온 경우 다시 스텝 +1
  };
  const handleCloseStartModal = () => {
    if (isEditing) {
      handleCloseEditModal();
    }
    setIsStartModalOpen(false);
  };
  const handleCloseEndModal = () => {
    if (isEditing) {
      handleCloseEditModal();
    }
    setIsEndModalOpen(false);
  };

  // 애니메이션 스타일
  const fadeInUpStyle = (isVisible: boolean, delay = 0) => ({
    width: '100%',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.4s ease-out ${delay}ms`,
  });

  return (
    <>
      <Stack
        direction="column"
        width="100%"
        height="100%"
        alignItems="flex-start"
        justifyContent="center"
        gap={{ xs: '8px', md: '24px' }}
      >
        {/* 첫 번째 메시지 */}
        <div style={fadeInUpStyle(visibleMessages >= 1)}>
          <TextFieldChat text={areaQ} align="left" color="white" />
        </div>

        <Stack direction="row" width="100%" justifyContent="flex-end">
          {/* 두 번째 메시지 */}
          <div style={fadeInUpStyle(visibleMessages >= 2)}>
            <TextFieldChat isText={false} align="right" color="white">
              <Stack direction="column" width="100%" height="100%" gap={{ xs: '16px', md: '24px' }}>
                {/* 출발지 주소 선택 */}
                <Stack sx={wrapperSx}>
                  <SelectAddressButton
                    optionType="start"
                    isSelected={hasStartAddress}
                    selectedAddress={startAddress}
                    onClick={() => !hasStartAddress && setIsStartModalOpen(true)}
                  />
                  {hasStartAddress && <EditButton onClick={handleClickStartEdit} />}
                </Stack>

                {/* 도착지 주소 선택 */}
                <Stack sx={wrapperSx}>
                  <SelectAddressButton
                    optionType="end"
                    isSelected={hasEndAddress}
                    selectedAddress={endAddress}
                    onClick={() => !hasEndAddress && setIsEndModalOpen(true)}
                  />
                  {hasEndAddress && <EditButton onClick={handleClickEndEdit} />}
                </Stack>

                {/* 견적 확정 버튼 */}
                {showSubmitButton && (
                  <SolidButton text="견적 확정하기" onClick={handleSubmit} disabled={submitButtonDisabled} />
                )}
              </Stack>
            </TextFieldChat>
          </div>
        </Stack>
      </Stack>

      {/* 출발지 선택 모달 */}
      {isStartModalOpen && (
        <SelectAddressModal
          optionType="start"
          isOpen={isStartModalOpen}
          onChange={handleChangeStartAddress}
          onClose={handleCloseStartModal}
        />
      )}

      {/* 도착지 선택 모달 */}
      {isEndModalOpen && (
        <SelectAddressModal
          optionType="end"
          isOpen={isEndModalOpen}
          onChange={handleChangeEndAddress}
          onClose={handleCloseEndModal}
        />
      )}
    </>
  );
};

const wrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  gap: '8px',
};
