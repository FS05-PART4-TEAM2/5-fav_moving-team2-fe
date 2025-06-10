import { colorChips } from '@/shared/styles/colorChips';
import { Typo, TypoClassName } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import Image from 'next/image';

interface ShareButtonsProps {
  isDesktop: boolean;
  title: string;
  textStyle?: TypoClassName;
  shareUrl: string;
}

// TODO: 공유하기 클릭 이벤트핸들러 추가
export const ShareButtons = ({ title, shareUrl, isDesktop, textStyle = 'text_SB_16to20' }: ShareButtonsProps) => {
  const iconSize = isDesktop ? 64 : 40;
  const clipSize = isDesktop ? 36 : 24;
  const shareIcon = '/assets/images/share-link-icon/clip-24x24.svg';
  const kakaoIcon = '/assets/images/share-link-icon/kakao-01.svg';
  const facebookIcon = '/assets/images/share-link-icon/facebook-01.svg';

  return (
    <Stack direction="column" width="100%" gap={{ xs: '16px', md: '22px' }}>
      <Typo className={textStyle} content={title} color={colorChips.black[400]} />
      <Stack sx={shareButtonsSx}>
        <Stack sx={{ ...iconBoxSx, border: `1px solid ${colorChips.line.e6e6e6}` }}>
          <Image src={shareIcon} alt="share-button" width={clipSize} height={clipSize} />
        </Stack>
        <Stack sx={iconBoxSx}>
          <Image src={kakaoIcon} alt="share-button" width={iconSize} height={iconSize} />
        </Stack>
        <Stack sx={iconBoxSx}>
          <Image src={facebookIcon} alt="share-button" width={iconSize} height={iconSize} />
        </Stack>
      </Stack>
    </Stack>
  );
};

const shareButtonsSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: { xs: '40px', md: '64px' },
  gap: '16px',
};

const iconBoxSx = {
  width: { xs: '40px', md: '64px' },
  height: { xs: '40px', md: '64px' },
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: { xs: '8px', md: '16px' },
  backgroundColor: colorChips.grayScale[50],
  cursor: 'pointer',
};
