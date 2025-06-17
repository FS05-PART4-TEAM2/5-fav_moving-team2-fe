import { Rating, Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import Image from 'next/image';

interface ReviewTotalRatingProps {
  totalRating: number;
}

export const ReviewTotalRating = ({ totalRating }: ReviewTotalRatingProps) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const iconSize = isDesktop ? 48 : 24;

  // 커스텀 별 아이콘 컴포넌트
  const StarIcon = ({ filled = true }: { filled?: boolean }) => (
    <Image
      src={
        filled
          ? `/assets/images/star-icon/star-yellow-${iconSize}x${iconSize}.svg`
          : `/assets/images/star-icon/star-gray-${iconSize}x${iconSize}.svg`
      }
      alt="star"
      width={iconSize}
      height={iconSize}
    />
  );

  return (
    <Stack direction="column" gap="15px" alignItems="center" justifyContent="center">
      <Stack direction="row" gap="8px" alignItems="center">
        <Typo content={totalRating.toString()} className="text_B_40to64" color={colorChips.black[400]} />
        <Typo content={'/ 5'} className="text_B_24to38" color={colorChips.grayScale[100]} />
      </Stack>
      <Rating
        name="review-read-only"
        value={totalRating}
        precision={0.1}
        readOnly
        icon={<StarIcon filled={true} />}
        emptyIcon={<StarIcon filled={false} />}
      />
    </Stack>
  );
};
