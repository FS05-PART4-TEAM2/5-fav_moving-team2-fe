import { Stack } from '@mui/material';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { CustomerRequestPayload } from '@/shared/types/types';
import { useRequestStepStore } from '../../core/hooks/useRequestStepStore';
import { SolidButton } from '@/shared/components/Button/SolidButton';

interface RequestAreaFeatureProps {
  startAddress: string;
  endAddress: string;
  updateParams: (key: keyof CustomerRequestPayload, value: any) => void;
}

// TODO: 주소 출/도착 입력 컴포넌트 만들기
// 주소 api 담는거 일단은 스트링 통쨰로 보내고, 혹시 나중에 분리해서 받는게 필요해질수도있으니 일단 라이브러리 응답값 저장만 해두기로함.
// 주소까지 하고 post 요청 보내보기

export const RequestAreaFeature = ({ startAddress, endAddress, updateParams }: RequestAreaFeatureProps) => {
  const { requestStep, decreaseStep } = useRequestStepStore();

  const areaQ = '이사 지역을 선택해주세요.';

  // 주소 선택한 경우 각각 수정하기 버튼 보여주기
  const hasStartAddress = startAddress.length > 0;
  const hasEndAddress = endAddress.length > 0;

  // 주소 선택완료, 프로그레스 스텝 4인 경우(타입, 날짜, 주소 모두 선택완료 상태) 견적확정 버튼 보여주기
  const showSubmitButton = hasStartAddress && hasEndAddress && requestStep === 4;

  const handleClickEdit = () => {
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
      <TextFieldChat text={areaQ} align="left" color="white" />

      <Stack direction="row" width="100%" maxWidth="630px" justifyContent="flex-end">
        <TextFieldChat isText={false} align="right" color="white">
          {/* 주소 선택 */}

          {showSubmitButton && <SolidButton text="견적 확정하기" onClick={handleClickEdit} />}
        </TextFieldChat>
      </Stack>
    </Stack>
  );
};
