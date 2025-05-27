import { Stack } from '@mui/material';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { CommonModal } from '@/shared/components/Modal/CommonModal';
import { useState } from 'react';

interface SelectAddressModalProps {
  optionType: 'start' | 'end';
  isOpen: boolean;
  onChange: (address: string) => void;
  onClose: () => void;
}

/**
 * 주소 선택 모달 컴포넌트
 */
export const SelectAddressModal = ({ optionType, isOpen, onChange, onClose }: SelectAddressModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const modalTitle = optionType === 'start' ? '출발지를 선택해주세요' : '도착지를 선택해주세요';

  // 옵션 클릭 시에는 selectedOption만 변경
  const handleClickOption = (value: string) => {
    setSelectedOption(value);
  };

  // 선택완료 버튼 클릭 시에 params 업데이트, 모달닫기
  const handleClickComplete = () => {
    if (selectedOption) {
      onChange(selectedOption);
      onClose();
    }
  };

  return (
    <CommonModal modalTitle={modalTitle} isOpen={isOpen} handleClickClose={onClose}>
      <Stack sx={modalContentSx}>
        <Stack sx={searchWrapperSx}></Stack>
        <SolidButton text="선택완료" onClick={handleClickComplete} disabled={!selectedOption} />
      </Stack>
    </CommonModal>
  );
};

const modalContentSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '24px', md: '40px' },
  pt: { xs: '30px', md: '40px' },
};

const searchWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '16px', md: '24px' },
};
