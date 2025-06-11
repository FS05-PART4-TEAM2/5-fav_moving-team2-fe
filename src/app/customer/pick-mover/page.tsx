'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { CircularProgress, Stack, Box } from '@mui/material';
import { useLikeMoverList } from '@/shared/hooks/useLikeMoverListQuery';
import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LikeMoverCard } from './core/components/LikeMoverCard';

export default function Page() {
  const { likeMovers, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLikeMoverList();
  const observerRef = useRef<HTMLDivElement>(null);

  // 무한스크롤을 위한 Intersection Observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [handleObserver]);

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
        <Typo content="검색 결과가 없습니다." className="text_R_14to20" color={colorChips.grayScale[300]} />
      </Stack>
    );
  }

  return (
    <Stack sx={moverListSx}>
      {likeMovers.map((item) => (
        <LikeMoverCard key={item.id} data={item} />
      ))}

      {/* 무한스크롤 트리거 */}
      <Box ref={observerRef} sx={{ height: '100px' }} />

      {/* 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <Stack sx={{ alignItems: 'center', padding: '20px' }}>
          <CircularProgress size={24} />
        </Stack>
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
  gap: '32px',
  // 데스크탑: 2열
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '24px',
    rowGap: '48px',
  },
  paddingX: '24px',
  paddingBottom: '40px',
};
