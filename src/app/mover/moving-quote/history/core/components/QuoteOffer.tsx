import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';
import theme from '@/shared/theme';
import Card from '@/shared/components/Card/Card';
import { mockQuotation } from '../mock';

export default function QuoteOffer() {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container spacing={2}>
      {mockQuotation.map(({ type, data }) => (
        <Grid key={data.id} size={{ xs: 12, md: 6 }}>
          <Card type={type} data={data} />
        </Grid>
      ))}
    </Grid>
  );
}
