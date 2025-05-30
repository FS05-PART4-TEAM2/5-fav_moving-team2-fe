import { Stack } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { receivedQuoteList } from '../../core/constants';
import { ReceivedQuoteCard } from './core/components/ReceivedQuoteCard';

export const ReceivedQuoteFeature = () => {
  // TODO: 받았던 견적 api 연결하기
  // const data = [];
  const data = receivedQuoteList;

  return (
    <Stack sx={contentContainerSx}>
      {data.length === 0 ? (
        // 받았던 견적 데이터 없는 경우
        <EmptyDataView type="received" />
      ) : (
        // 받았던 견적 데이터 있는 경우
        <Stack sx={cardWrapperSx}>
          {data.map((item) => (
            <ReceivedQuoteCard key={item.quotationId} data={item} />
          ))}
        </Stack>
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

const cardWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: { xs: '8px', sm: '16px', md: '32px' },
};
