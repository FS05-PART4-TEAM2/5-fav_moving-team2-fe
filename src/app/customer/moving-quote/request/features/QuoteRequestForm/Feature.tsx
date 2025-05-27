import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { RequestTypeFeature } from '../RequestType/Feature';
import { RequestDateFeature } from '../RequestDate/Feature';
import { RequestAreaFeature } from '../RequestArea/Feature';
import { useCustomerRequestPost } from '../../core/hooks/useCustomerRequestPost';

export const QuoteRequestFormFeature = () => {
  const [showDate, setShowDate] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const { params, updateParams, handleSubmit } = useCustomerRequestPost();
  const { moveType, moveDate, startAddress, endAddress } = params;

  // moveType이 선택되면 RequestDateFeature 컴포넌트를 보여줌
  useEffect(() => {
    if (moveType) {
      setShowDate(true);
    }
  }, [moveType]);

  // moveDate가 선택되면 RequestAreaFeature 컴포넌트를 보여줌
  useEffect(() => {
    if (moveDate) {
      setShowArea(true);
    }
  }, [moveDate]);

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
      {showDate && <RequestDateFeature moveDate={moveDate} updateParams={updateParams} />}
      {showArea && (
        <RequestAreaFeature
          startAddress={startAddress}
          endAddress={endAddress}
          updateParams={updateParams}
          handleSubmit={handleSubmit}
        />
      )}
    </Stack>
  );
};
