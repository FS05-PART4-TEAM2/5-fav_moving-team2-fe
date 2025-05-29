import { Stack, useTheme, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import Image from 'next/image';

interface EmptyDataViewProps {
  type: 'pending' | 'received';
}

export const EmptyDataView = ({ type }: EmptyDataViewProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const imgSrc = '/assets/images/empty-images/car-02.svg';
  const pendingEmptyMsg = '아직 받은 견적이 없어요.\n기사님께 지정 요청을 할 수 있어요!';
  const receivedEmptyMsg = '아직 확정된 견적 내역이 없어요.';

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
      <Stack direction="column" width="100%" alignItems="center" gap={{ xs: '32px', md: '64px' }}>
        <Image src={imgSrc} alt="Moving" width={isDesktop ? 378 : 244} height={isDesktop ? 140 : 96} />
        <Typo
          content={type === 'pending' ? pendingEmptyMsg : receivedEmptyMsg}
          className={isDesktop ? 'text_R_20' : 'text_R_14'}
          color={colorChips.grayScale[400]}
          customStyle={{ textAlign: 'center', whiteSpace: 'pre-line' }}
        />
      </Stack>
      {type === 'pending' && (
        <SolidButton
          text="기사님 찾기"
          width={isDesktop ? '196px' : '167px'}
          onClick={() => {
            router.push(PATH.customer.searchMover);
          }}
        />
      )}
    </Stack>
  );
};
