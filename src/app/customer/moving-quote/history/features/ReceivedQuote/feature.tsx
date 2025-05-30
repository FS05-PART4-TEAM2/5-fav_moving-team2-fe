import { Stack, useMediaQuery } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { receivedQuoteList } from '../../core/constants';
import { ReceivedQuoteCard } from './core/components/ReceivedQuoteCard';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';

export const ReceivedQuoteFeature = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
          {data.map((item, idx) => (
            <>
              <ReceivedQuoteCard key={item.quotationId} data={item} />
              {isMobile && idx !== data.length - 1 && <Stack sx={dividerSx} />}
            </>
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
