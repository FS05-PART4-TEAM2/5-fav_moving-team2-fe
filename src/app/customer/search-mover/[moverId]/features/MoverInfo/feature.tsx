import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { SearchMoverDetailResponse, MoverDetailReviewResponse } from '@/shared/types/types';
import { MoverProfileBase } from '@/shared/components/Card/MoverProfileBase';
import Chip from '@/shared/components/Chip/Chip';
import { ShareButtons } from '@/shared/components/Button/ShareButtons';
import { SERVICE_TYPES, REGIONS } from '@/shared/constants';
import { MoverReviewFeature } from '../MoverReview/feature';

interface MoverInfoProps {
  data: SearchMoverDetailResponse;
  shareUrl: string;
  shareLinkTitle: string;
  isDesktop: boolean;
  reviewData: MoverDetailReviewResponse;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const MoverInfoFeature = ({
  data,
  isDesktop,
  shareUrl,
  shareLinkTitle,
  reviewData,
  handleChangePage,
}: MoverInfoProps) => {
  const isAssigned = data.isAssigned;
  const hasReview = data.reviewCounts > 0;
  const reviewSectionTitle = `리뷰 (${data.reviewCounts})`;
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

  // key 값을 한글 label로 변환하는 함수들
  const getServiceLabel = (serviceKey: string) => {
    return SERVICE_TYPES.find((service) => service.key === serviceKey)?.label || serviceKey;
  };

  const getRegionLabel = (regionKey: string) => {
    return REGIONS.find((region) => region.key === regionKey)?.label || regionKey;
  };

  return (
    <Stack width="100%" direction="column">
      <Stack sx={profileBoxSx}>
        <Stack sx={chipWrapperSx}>
          <Chip type={data.serviceList?.[0] ?? 'SMALL_MOVE'} />
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
          <ShareButtons title={shareLinkTitle} shareUrl={shareUrl} isDesktop={isDesktop} textStyle="text_SB_14to20" />
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

      {/* 리뷰 */}
      <Stack direction="column" width="100%" gap="32px">
        <Typo content={reviewSectionTitle} className="text_SB_16to24" color={colorChips.black[400]} />
        <MoverReviewFeature data={reviewData} hasReview={hasReview} handleChangePage={handleChangePage} />
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
