import { Stack, useTheme, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import Image from 'next/image';

interface EmptyDataViewProps {
  type: 'write' | 'finished';
}

export const EmptyDataView = ({ type }: EmptyDataViewProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const imgSrc = '/assets/images/empty-images/review-blue-02.svg';
  const writeEmptyMsg = '작성 가능한 리뷰가 없어요';
  const finishedEmptyMsg = '아직 등록된 리뷰가 없어요!';
  const redirectUrl = PATH.customer.writeReview;

  return (
    <Stack
      flex={1}
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      gap="32px"
    >
      <Stack direction="column" width="100%" alignItems="center" gap={{ xs: '24px', md: '32px' }}>
        <Image src={imgSrc} alt="Moving" width={isDesktop ? 184 : 136} height={isDesktop ? 136 : 82} />
        <Typo
          content={type === 'write' ? writeEmptyMsg : finishedEmptyMsg}
          className="text_R_16to24"
          color={colorChips.grayScale[400]}
          customStyle={{ textAlign: 'center', whiteSpace: 'pre-line' }}
        />
      </Stack>
      {type === 'finished' && (
        <SolidButton
          text={'리뷰 작성하러 가기'}
          width={isDesktop ? '180px' : '150px'}
          onClick={() => {
            router.push(redirectUrl);
          }}
        />
      )}
    </Stack>
  );
};
