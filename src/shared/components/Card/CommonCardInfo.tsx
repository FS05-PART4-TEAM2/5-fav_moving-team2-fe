import { Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { PresetCardName, UserCardData } from './CardPresets';
import theme from '@/shared/theme';
import RequestConfirmCardInfo from './RequestCardInfo';
import { SolidButton } from '../Button/SolidButton';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import dayjs from 'dayjs';
import ReviewSection from './ReviewSection';
import QuotationCardInfo from './variants/QuotationCardInfo';
import FinishReviewCardInfo from './variants/FinishReviewCardInfo';
import WriteReviewCardInfo from './variants/WriteReviewCardInfo';
import WaitRequestCardInfo from './variants/WaitRequestCardInfo';
import ProfileCardInfo from './variants/ProfileCardInfo';

export interface CommonCardInfoProps {
  type: PresetCardName;
  data: UserCardData;
  onRequestClick?: (id: string) => void;
  onRejectClick?: (id: string) => void;
  isModal?: boolean;
  bgColor?: boolean;
}

export default function CommonCardInfo({
  type,
  data,
  bgColor,
  onRequestClick,
  onRejectClick,
  isModal,
}: CommonCardInfoProps) {
  const isProfile = type === 'profile';
  const isQuotation = type === 'quotation';
  const isWaitRequest = type === 'waitRequest';
  const isWriteReview = type === 'writeReview';
  const isFinishReview = type === 'finishReview';

  const isRequestConfirm =
    type === 'request' ||
    type === 'confirmRequest' ||
    type === 'rejectRequest' ||
    type === 'finishRequest' ||
    type === 'moveQuotation' ||
    type === 'refuse';

  const formatted = (date: string): string => {
    if (isWriteReview) dayjs(date).format('YYYY.MM.DD');
    return dayjs(date).format('YYYY.MM.DD(dd)');
  };

  if (isRequestConfirm) {
    return (
      <RequestConfirmCardInfo
        type={type}
        data={data}
        onClickRequest={onRequestClick}
        onClickReject={onRejectClick}
        isModal={isModal}
      />
    );
  }

  if (type === 'review') {
    return <ReviewSection data={data} />;
  }

  if (isProfile) return <ProfileCardInfo data={data} bgColor={bgColor} />;
  if (isWaitRequest) return <WaitRequestCardInfo data={data} />;
  if (isWriteReview) return <WriteReviewCardInfo data={data} />;
  if (isFinishReview) return <FinishReviewCardInfo data={data} />;
  if (isQuotation) return <QuotationCardInfo data={data} />;
}
