import { ReviewCardBase } from '@/app/customer/my-review/core/components/ReviewCardBase';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { Stack } from '@mui/material';
import { CustomerWriteReviewItem } from '@/shared/types/types';
import { colorChips } from '@/shared/styles/colorChips';
import { useState } from 'react';
import { WriteReviewModal } from './WriteReviewModal';

interface WriteReviewListProps {
  data: CustomerWriteReviewItem[];
}

interface WriteReviewCardProps {
  data: CustomerWriteReviewItem;
}

export const WriteReviewList = ({ data }: WriteReviewListProps) => {
  return (
    <Stack sx={cardWrapperSx}>
      {data.map((item) => (
        <WriteReviewCard key={item.offerId} data={item} />
      ))}
    </Stack>
  );
};

const WriteReviewCard = ({ data }: WriteReviewCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickWriteReview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <>
      <Stack sx={reviewCarsSx}>
        <ReviewCardBase {...baseProps} />
        <SolidButton text="리뷰 작성하기" onClick={handleClickWriteReview} />
      </Stack>
      {isModalOpen && <WriteReviewModal offerData={data} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </>
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
