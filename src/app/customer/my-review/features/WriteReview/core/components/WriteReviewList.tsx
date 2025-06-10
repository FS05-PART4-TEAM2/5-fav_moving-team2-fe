import { ReviewCardBase } from '@/app/customer/my-review/core/components/ReviewCardBase';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { Stack } from '@mui/material';
import { CustomerWriteReviewItem } from '@/shared/types/types';
import { colorChips } from '@/shared/styles/colorChips';

// TODO: 작성가능한 리뷰 api 완성되면 수정
interface WriteReviewListProps {
  data: CustomerWriteReviewItem[];
}

interface WriteReviewCardProps {
  data: CustomerWriteReviewItem;
}

export const WriteReviewList = ({ data }: WriteReviewListProps) => {
  return (
    <Stack sx={cardWrapperSx}>
      {data.map((item, idx) => (
        <WriteReviewCard key={idx} data={item} />
      ))}
    </Stack>
  );
};

const WriteReviewCard = ({ data }: WriteReviewCardProps) => {
  // TODO: 작성가능한 리뷰 api 완성되면 수정
  const handleClickWriteReview = () => {
    console.log('리뷰 작성하기');
  };
  const baseProps = {
    nickname: data.moverName,
    profileImage: data.moverProfileImage,
    moveDate: data.moveDate,
    moveType: data.moveType,
    price: data.price,
    isAssigned: data.isAssignedMover,
  };

  return (
    <Stack sx={reviewCarsSx}>
      <ReviewCardBase {...baseProps} />
      <SolidButton text="리뷰 작성하기" onClick={handleClickWriteReview} />
    </Stack>
  );
};

const cardWrapperSx = {
  display: 'grid',
  width: '100%',
  height: '100%',
  // 모바일/태블릿: 1열
  gridTemplateColumns: '1fr',
  gap: '32px',
  // 데스크탑: 2열
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '24px',
    rowGap: '48px',
  },
};

const reviewCarsSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  gap: { xs: '12px', md: '32px' },
  backgroundColor: colorChips.grayScale[50],
  borderRadius: { xs: '16px', md: '24px' },
  padding: { xs: '20px 20px 14px', md: '32px 24px' },
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.03)',
};
