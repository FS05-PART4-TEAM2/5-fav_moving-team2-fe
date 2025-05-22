import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';

export default function Page() {
  return (
    <Stack height="100%" bgcolor={colorChips.secondary.yellow[100]}>
      <Typo className="text_B_20" content="찜한 기사님 페이지 - 탭바x 타이틀이 있는 헤더" />
    </Stack>
  );
}
