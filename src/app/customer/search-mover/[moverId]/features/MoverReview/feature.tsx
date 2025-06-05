import { Stack } from '@mui/material';
import { ReviewStats } from './core/components/ReviewStats';
import { ReviewCard } from './core/components/ReviewCard';
import { CommonPagination } from '@/shared/components/Pagination/CommonPagination';
import { MoverDetailReviewResponse } from '@/shared/types/types';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import Image from 'next/image';

interface MoverReviewFeatureProps {
  data: MoverDetailReviewResponse;
  hasReview: boolean;
}

export const MoverReviewFeature = ({ data, hasReview }: MoverReviewFeatureProps) => {
  // TODO; 페이지 업데이트 추가
  const handleChangePage = () => {};

  if (!hasReview) {
    return (
      <Stack direction="column" width="100%" alignItems="center" justifyContent="center" gap="24px" paddingY="80px">
        <Image src="/assets/images/empty-images/review-blue-01.svg" alt="empty" width={110} height={82} />
        <Typo content="아직 등록된 리뷰가 없어요!" className="text_R_16to24" color={colorChips.grayScale[400]} />
      </Stack>
    );
  }

  return (
    <Stack direction="column" width="100%" gap="40px">
      <ReviewStats
        totalRating={data.totalRating}
        reviewPercent={data.ratingPercentages}
        reviewCount={data.ratingCounts}
      />
      <Stack direction="column" width="100%">
        {data.list.map((review, idx) => {
          const isLast = idx !== data.list.length - 1;
          return (
            <Stack
              key={review.id}
              direction="column"
              width="100%"
              borderBottom={isLast ? `1px solid ${colorChips.line.f2f2f2}` : 'none'}
            >
              <ReviewCard key={review.id} review={review} />
            </Stack>
          );
        })}
      </Stack>
      <Stack width="100%" alignItems="center" justifyContent="center">
        <CommonPagination page={data.currentPage} totalCount={data.totalPages} handleChange={handleChangePage} />
      </Stack>
    </Stack>
  );
};
