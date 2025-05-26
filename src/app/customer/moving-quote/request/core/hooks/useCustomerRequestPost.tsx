import { useState } from 'react';
import { CustomerRequestParams } from '@/shared/types/types';

export const useCustomerRequestPost = () => {
  const [params, setParams] = useState<CustomerRequestParams>({
    moveType: null,
    moveDate: '',
    startAddress: '',
    endAddress: '',
  });

  const updateParams = (key: keyof CustomerRequestParams, value: string) => {
    setParams({ ...params, [key]: value });
  };

  return { params, updateParams };
};
