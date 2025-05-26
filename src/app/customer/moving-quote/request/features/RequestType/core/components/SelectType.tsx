import { Stack } from '@mui/material';
import { SelectOption } from './SelectOption';
import { MovingType } from '@/shared/types/types';
import { useEffect, useState } from 'react';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { selectTypeOptions } from '../../../../core/constants';
import { CustomerRequestParams } from '@/shared/types/types';
import { useRequestStepStore } from '../../../../core/hooks/useRequestStepStore';

interface SelectTypeProps {
  moveType: MovingType | null;
  updateParams: (key: keyof CustomerRequestParams, value: any) => void;
  setIsEditing: (isEditing: boolean) => void;
}

/**
 * 이사종류 선택 컴포넌트
 */
export const SelectType = ({ moveType, updateParams, setIsEditing }: SelectTypeProps) => {
  const [selectedOption, setSelectedOption] = useState<MovingType | null>(null);
  const { increaseStep } = useRequestStepStore();

  useEffect(() => {
    // 이미 선택된 값이 있으면 초기값 세팅
    if (moveType) setSelectedOption(moveType);
  }, [moveType]);

  // 옵션 클릭 시에는 selectedOption만 변경
  const handleClickOption = (value: MovingType) => {
    setSelectedOption(value);
  };

  // 선택완료 버튼 클릭 시에만 params 업데이트
  const handleClickComplete = () => {
    if (selectedOption) {
      updateParams('moveType', selectedOption);
      increaseStep();
      setIsEditing(false);
    }
  };

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="flex-start"
      justifyContent="center"
      gap={{ xs: '16px', md: '24px' }}
    >
      <Stack direction="column" width="100%" height="100%" gap={{ xs: '8px', md: '16px' }}>
        {selectTypeOptions.map((option) => (
          <SelectOption
            key={option.value}
            isSelected={selectedOption === option.value}
            value={option.value}
            text={option.text}
            onChange={handleClickOption}
          />
        ))}
      </Stack>
      <SolidButton text="선택완료" onClick={handleClickComplete} disabled={!selectedOption} />
    </Stack>
  );
};
