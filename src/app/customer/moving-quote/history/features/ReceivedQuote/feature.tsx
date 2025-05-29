import { Stack } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { mockList } from '../../core/constants';

export const ReceivedQuoteFeature = () => {
  // TODO: 받았던 견적 api 연결하기
  // const data = [];
  const data = mockList;

  return (
    <Stack sx={contentContainerSx}>
      {data.length === 0 ? (
        // 받았던 견적 데이터 없는 경우
        <EmptyDataView type="received" />
      ) : (
        // 받았던 견적 데이터 있는 경우
        <Typo content="받았던 견적" className="text_M_16" color={colorChips.black[400]} />
      )}
    </Stack>
  );
};

const contentContainerSx = {
  flex: 1,
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
};
