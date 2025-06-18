import { useState } from 'react';
import { CustomerRequestPayload } from '@/shared/types/types';
import { postCustomerRequest } from '../service/postCustomerRequestApi';
import useUserStore from '@/shared/store/useUserStore';

export const useCustomerRequestPost = () => {
  const { setCustomerData, customerData, userInfo } = useUserStore();
  const [params, setParams] = useState<CustomerRequestPayload>({
    moveType: null,
    moveDate: '',
    startAddress: '',
    endAddress: '',
    customerId: userInfo?.id ?? '',
  });

  const updateParams = <K extends keyof CustomerRequestPayload>(key: K, value: CustomerRequestPayload[K]): void => {
    setParams({ ...params, [key]: value });
  };

  const handleSubmit = async () => {
    const res = await postCustomerRequest(params);
    if (res.success) {
      // 요청 성공 : 유저데이터 hasQuotation true로 변경
      setCustomerData({
        wantService: customerData?.wantService ?? null,
        livingPlace: customerData?.livingPlace ?? null,
        hasQuotation: true,
      });
    }
  };

  return { params, updateParams, handleSubmit };
};
