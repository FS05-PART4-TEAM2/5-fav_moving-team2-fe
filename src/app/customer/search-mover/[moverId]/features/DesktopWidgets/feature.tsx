import { ShareButtons } from '@/shared/components/Button/ShareButtons';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import Image from 'next/image';

interface DesktopWidgetsFeatureProps {
  nickname: string;
  isDesktop: boolean;
  isAssigned: boolean;
  likeIconSrc: string;
  shareUrl: string;
  shareLinkTitle: string;
  handleLikeClick: () => void;
  handleAssignRequest: () => void;
}

export const DesktopWidgetsFeature = ({
  nickname,
  isAssigned,
  isDesktop,
  likeIconSrc,
  shareUrl,
  shareLinkTitle,
  handleLikeClick,
  handleAssignRequest,
}: DesktopWidgetsFeatureProps) => {
  const desktopButtonsTitle = `${nickname} 기사님에게 지정 견적을 요청해보세요!`;

  return (
    <Stack flexShrink={0} width="360px" direction="column" gap="80px">
      <Stack direction="column" width="100%" gap="22px">
        <Typo
          className="text_SB_20"
          content={desktopButtonsTitle}
          color={colorChips.black[400]}
          customStyle={{
            wordBreak: 'keep-all',
            wordWrap: 'break-word',
          }}
        />
        <Stack sx={desktopLikeButtonSx} onClick={handleLikeClick}>
          <Image src={likeIconSrc} alt="like" width={24} height={24} />
          <Typo className="text_SB_20" content={'기사님 찜하기'} color={colorChips.black[400]} />
        </Stack>
        <SolidButton text={'지정 견적 요청하기'} onClick={handleAssignRequest} disabled={isAssigned} />
      </Stack>
      <ShareButtons title={shareLinkTitle} shareUrl={shareUrl} isDesktop={isDesktop} textStyle="text_SB_14to20" />
    </Stack>
  );
};

const desktopLikeButtonSx = {
  width: '100%',
  height: '54px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: colorChips.grayScale[50],
  borderRadius: '16px',
  border: `1px solid ${colorChips.line.e6e6e6}`,
  cursor: 'pointer',
};
