import { CircularProgress, Stack, useMediaQuery } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { ReceivedQuoteCard } from './core/components/ReceivedQuoteCard';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import { CustomerQuoteHistoryData } from '@/shared/types/types';

interface ReceivedQuoteFeatureProps {
  data: CustomerQuoteHistoryData[] | null;
  isLoading: boolean;
}

export const ReceivedQuoteFeature = ({ data, isLoading }: ReceivedQuoteFeatureProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const hasReceivedQuotes = data && data.length > 0;

  if (isLoading) {
    return (
      <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={40} />
      </Stack>
    );
  }

  return (
    <Stack sx={contentContainerSx}>
      {hasReceivedQuotes ? (
        // 받았던 견적 데이터 있는 경우
        <Stack sx={cardWrapperSx}>
          {data.map((item, idx) => (
            <>
              <ReceivedQuoteCard key={item.quotationId} data={item} />
              {isMobile && idx !== data.length - 1 && <Stack sx={dividerSx} />}
            </>
          ))}
        </Stack>
      ) : (
        // 받았던 견적 데이터 없는 경우
        <EmptyDataView type="received" />
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
  py: { xs: '0px', sm: '32px', md: '64px' },
  px: { xs: '0px', sm: '24px' },
};

const cardWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: { xs: '0px', sm: '16px', md: '32px' },
};

const dividerSx = {
  width: '100%',
  height: '8px',
  backgroundColor: colorChips.line.f2f2f2,
};
