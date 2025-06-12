'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { CircularProgress, Stack } from '@mui/material';
import { useLikeMoverList } from '@/shared/hooks/useLikeMoverListQuery';
import { useEffect } from 'react';
import Image from 'next/image';
import { LikeMoverCard } from './core/components/LikeMoverCard';
import { useInView } from 'react-intersection-observer';

export default function Page() {
  const { likeMovers, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLikeMoverList();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <Stack
        sx={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
        }}
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (likeMovers.length === 0) {
    return (
      <Stack
        flex={1}
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="20px"
        paddingBottom="40px"
      >
        <Image src="/assets/images/empty-images/profile-01.svg" alt="no results" width={120} height={120} />
        <Typo content="아직 찜한 기사님이 없어요" className="text_R_14to20" color={colorChips.grayScale[300]} />
      </Stack>
    );
  }

  return (
    <Stack sx={moverListSx}>
      {likeMovers.map((item) => (
        <LikeMoverCard key={item.id} data={item} />
      ))}

      {hasNextPage && (
        <>
          <div ref={ref} style={{ height: '20px', marginTop: '20px' }} />
          {isFetchingNextPage && <CircularProgress size={24} />}
        </>
      )}
    </Stack>
  );
}

const moverListSx = {
  display: 'grid',
  width: '100%',
  height: '100%',
  // 모바일/태블릿: 1열
  gridTemplateColumns: '1fr',
  gap: '24px',
  // 데스크탑: 2열
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '24px',
    rowGap: '48px',
  },
  paddingX: '24px',
  paddingBottom: '40px',
  marginTop: { xs: '16px', sm: '24px' },
};
