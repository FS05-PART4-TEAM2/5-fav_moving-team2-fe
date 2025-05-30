import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';

// 최상위 stack에 paddingX="24px" 넣기
export default function Page() {
  return (
    <Stack height="100%" bgcolor={colorChips.secondary.yellow[100]} paddingX="24px">
      <Typo className="text_B_20" content="일반유저 견적상세 페이지" />
    </Stack>
  );
}
