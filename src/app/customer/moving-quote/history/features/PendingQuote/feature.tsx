import { Stack } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { PendingQuoteCard } from './core/components/PendingQuoteCard';
import { mockList } from '../../core/constants';

export const PendingQuoteFeature = () => {
  // TODO: 대기중 견적 api 연결하기
  //   const data = [];
  const data = mockList;
  const hasOffers = data.offers.length > 0;
  const offers = data.offers;

  return (
    <Stack sx={contentContainerSx}>
      {hasOffers ? (
        // 대기중 견적 데이터 있는 경우
        <Stack sx={cardGridSx}>
          {offers.map((item) => (
            <PendingQuoteCard key={item.offerId} customerQuoteData={data} receivedOffer={item} />
          ))}
        </Stack>
      ) : (
        // 대기중 견적 데이터 없는 경우
        <EmptyDataView type="pending" />
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
  py: { xs: '32px', md: '40px' },
  px: '24px',
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
