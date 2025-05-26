import { Stack } from '@mui/material';
import { RequestTypeFeature } from '../RequestType/Feature';
import { RequestDateFeature } from '../RequestDate/Feature';
import { RequestAreaFeature } from '../RequestArea/Feature';
import { useCustomerRequestPost } from '../../core/hooks/useCustomerRequestPost';

export const QuoteRequestFormFeature = () => {
  const { params, updateParams } = useCustomerRequestPost();
  const { moveType, moveDate, startAddress, endAddress } = params;

  // TODO: 단계별로 채팅하듯이 올라오는 애니메이션 추가
  // TODO: api 연결(날짜, 주소 형식 확인 필요)
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="flex-start"
      justifyContent="center"
      gap={{ xs: '8px', md: '24px' }}
    >
      <RequestTypeFeature moveType={moveType} updateParams={updateParams} />
      <RequestDateFeature moveDate={moveDate} updateParams={updateParams} />
      <RequestAreaFeature startAddress={startAddress} endAddress={endAddress} updateParams={updateParams} />
    </Stack>
  );
};
