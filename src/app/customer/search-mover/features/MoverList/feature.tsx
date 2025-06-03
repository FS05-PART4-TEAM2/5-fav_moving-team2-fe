import { Stack } from '@mui/material';
import { mockMoverListResponse } from '../../core/constants';
import { MoverCard } from './core/components/MoverCard';

export const MoverListFeature = () => {
  const data = mockMoverListResponse.list;

  return (
    <Stack sx={moverListSx}>
      {data.map((item) => (
        <MoverCard key={item.id} data={item} />
      ))}
    </Stack>
  );
};

const moverListSx = {
  width: '100%',
  flexDirection: 'column',
  gap: { xs: '24px', sm: '32px', md: '48px' },
  paddingBottom: '40px',
};
