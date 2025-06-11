import { Stack, CircularProgress, Box } from '@mui/material';
import { useEffect, useRef, useCallback } from 'react';
import { useMoverList } from '../../core/hooks/useMoverListQuery';
import { MoverCard } from './core/components/MoverCard';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import Image from 'next/image';

export const MoverListFeature = () => {
  const { movers, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useMoverList();
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
      <Stack sx={{ ...moverListSx, alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (movers.length === 0) {
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
      {movers.map((item) => (
        <MoverCard key={item.id} data={item} />
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
};

const moverListSx = {
  width: '100%',
  flexDirection: 'column',
  gap: { xs: '24px', sm: '32px', md: '48px' },
  paddingBottom: '40px',
};
