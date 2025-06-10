import { CustomerQuoteData, ReceivedOffers } from '@/shared/types/types';
import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import { MoveDataBase } from '@/shared/components/Card/MoveDataBase';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { OutlinedButton } from '@/shared/components/Button/OutlinedButton';
import Chip from '@/shared/components/Chip/Chip';
import { useRouter } from 'next/navigation';
import { formattedPrice } from '@/shared/utils/dataFormatter';
import { useQuoteConfirm } from '../../../../core/hooks/useQuoteConfirm';

interface PendingQuoteCardProps {
  customerQuoteData: CustomerQuoteData;
  receivedOffer: ReceivedOffers;
}

export const PendingQuoteCard = ({ customerQuoteData, receivedOffer }: PendingQuoteCardProps) => {
  const router = useRouter();
  const { handleConfirm } = useQuoteConfirm(receivedOffer.offerId);
  const handleClickDetail = () => {
    router.push(`/customer/moving-quote/history/${receivedOffer.offerId}`);
  };

  const profileBaseProps = {
    nickname: receivedOffer.moverNickname,
    profileImage: receivedOffer.moverProfileImageUrl,
    totalRating: receivedOffer.totalRating,
    reviewCounts: receivedOffer.reviewCounts,
    career: receivedOffer.career,
    confirmedQuotationCount: receivedOffer.confirmedQuotationCount,
    likeCount: receivedOffer.likeCount,
    isLiked: receivedOffer.isLiked,
    likeColor: 'pink' as const,
  };
  const moveDataBaseProps = {
    moveDate: customerQuoteData.moveDate,
    startAddress: customerQuoteData.startAddress,
    endAddress: customerQuoteData.endAddress,
  };

  return (
    <Stack sx={cardContainerSx}>
      <Stack sx={dataWrapperSx}>
        <Stack sx={chipWrapperSx}>
          <Chip type="wait" />
          <Chip type={customerQuoteData.moveType} />
          {/* 지정요청일 경우 */}
          {receivedOffer.isAssigned && <Chip type="select" />}
        </Stack>
        <MoverProfileBase {...profileBaseProps} />
        <MoveDataBase {...moveDataBaseProps} />
      </Stack>
      <Stack sx={priceWrapperSx}>
        <Typo content="견적 금액" className="text_M_14to18" color={colorChips.black[400]} />
        <Typo content={formattedPrice(receivedOffer.price)} className="text_B_18to24" color={colorChips.black[400]} />
      </Stack>
      <Stack sx={buttonWrapperSx}>
        <SolidButton text="견적 확정하기" onClick={handleConfirm} buttonSize="xs" borderRadius="8px" />
        <OutlinedButton text="상세보기" onClick={handleClickDetail} buttonSize="xs" borderRadius="8px" />
      </Stack>
    </Stack>
  );
};

const cardContainerSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: colorChips.grayScale[50],
  border: `0.5px solid ${colorChips.line.f2f2f2}`,
  borderRadius: '16px',
  padding: { xs: '22px 12px 16px', md: '28px 24px 22px' },
  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.08)',
};

const dataWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '14px', md: '24px' },
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
  paddingY: { xs: '8px', sm: '16px', md: '24px' },
};

const buttonWrapperSx = {
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
  height: '100%',
  gap: { xs: '8px', sm: '12px' },
};
