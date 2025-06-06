import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';
import theme from '@/shared/theme';
import Card from '@/shared/components/Card/Card';
import { mockReject } from '../mock';

export default function RejectedQuot() {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container spacing={2}>
      {mockReject.map(({ type, data }) => (
        <Grid key={data.id} size={{ xs: 12, md: 6 }}>
          <Card type={type} data={data} />
        </Grid>
      ))}
    </Grid>
  );
}
