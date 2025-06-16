'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo, TypoClassName } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import Image from 'next/image';

type ShareCategory = 'url' | 'content' | 'all';

interface ShareButtonsProps {
  isDesktop: boolean;
  title: string;
  textStyle?: TypoClassName;
  shareCategory: ShareCategory;
  shareUrl?: string;
  shareData?: {
    moveDay: string;
    moveDayWithWeek: string;
    moveTypeLabel: string;
    startAddress: string;
    endAddress: string;
  };
}

// TODO: 공유하기 클릭 이벤트핸들러 추가
export const ShareButtons = ({
  title,
  shareUrl,
  isDesktop,
  textStyle = 'text_SB_16to20',
  shareData,
  shareCategory,
}: ShareButtonsProps) => {
  const iconSize = isDesktop ? 64 : 40;
  const clipSize = isDesktop ? 36 : 24;
  const shareIcon = '/assets/images/share-link-icon/clip-24x24.svg';
  const kakaoIcon = '/assets/images/share-link-icon/kakao-01.svg';
  const facebookIcon = '/assets/images/share-link-icon/facebook-01.svg';

  const handleClick = (type: 'link' | 'kakao' | 'facebook') => {
    const url = shareUrl ?? window.location.href;
    const hasData = Boolean(shareData);
    const hasUrl = Boolean(shareUrl);
    const kakaoTemplateId = Number(process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID!);

    const content = shareData
      ? `📝 견적 정보
- 요청일: ${shareData.moveDay}
- 서비스: ${shareData.moveTypeLabel}
- 이용일: ${shareData.moveDayWithWeek}
- 출발지: ${shareData.startAddress}
- 도착지: ${shareData.endAddress}`
      : '';

    // 1. 클립보드
    if (type === 'link') {
      if (shareCategory === 'url') {
        navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다!');
      }
      if (shareCategory === 'content') {
        navigator.clipboard.writeText(content);
        alert('견적 내용이 복사되었습니다!');
      }
      if (shareCategory === 'all') {
        navigator.clipboard.writeText(`${content}\n\n${url}`);
        alert('견적 내용과 링크가 복사되었습니다!');
      }
      return;
    }

    // 2. 카카오톡
    if (type === 'kakao') {
      if (window.Kakao.isInitialized()) {
        window.Kakao.cleanup();
        window.Kakao.Share.cleanup();
      }
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);

      if (hasUrl) {
        const textToShare =
          hasData && hasUrl
            ? `${content}\n\n자세한 내용은 아래 링크에서 확인하세요.`
            : hasData
            ? content
            : `최고의 기사님을 공유합니다!\n아래 링크를 통해 확인해보세요.`;

        const kakaoPayload: {
          objectType: 'text';
          text: string;
          link: { mobileWebUrl: string; webUrl: string };
        } = {
          objectType: 'text',
          text: textToShare,
          link: {
            mobileWebUrl: shareUrl!,
            webUrl: shareUrl!,
          },
        };

        window.Kakao.Share.sendDefault(kakaoPayload);
        return;
      }

      if (!shareData) {
        console.error('공유할 데이터가 없습니다.');
        return;
      }

      // 조건: URL 없음 + 데이터 있음 → 커스텀 템플릿 사용
      if (hasData && !hasUrl) {
        window.Kakao.Share.sendCustom({
          templateId: kakaoTemplateId,
          templateArgs: {
            HEADER_LINK: '', // 출처 링크 없음

            ITEM1_TITLE: '요청일',
            ITEM1_DESC: shareData.moveDay,

            ITEM2_TITLE: '서비스',
            ITEM2_DESC: shareData.moveTypeLabel,

            ITEM3_TITLE: '이용일',
            ITEM3_DESC: shareData.moveDayWithWeek,

            ITEM4_TITLE: '출발지',
            ITEM4_DESC: shareData.startAddress,

            ITEM5_TITLE: '도착지',
            ITEM5_DESC: shareData.endAddress,
          },
        });
        return;
      }

      // 예외 처리 (둘 다 없음)
      alert('공유할 정보가 없습니다.');
    }

    // 3. Facebook
    if (type === 'facebook') {
      // 둘 다 없으면 예외 처리
      if (!shareUrl && !shareData) {
        alert('공유할 정보가 없습니다.');
        return;
      }

      // 1. URL만 있는 경우
      if (hasUrl && !hasData) {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(fbUrl, '_blank', 'width=600,height=400');
        return;
      }

      // 2. content만 있는 경우 → Facebook이 지원하지 않음 → 클립보드 대체
      if (!hasUrl && hasData) {
        // URL 없고 content만 있을 경우
        navigator.clipboard.writeText(content);
        alert('내용이 복사되었습니다! \n 공유할 내용을 facebook에 올려주세요!.');
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(fbUrl, '_blank', 'width=600,height=400');
        return;
      }

      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(
        content,
      )}`;
      window.open(fbUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Stack direction="column" width="100%" gap={{ xs: '16px', md: '22px' }}>
      <Typo className={textStyle} content={title} color={colorChips.black[400]} />
      <Stack sx={shareButtonsSx}>
        <Stack sx={{ ...iconBoxSx, border: `1px solid ${colorChips.line.e6e6e6}` }} onClick={() => handleClick('link')}>
          <Image src={shareIcon} alt="share-button" width={clipSize} height={clipSize} />
        </Stack>
        <Stack sx={iconBoxSx} onClick={() => handleClick('kakao')}>
          <Image src={kakaoIcon} alt="share-button" width={iconSize} height={iconSize} />
        </Stack>
        <Stack sx={iconBoxSx} onClick={() => handleClick('facebook')}>
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
