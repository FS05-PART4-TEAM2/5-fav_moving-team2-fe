import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';

// 최상위 stack에 paddingX="24px" 넣기
export default function Page() {
  return (
    <Stack height="100%" paddingX="24px" bgcolor={colorChips.secondary.yellow[100]}>
      <Typo className="text_B_20" content="기사님 - 보낸 견적 - 견적상세 페이지" />
    </Stack>
  );
}
