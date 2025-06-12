'use client';

import { Skeleton, Stack } from '@mui/material';
import theme from '@/shared/theme';

export default function RequestCardSkeleton() {
  const isMd = typeof window !== 'undefined' && window.innerWidth < theme.breakpoints.values.md;

  return (
    <Stack
      width="100%"
      padding={isMd ? '16px' : '24px'}
      spacing={isMd ? 2 : 3}
      border={`1px solid ${theme.palette.grey[200]}`}
      borderRadius="12px"
      bgcolor="white"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={isMd ? 36 : 48} height={isMd ? 36 : 48} />
        <Stack spacing={1} flex={1}>
          <Skeleton variant="text" width="30%" height={isMd ? 16 : 20} />
          <Skeleton variant="text" width="20%" height={isMd ? 14 : 18} />
        </Stack>
        <Skeleton variant="rounded" width={isMd ? 60 : 80} height={isMd ? 28 : 32} />
      </Stack>

      <Stack direction={isMd ? 'column' : 'row'} spacing={isMd ? 1 : 3}>
        <Skeleton variant="text" width={isMd ? '80%' : '30%'} height={isMd ? 16 : 18} />
        <Skeleton variant="text" width={isMd ? '80%' : '30%'} height={isMd ? 16 : 18} />
        <Skeleton variant="text" width={isMd ? '80%' : '30%'} height={isMd ? 16 : 18} />
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Skeleton variant="rounded" width={isMd ? 80 : 100} height={isMd ? 28 : 36} />
        <Skeleton variant="rounded" width={isMd ? 80 : 100} height={isMd ? 28 : 36} />
      </Stack>
    </Stack>
  );
}
