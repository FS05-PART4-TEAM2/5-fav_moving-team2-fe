import { Stack } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { PendingQuoteCard } from './core/components/PendingQuoteCard';
import { mockList } from '../../core/constants';

export const PendingQuoteFeature = () => {
  // TODO: 대기중 견적 api 연결하기
  //   const data = [];
  const data = mockList;

  return (
    <Stack sx={contentContainerSx}>
      {data.length === 0 ? (
        // 대기중 견적 데이터 없는 경우
        <EmptyDataView type="pending" />
      ) : (
        // 대기중 견적 데이터 있는 경우
        <Stack sx={cardGridSx}>
          {data.map((item) => (
            <PendingQuoteCard key={item.id} data={item} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const contentContainerSx = {
  flex: 1,
  width: '100%',
  height: '100vh',
  overflowY: 'scroll',
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  py: {
    xs: '32px',
    md: '40px',
  },
  px: '2px',
};

const cardGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
  gap: {
    xs: '24px',
    sm: '32px',
    md: '48px 24px',
  },
  width: '100%',
};
