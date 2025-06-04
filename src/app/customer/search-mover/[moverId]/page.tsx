'use client';

import { ShareButtons } from '@/shared/components/Button/ShareButtons';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import Chip from '@/shared/components/Chip/Chip';
import Image from 'next/image';
import { useMoverDetailData } from './core/hooks/useMoverDetailData';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { SERVICE_TYPES, REGIONS } from '@/shared/constants';

export default function Page() {
  const params = useParams();
  const moverId = params.moverId as string;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { data, isLoading } = useMoverDetailData(moverId);

  // key 값을 한글 label로 변환하는 함수들
  const getServiceLabel = (serviceKey: string) => {
    return SERVICE_TYPES.find((service) => service.key === serviceKey)?.label || serviceKey;
  };

  const getRegionLabel = (regionKey: string) => {
    return REGIONS.find((region) => region.key === regionKey)?.label || regionKey;
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <Stack height="100vh">
        <Stack flex={1} alignItems="center" justifyContent="center">
          <CircularProgress size={40} />
        </Stack>
      </Stack>
    );
  }

  if (!data) return null;

  const handleLikeClick = () => {
    // TODO: 찜하기 api 추가
    console.log('like');
  };
  const handleAssignRequest = () => {
    // TODO: 지정 견적 요청 api 추가
    console.log('assign request');
  };

  // TODO: 공유URL 수정 - 현재페이지
  const shareUrl = `/customer/search-mover/${moverId}`;
  const isAssigned = data.isAssigned;
  const profileBaseProps = {
    nickname: data.nickname,
    profileImage: data.profileImage,
    totalRating: data.totalRating,
    reviewCounts: data.reviewCounts,
    career: data.career,
    confirmedQuotationCount: data.confirmedCounts,
    likeCount: data.likeCount,
    isLiked: data.isLiked,
  };
  const likeIconSrc = data.isLiked
    ? '/assets/images/like-icon/like-24x24-black.svg'
    : '/assets/images/like-icon/like-24x24-white.svg';

  const desktopButtonsTitle = `${data.nickname} 기사님에게 지정 견적을 요청해보세요!`;
  const shareLinkTitle = '나만 알기엔 아쉬운 기사님인가요?';

  return (
    <>
      <Stack sx={contentContainerSx}>
        <Stack width="100%" direction="column">
          <Stack sx={profileBoxSx}>
            <Stack sx={chipWrapperSx}>
              {data.serviceList?.map((service) => (
                <Chip type={service} />
              ))}
              {/* 지정요청한 이력 있는 경우 */}
              {isAssigned && <Chip type="select" />}
            </Stack>
            <Typo content={data.intro} className="text_SB_14to24" color={colorChips.black[300]} />
            <MoverProfileBase {...profileBaseProps} />
          </Stack>
          <Stack sx={dividerSx} />
          {!isDesktop && (
            <>
              {/* 데스크탑 아닐때는 공유버튼 여기 */}
              <ShareButtons
                title={shareLinkTitle}
                shareUrl={shareUrl}
                isDesktop={isDesktop}
                textStyle="text_SB_14to20"
              />
              <Stack sx={dividerSx} />
            </>
          )}
          <MoverDetailContent label="상세설명">
            <Typo content={data.detailDescription} className="text_R_14to18" color={colorChips.black[400]} />
          </MoverDetailContent>
          <Stack sx={dividerSx} />
          <MoverDetailContent label="제공 서비스">
            <Stack flexDirection="row" alignItems="center" gap={{ xs: '8px', md: '12px' }} flexWrap="wrap">
              {data.serviceList?.map((service) => (
                <Stack key={service} sx={serviceChipSx}>
                  <Typo content={getServiceLabel(service)} className="text_M_14to18" color={colorChips.primary[300]} />
                </Stack>
              ))}
            </Stack>
          </MoverDetailContent>
          <Stack sx={dividerSx} />
          <MoverDetailContent label="서비스 가능 지역">
            <Stack flexDirection="row" alignItems="center" gap={{ xs: '8px', md: '12px' }} flexWrap="wrap">
              {data.serviceArea?.map((region) => (
                <Stack key={region} sx={regionChipSx}>
                  <Typo content={getRegionLabel(region)} className="text_M_14to18" color={colorChips.primary[400]} />
                </Stack>
              ))}
            </Stack>
          </MoverDetailContent>
          <Stack sx={dividerSx} />
          <Typo content={'리뷰컴포넌트'} className="text_R_14to18" color={colorChips.black[400]} />
        </Stack>

        {/* 데스크탑 찜하기, 지정견적요청, 공유 버튼*/}
        {isDesktop && (
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
        )}
      </Stack>
      {/* 모바일 찜하기, 지정견적요청 버튼*/}
      {!isDesktop && (
        <Stack sx={mobileButtonWrapperSx}>
          <Stack sx={likeButtonSx} onClick={handleLikeClick}>
            <Image src={likeIconSrc} alt="like" width={24} height={24} />
          </Stack>
          <SolidButton text={'지정 견적 요청하기'} onClick={handleAssignRequest} disabled={isAssigned} />
        </Stack>
      )}
    </>
  );
}

const MoverDetailContent = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <Stack sx={detailContentWrapperSx}>
      <Typo content={label} className="text_SB_16to24" color={colorChips.black[400]} />
      {children}
    </Stack>
  );
};

const contentContainerSx = {
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { xs: 'flex-start', md: 'space-between' },
  gap: { xs: '0px', md: '120px' },
  height: '100%',
  paddingTop: { xs: '16px', sm: '24px' },
  paddingBottom: '40px',
};

const dividerSx = {
  flexShrink: 0,
  width: '100%',
  height: { xs: '24px', md: '40px' },
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
  marginBottom: { xs: '24px', md: '40px' },
};

const profileBoxSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '14px', md: '16px' },
  border: `0.5px solid ${colorChips.line.f2f2f2}`,
  borderRadius: '16px',
  padding: { xs: '16px 14px', md: '20px 24px' },
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.05)',
};

const chipWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: { xs: '8px', md: '12px' },
};

const mobileButtonWrapperSx = {
  position: 'fixed',
  bottom: '0',
  width: 'calc(100% - 48px)',
  height: '74px',
  paddingY: '10px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: colorChips.grayScale[50],
};

const likeButtonSx = {
  flexShrink: 0,
  width: '54px',
  height: '54px',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colorChips.grayScale[50],
  borderRadius: '16px',
  border: `1px solid ${colorChips.line.e6e6e6}`,
  cursor: 'pointer',
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

const detailContentWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '16px', md: '32px' },
};

const detailChipSx = {
  width: 'fit-content',
  alignItems: 'center',
  borderRadius: '100px',
  padding: { xs: '6px 12px', md: '10px 20px' },
};

const serviceChipSx = {
  ...detailChipSx,
  border: `1px solid ${colorChips.primary[300]}`,
  backgroundColor: colorChips.primary[50],
};

const regionChipSx = {
  ...detailChipSx,
  border: `1px solid ${colorChips.grayScale[100]}`,
  backgroundColor: colorChips.background.fafafa,
};
