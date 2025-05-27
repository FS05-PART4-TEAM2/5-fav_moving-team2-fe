import { Stack } from '@mui/material';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { CustomerRequestPayload } from '@/shared/types/types';
import { useRequestStepStore } from '../../core/hooks/useRequestStepStore';
import { useState, useEffect } from 'react';
import { EditButton } from '../../core/components/EditButton';
import DatePicker from '@/shared/components/DatePicker/DatePicker';

interface RequestDateFeatureProps {
  moveDate: string;
  updateParams: (key: keyof CustomerRequestPayload, value: any) => void;
}

export const RequestDateFeature = ({ moveDate, updateParams }: RequestDateFeatureProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const { decreaseStep, increaseStep } = useRequestStepStore();

  const dateQ = '이사 예정일을 선택해주세요.';

    // 컴포넌트 마운트 시 메시지들을 순차적으로 보여주기
    useEffect(() => {
      const timer1 = setTimeout(() => setVisibleMessages(1), 300);
      const timer2 = setTimeout(() => setVisibleMessages(2), 800);
  
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, []);

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

    // 애니메이션 스타일
    const fadeInUpStyle = (isVisible: boolean, delay = 0) => ({
      width: '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.4s ease-out ${delay}ms`,
    });

  return (
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
        <TextFieldChat text={dateQ} align="left" color="white" />
      </div>

      {/* 두 번째 메시지 */}
      <div style={fadeInUpStyle(visibleMessages >= 2)}>
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
      </div>
    </Stack>
  );
};
