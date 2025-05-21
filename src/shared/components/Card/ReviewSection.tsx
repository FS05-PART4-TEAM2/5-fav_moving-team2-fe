import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { PresetCardName, UserCardData } from './CardPresets';

interface ReviewSectionProps {
  type: PresetCardName;
  data: UserCardData;
}

export default function ReviewSection({ type, data }: ReviewSectionProps) {
  return (
    <Stack spacing="8px">
      <Typo className="text_SB_16">{data.name} 기사님</Typo>
      <Typo className="text_R_14">{data.reviewContent || '작성된 리뷰가 없습니다.'}</Typo>
    </Stack>
  );
}
