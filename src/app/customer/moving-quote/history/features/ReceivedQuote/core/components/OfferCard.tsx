import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import Chip from '@/shared/components/Chip/Chip';
import { useRouter } from 'next/navigation';
import { ReceivedOffers, MovingType } from '@/shared/types/types';
import { formattedPrice } from '@/shared/utils/dataFormatter';

interface OfferListProps {
  data: ReceivedOffers;
  moveType: MovingType;
}

export const OfferCard = ({ data, moveType }: OfferListProps) => {
  const router = useRouter();

  const chipMoveType = moveType === 'SMALL_MOVE' ? 'small' : moveType === 'FAMILY_MOVE' ? 'home' : 'office';

  const handleClickDetail = () => {
    router.push(`/customer/moving-quote/history/${data.offerId}`);
  };

  const profileBaseProps = {
    nickname: data.moverNickname,
    profileImage: data.moverProfileImageUrl,
    totalRating: data.totalRating,
    reviewCounts: data.reviewCounts,
    career: data.career,
    confirmedQuotationCount: data.confirmedQuotationCount,
    likeCount: data.likeCount,
    isLiked: data.isLiked,
    likeColor: 'pink' as const,
  };

  return (
    <Stack sx={cardContainerSx} onClick={handleClickDetail}>
      <Stack sx={chipWrapperSx}>
        {/* 확정견적인 경우 */}
        {data.isConfirmedMover && <Chip type="confirmed" />}
        <Chip type={chipMoveType} />
        {/* 지정요청일 경우 */}
        {data.isAssigned && <Chip type="select" />}
      </Stack>
      <Typo content={data.intro} className="text_SB_14to20" color={colorChips.black[300]} />
      <MoverProfileBase {...profileBaseProps} />
      <Stack sx={priceWrapperSx}>
        <Typo content="견적 금액" className="text_M_14to18" color={colorChips.black[400]} />
        <Typo content={formattedPrice(data.price)} className="text_B_18to24" color={colorChips.black[400]} />
      </Stack>
    </Stack>
  );
};

const cardContainerSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '14px', md: '16px' },
  border: `0.5px solid ${colorChips.line.f2f2f2}`,
  borderRadius: '16px',
  padding: { xs: '16px 14px 10px', md: '20px 24px 14px' },
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
};

const chipWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: { xs: '8px', md: '12px' },
};

const priceWrapperSx = {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: { xs: '8px', md: '16px' },
};
