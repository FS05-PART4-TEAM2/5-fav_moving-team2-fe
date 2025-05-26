import { Stack } from '@mui/material';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { CustomerRequestPayload } from '@/shared/types/types';
import { useRequestStepStore } from '../../core/hooks/useRequestStepStore';
import { useState } from 'react';
import { EditButton } from '../../core/components/EditButton';
import DatePicker from '@/shared/components/DatePicker/DatePicker';

interface RequestDateFeatureProps {
  moveDate: string;
  updateParams: (key: keyof CustomerRequestPayload, value: any) => void;
}

export const RequestDateFeature = ({ moveDate, updateParams }: RequestDateFeatureProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { decreaseStep, increaseStep } = useRequestStepStore();

  const dateQ = '이사 예정일을 선택해주세요.';

  // 선택값 없을 때 || 수정버튼 클릭했을 때 옵션 보여주기
  const showOptions = !moveDate || isEditing;
  const handleClickEdit = () => {
    setIsEditing(true);
    decreaseStep();
  };

  const handleSelectDate = (formattedDate: string) => {
    updateParams('moveDate', formattedDate);
    increaseStep();
    setIsEditing(false);
  };

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="flex-start"
      justifyContent="center"
      gap={{ xs: '8px', md: '24px' }}
    >
      <TextFieldChat text={dateQ} align="left" color="white" />
      {showOptions ? (
        // 날짜 선택
        <Stack width="100%" direction="row" justifyContent="flex-end">
          <DatePicker onSelect={handleSelectDate} value={moveDate} />
        </Stack>
      ) : (
        // 선택 완료
        <Stack direction="column" width="100%" alignItems="flex-end" gap={{ xs: '4px', md: '6px' }}>
          <TextFieldChat text={moveDate} align="right" color="blue" />
          <EditButton onClick={handleClickEdit} />
        </Stack>
      )}
    </Stack>
  );
};
