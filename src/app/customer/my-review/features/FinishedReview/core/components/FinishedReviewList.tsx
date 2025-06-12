import { ReviewCardBase } from '@/app/customer/my-review/core/components/ReviewCardBase';
import { Stack } from '@mui/material';
import { CustomerFinishedReviewItem } from '@/shared/types/types';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { formatToFullDate } from '@/shared/utils/dataFormatter';

interface FinishedReviewListProps {
  data: CustomerFinishedReviewItem[];
}

interface FinishedReviewCardProps {
  data: CustomerFinishedReviewItem;
}

export const FinishedReviewList = ({ data }: FinishedReviewListProps) => {
  return (
    <Stack sx={cardWrapperSx}>
      {data.map((item, idx) => (
        <FinishedReviewCard key={idx} data={item} />
      ))}
    </Stack>
  );
};

const FinishedReviewCard = ({ data }: FinishedReviewCardProps) => {
  const formattedReviewDate = `작성일 ${formatToFullDate(data.reviewDate)}`;
  const baseProps = {
    nickname: data.moverName,
    profileImage: data.moverProfileImage,
    moveDate: data.moveDate,
    moveType: data.moveType,
    price: data.price,
    isAssigned: data.isAssignedMover,
    reviewDate: data.reviewDate,
    rating: data.rating,
  };

  return (
    <Stack sx={reviewCarsSx}>
      <ReviewCardBase {...baseProps} />
      <Stack sx={reviewContentSx}>
        <Typo
          content={data.content}
          className="text_R_14to20"
          color={colorChips.grayScale[500]}
          customStyle={{ width: '100%' }}
        />
        <Stack flexShrink={0} display={{ xs: 'block', md: 'none' }}>
          <Typo content={formattedReviewDate} className="text_R_12" style={{ color: colorChips.grayScale[300] }} />
        </Stack>
      </Stack>
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
  gap: { xs: '10px', md: '32px' },
  backgroundColor: colorChips.grayScale[50],
  borderRadius: { xs: '16px', md: '24px' },
  padding: { xs: '16px 14px', md: '32px 24px' },
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.03)',
};

const reviewContentSx = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '10px',
  borderTop: { xs: `1px solid ${colorChips.line.f2f2f2}`, md: 'none' },
  paddingTop: { xs: '10px', md: '0px' },
  '& .MuiTypography-root': {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
};
