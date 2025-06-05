import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { MoverReviewListItem } from '@/shared/types/types';
import { formatWithDash } from '@/shared/utils/dataFormatter';
import Image from 'next/image';
import { Rating } from '@mui/material';

interface ReviewCardProps {
  review: MoverReviewListItem;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const nickname = review.customerNick.split(' ')[0];

  // 닉네임 마스킹 로직
  const getMaskedNickname = (name: string) => {
    if (name.length <= 3) {
      // 3글자 이하: 첫 글자만 보이고 나머지는 *
      return name[0] + '*'.repeat(name.length - 1);
    } else {
      // 4글자 이상: 첫 3글자만 보이고 나머지는 *
      return name.slice(0, 3) + '*'.repeat(name.length - 3);
    }
  };

  const formattedNickname = getMaskedNickname(nickname);
  const formattedDate = formatWithDash(review.createdAt);

  // 커스텀 별 아이콘 컴포넌트
  const StarIcon = ({ filled = true }: { filled?: boolean }) => (
    <Image
      src={filled ? `/assets/images/star-icon/star-yellow-20x20.svg` : `/assets/images/star-icon/star-gray-20x20.svg`}
      alt="star"
      width={20}
      height={20}
    />
  );

  return (
    <Stack direction="column" paddingY="32px">
      <Stack direction="row" alignItems="center">
        <Typo content={formattedNickname} className="text_R_14to18" color={colorChips.black[400]} />
        <Stack sx={dividerSx} />
        <Typo content={formattedDate} className="text_R_14to18" color={colorChips.grayScale[300]} />
      </Stack>
      <Stack paddingTop="8px" paddingBottom={{ xs: '16px', md: '24px' }}>
        <Rating
          name="review-read-only"
          value={review.rating}
          precision={0.5}
          readOnly
          icon={<StarIcon filled={true} />}
          emptyIcon={<StarIcon filled={false} />}
        />
      </Stack>
      <Typo
        content={review.content}
        className="text_R_14to18"
        color={colorChips.black.b2b2b}
        customStyle={{ wordBreak: 'keep-all', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
      />
    </Stack>
  );
};

const dividerSx = {
  width: { xs: '12px', md: '14px' },
  height: { xs: '12px', md: '14px' },
  marginRight: { xs: '12px', md: '14px' },
  borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
};
