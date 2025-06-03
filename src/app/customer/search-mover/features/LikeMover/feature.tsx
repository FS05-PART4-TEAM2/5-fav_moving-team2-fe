import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';

export const LikeMoverFeature = () => {
  return (
    <Stack width="100%" height="100%" direction="column" gap="16px">
      <Typo className="text_SB_20" content="찜한 기사님" color={colorChips.black[400]} />
    </Stack>
  );
};
