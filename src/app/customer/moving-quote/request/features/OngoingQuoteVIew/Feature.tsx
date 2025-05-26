import { Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import Image from 'next/image';

export const OngoingQuoteViewFeature = () => {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const imgSrc = isDesktop ? '/assets/images/empty-images/car-02.svg' : '/assets/images/empty-images/car-01.svg';
  const hasOngoingQuoteMsg = '현재 진행 중인 이사 견적이 있어요!\n진행 중인 이사 완료 후 새로운 견적을 받아보세요.';

  return (
    <Stack direction="column" width="100%" height="100%" alignItems="center" justifyContent="center" gap="32px">
      <Stack direction="column" width="100%" alignItems="center" gap={{ xs: '32px', md: '64px' }}>
        <Image src={imgSrc} alt="Moving" width={isDesktop ? 378 : 244} height={isDesktop ? 140 : 96} />
        <Typo
          content={hasOngoingQuoteMsg}
          className={isDesktop ? 'text_R_20' : 'text_R_14'}
          color={colorChips.grayScale[400]}
          customStyle={{ textAlign: 'center', whiteSpace: 'pre-line' }}
        />
      </Stack>
      <SolidButton
        text="받은 견적 보러가기"
        width={isDesktop ? '196px' : '167px'}
        onClick={() => {
          router.push(PATH.customer.movingQuoteHistory);
        }}
      />
    </Stack>
  );
};
