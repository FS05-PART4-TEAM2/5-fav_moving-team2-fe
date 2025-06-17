import { Stack, CircularProgress } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { PendingQuoteCard } from './core/components/PendingQuoteCard';
import useUserStore from '@/shared/store/useUserStore';
import { CustomerQuoteHistoryData, ReceivedOffers } from '@/shared/types/types';

interface PendingQuoteFeatureProps {
  data: CustomerQuoteHistoryData[] | null;
  isLoading: boolean;
}

export const PendingQuoteFeature = ({ data, isLoading }: PendingQuoteFeatureProps) => {
  const { customerData } = useUserStore();
  const hasQuotation = customerData?.hasQuotation ?? false;

  const offers = data?.[0]?.offers ?? [];
  const hasOffers = offers.length > 0;

  if (isLoading) {
    return (
      <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={40} />
      </Stack>
    );
  }

  return (
    <Stack sx={contentContainerSx}>
      {data && hasOffers ? (
        // 대기중 견적 데이터 있는 경우
        <Stack sx={cardGridSx}>
          {offers.map((item: ReceivedOffers) => (
            <PendingQuoteCard key={item.offerId} customerQuoteData={data[0]} receivedOffer={item} />
          ))}
        </Stack>
      ) : (
        // 대기중 견적 데이터 없는 경우
        <EmptyDataView type="pending" hasQuotation={hasQuotation} />
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
