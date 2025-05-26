import { useState } from 'react';
import { CustomerRequestPayload } from '@/shared/types/types';

export const useCustomerRequestPost = () => {
  const [params, setParams] = useState<CustomerRequestPayload>({
    moveType: null,
    moveDate: '',
    startAddress: '',
    endAddress: '',
  });

  const updateParams = (key: keyof CustomerRequestPayload, value: string) => {
    setParams({ ...params, [key]: value });
  };

  return { params, updateParams };
};
