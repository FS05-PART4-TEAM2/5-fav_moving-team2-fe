import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { reviewRating } from '@/shared/types/types';
import ProgressBar from '@/shared/components/ProgressBar/ProgressBar';

interface ReviewProgressProps {
  reviewPercent: reviewRating;
  reviewCount: reviewRating;
}

export const ReviewProgress = ({ reviewPercent, reviewCount }: ReviewProgressProps) => {
  const ratings = [
    { label: '5점', percentage: reviewPercent[5], count: reviewCount[5] },
    { label: '4점', percentage: reviewPercent[4], count: reviewCount[4] },
    { label: '3점', percentage: reviewPercent[3], count: reviewCount[3] },
    { label: '2점', percentage: reviewPercent[2], count: reviewCount[2] },
    { label: '1점', percentage: reviewPercent[1], count: reviewCount[1] },
  ];

  return (
    <Stack sx={reviewProgressContainerSx}>
      {ratings.map((rating) => {
        const textSize = rating.label === '5점' ? 'text_B_14to20' : 'text_M_14to20';
        return (
          <Stack key={rating.label} sx={progressWrapperSx}>
            <Stack width={{ xs: '36px', md: '50px' }} flexShrink={0}>
              <Typo content={rating.label} className={textSize} color={colorChips.black[300]} />
            </Stack>
            <Stack width={'100%'}>
              <ProgressBar type="review" percentage={rating.percentage} />
            </Stack>
            <Stack width={{ xs: '36px', md: '50px' }} flexShrink={0}>
              <Typo content={rating.count.toString()} className={textSize} color={colorChips.grayScale[300]} />
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

const reviewProgressContainerSx = {
  width: '100%',
  flexDirection: 'column',
  gap: { xs: '6px', md: '14px' },
  padding: { xs: '16px 18px', md: '0px' },
  borderRadius: '24px',
  backgroundColor: colorChips.background.f7f7f7,
};

const progressWrapperSx = {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: { xs: '24px', md: '32px' },
  gap: { xs: '16px', md: '30px' },
};
