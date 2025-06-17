'use client';

import { useMoverReviewList } from '../../MoverReview/core/hooks/useMoverReviewList';
import { MoverReviewFeature } from '../../MoverReview/feature';

interface ReviewSectionProps {
  moverId: string;
  hasReview: boolean;
}

export const ReviewSection = ({ moverId, hasReview }: ReviewSectionProps) => {
  const { data: reviewData, isLoading: isReviewLoading, handleChangePage } = useMoverReviewList(moverId);

  return (
    <MoverReviewFeature
      data={reviewData}
      hasReview={hasReview}
      handleChangePage={handleChangePage}
      isReviewLoading={isReviewLoading}
    />
  );
};
