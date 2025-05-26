import { Stack } from '@mui/material';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { CustomerRequestParams } from '@/shared/types/types';

interface RequestDateFeatureProps {
  moveDate: string;
  updateParams: (key: keyof CustomerRequestParams, value: any) => void;
}

export const RequestDateFeature = ({ moveDate, updateParams }: RequestDateFeatureProps) => {
  const dateQ = '이사 예정일을 선택해주세요.';

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
    </Stack>
  );
};
