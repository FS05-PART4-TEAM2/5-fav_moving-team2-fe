import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import { likeMoverList } from '../../core/constants';
import { MoverCardSmall } from './core/components/MoverCardSmall';

// TODO: 찜한 기사님 목록 조회 api 추가
export const LikeMoverFeature = () => {
  const data = likeMoverList;

  if (data.length <= 0) {
    return null; // 데이터 없으면 아예 안보이게
  }

  return (
    <Stack width="100%" height="100%" direction="column" gap="16px">
      <Typo className="text_SB_20" content="찜한 기사님" color={colorChips.black[400]} />
      {data.map((item) => (
        <MoverCardSmall key={item.id} data={item} />
      ))}
    </Stack>
  );
};
