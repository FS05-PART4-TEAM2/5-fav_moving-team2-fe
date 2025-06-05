import { Stack } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { reviewRating } from '@/shared/types/types';
import { ReviewTotalRating } from './ReviewTotalRating';
import { ReviewProgress } from './ReviewProgress';

interface ReviewStatsProps {
  totalRating: number;
  reviewPercent: reviewRating;
  reviewCount: reviewRating;
}

export const ReviewStats = ({ totalRating, reviewPercent, reviewCount }: ReviewStatsProps) => {
  return (
    <Stack sx={reviewStatsSx}>
      <ReviewTotalRating totalRating={totalRating} />
      <ReviewProgress reviewPercent={reviewPercent} reviewCount={reviewCount} />
    </Stack>
  );
};

const reviewStatsSx = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'center',
  justifyContent: { xs: 'flex-start', sm: 'space-between' },
  gap: '40px',
  padding: { xs: '0px', sm: '0px 48px', md: '40px 64px' },
  borderRadius: '32px',
  backgroundColor: { xs: 'transparent', md: colorChips.background.f7f7f7 },
};
