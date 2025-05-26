import { Stack } from '@mui/material';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { SelectType } from './core/components/SelectType';
import { useState } from 'react';
import { EditButton } from '../../core/components/EditButton';
import { selectTypeOptions } from '../../core/constants';
import { MovingType, CustomerRequestParams } from '@/shared/types/types';
import { useRequestStepStore } from '../../core/hooks/useRequestStepStore';

interface RequestTypeFeatureProps {
  moveType: MovingType | null;
  updateParams: (key: keyof CustomerRequestParams, value: any) => void;
}

export const RequestTypeFeature = ({ moveType, updateParams }: RequestTypeFeatureProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { decreaseStep } = useRequestStepStore();

  const requestDesc = '몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)';
  const typeQ = '이사 종류를 선택해주세요.';

  // moveType value를 text로 변환(선택완료 chat에 보여주기)
  const getMoveTypeText = (moveType: MovingType) => {
    const found = selectTypeOptions.find((option) => option.value === moveType);
    return found ? found.text : '';
  };

  // 선택값 없을 때 || 수정버튼 클릭했을 때 옵션 보여주기
  const showOptions = !moveType || isEditing;
  const handleClickEdit = () => {
    // 옵션 선택 보여주고 프로그레스 스텝 -1
    setIsEditing(true);
    decreaseStep();
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
      <TextFieldChat text={requestDesc} align="left" color="white" />
      <TextFieldChat text={typeQ} align="left" color="white" />
      {showOptions ? (
        // 옵션 선택
        <TextFieldChat isText={false} align="right" color="white">
          <SelectType moveType={moveType} updateParams={updateParams} setIsEditing={setIsEditing} />
        </TextFieldChat>
      ) : (
        // 선택 완료
        <Stack direction="column" width="100%" alignItems="flex-end" gap={{ xs: '4px', md: '6px' }}>
          <TextFieldChat text={getMoveTypeText(moveType)} align="right" color="blue" />
          <EditButton onClick={handleClickEdit} />
        </Stack>
      )}
    </Stack>
  );
};
