import { ResponsiveModal } from '@/shared/components/Modal/ResponsiveModal';
import { Rating, Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { CustomerWriteReviewItem } from '@/shared/types/types';
import { ReviewCardBase } from '@/app/customer/my-review/core/components/ReviewCardBase';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import Textarea from '@/shared/components/Input/TextArea';
import Image from 'next/image';
import { useCustomerReviewPost } from '../hooks/useCustomerReviewPost';

interface WriteReviewModalProps {
  offerData: CustomerWriteReviewItem;
  isOpen: boolean;
  onClose: () => void;
}

export const WriteReviewModal = ({ offerData, isOpen, onClose }: WriteReviewModalProps) => {
  const { params, updateRating, updateContent, handleSubmit, isValidForm } = useCustomerReviewPost(offerData.offerId);
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const iconSize = isDesktop ? 48 : 24;

  const handleClickSubmitButton = () => {
    // 리뷰 등록 후 캐시 초기화, 모달 닫기
    handleSubmit();
    onClose();
  };

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

  const baseProps = {
    nickname: offerData.moverName,
    profileImage: offerData.moverProfileImage,
    moveDate: offerData.moveDate,
    moveType: offerData.moveType,
    price: offerData.price,
    isAssigned: offerData.isAssignedMover,
  };

  return (
    <ResponsiveModal isOpen={isOpen} handleClickClose={onClose} modalTitle="리뷰 쓰기">
      <Stack sx={modalContentSx}>
        <Stack sx={inputWrapperSx}>
          <ReviewCardBase {...baseProps} />
          {isDesktop && <Stack sx={dividerBaseSx} />}
          {!isDesktop && <Stack sx={dividerBorderSx} />}
          <Stack width="100%" direction="column" gap="16px">
            <Typo content="평점을 선택해 주세요" className="text_SB_16to20" color={colorChips.black[300]} />
            <Rating
              name="review-input"
              value={params.rating}
              precision={1}
              max={5}
              onChange={(_, newValue) => {
                if (newValue !== null) {
                  updateRating(newValue);
                }
              }}
              icon={<StarIcon filled={true} />}
              emptyIcon={<StarIcon filled={false} />}
            />
          </Stack>
          <Stack sx={dividerBorderSx} />
          <Stack width="100%" direction="column">
            <Typo content="상세 후기를 작성해주세요" className="text_SB_16to20" color={colorChips.black[300]} />
            <Textarea
              placeholder="최소 10자 이상 입력해주세요"
              value={params.content}
              onChange={(e) => updateContent(e.target.value)}
            />
          </Stack>
        </Stack>
        <SolidButton text="리뷰 등록" onClick={handleClickSubmitButton} disabled={!isValidForm} />
      </Stack>
    </ResponsiveModal>
  );
};

const modalContentSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: { xs: '26px', md: '40px' },
  gap: { xs: '26px', md: '40px' },
};

const inputWrapperSx = {
  width: '100%',
  height: 'fit-content',
  flexDirection: 'column',
};

const dividerBaseSx = {
  width: '100%',
  height: { xs: '20px', md: '32px' },
};

const dividerBorderSx = {
  ...dividerBaseSx,
  borderBottom: `1px solid ${colorChips.line.e6e6e6}`,
  marginBottom: { xs: '20px', md: '32px' },
};
