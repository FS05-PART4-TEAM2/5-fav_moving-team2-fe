import { useState } from 'react';
import { WriteReviewPayload } from '@/shared/types/types';
import { postCustomerReviewApi } from '../service/postCustomerReviewApi';
import { useWriteReviewList } from './useWriteReviewList';
import { useFinishedReviewList } from '@/app/customer/my-review/features/FinishedReview/core/hooks/useFinishedReviewList';

export const useCustomerReviewPost = (offerId: string) => {
  const { refetch: refetchWriteReviewList } = useWriteReviewList();
  const { refetch: refetchFinishedReviewList } = useFinishedReviewList();

  const [params, setParams] = useState<WriteReviewPayload>({
    content: '',
    rating: 0,
  });

  const updateRating = (rating: number) => {
    setParams({ ...params, rating });
  };

  const updateContent = (content: string) => {
    setParams({ ...params, content });
  };

  const isValidForm = params.rating > 0 && params.content.length >= 10;

  const handleSubmit = async () => {
    if (!isValidForm) return;

    const res = await postCustomerReviewApi(offerId, params);
    if (res.success) {
      alert('리뷰가 등록되었습니다!');
      // 리뷰 등록 후 리스트 데이터 갱신
      refetchWriteReviewList?.();
      refetchFinishedReviewList?.();
    }
  };

  return { params, updateRating, updateContent, handleSubmit, isValidForm };
};
