import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { SearchMoverDetailResponse } from '@/shared/types/types';
import { ShareButtons } from '@/shared/components/Button/ShareButtons';
import { SERVICE_TYPES, REGIONS } from '@/shared/constants';
import { ReviewSection } from './components/ReviewSection';
import { ProfileSection } from './components/ProfileSection';

interface MoverInfoProps {
  data: SearchMoverDetailResponse;
  shareUrl: string;
  shareLinkTitle: string;
}

export const MoverInfoFeature = ({ data, shareUrl, shareLinkTitle }: MoverInfoProps) => {
  const hasReview = data.reviewCounts > 0;
  const reviewSectionTitle = `리뷰 (${data.reviewCounts})`;
  const moverId = data.id;

  // key 값을 한글 label로 변환하는 함수들
  const getServiceLabel = (serviceKey: string) => {
    return SERVICE_TYPES.find((service) => service.key === serviceKey)?.label || serviceKey;
  };

  const getRegionLabel = (regionKey: string) => {
    return REGIONS.find((region) => region.key === regionKey)?.label || regionKey;
  };

  return (
    <Stack width="100%" direction="column">
      <ProfileSection moverId={moverId} />
      <Stack sx={dividerSx} />

      {/* 데스크탑이 아닐 때만 공유버튼 표시 - CSS로 반응형 처리 */}
      <Stack sx={mobileShareButtonSx}>
        <ShareButtons title={shareLinkTitle} shareUrl={shareUrl} isDesktop={false} textStyle="text_SB_14to20" />
        <Stack sx={dividerSx} />
      </Stack>

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

      {/* 리뷰 */}
      <Stack direction="column" width="100%" gap="32px">
        <Typo content={reviewSectionTitle} className="text_SB_16to24" color={colorChips.black[400]} />
        <ReviewSection hasReview={hasReview} moverId={moverId} />
      </Stack>
    </Stack>
  );
};

const MoverDetailContent = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <Stack sx={detailContentWrapperSx}>
      <Typo content={label} className="text_SB_16to24" color={colorChips.black[400]} />
      {children}
    </Stack>
  );
};

const dividerSx = {
  flexShrink: 0,
  width: '100%',
  height: { xs: '24px', md: '40px' },
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
  marginBottom: { xs: '24px', md: '40px' },
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

// 모바일에서만 표시되는 공유버튼 스타일
const mobileShareButtonSx = {
  display: { xs: 'block', md: 'none' }, // 데스크탑에서는 숨김
};
