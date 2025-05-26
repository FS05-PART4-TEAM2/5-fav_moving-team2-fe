import { Stack } from '@mui/material';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { CustomerRequestParams } from '@/shared/types/types';

interface RequestAreaFeatureProps {
  startAddress: string;
  endAddress: string;
  updateParams: (key: keyof CustomerRequestParams, value: any) => void;
}

export const RequestAreaFeature = ({ startAddress, endAddress, updateParams }: RequestAreaFeatureProps) => {
  const areaQ = '이사 지역을 선택해주세요.';

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
    </Stack>
  );
};
