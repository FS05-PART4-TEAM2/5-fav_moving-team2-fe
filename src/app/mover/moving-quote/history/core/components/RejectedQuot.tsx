import Grid from '@mui/material/Grid';
import { CircularProgress, useMediaQuery } from '@mui/material';
import theme from '@/shared/theme';
import Card from '@/shared/components/Card/Card';
import { useEffect, useRef } from 'react';
import { mapRejectedQuotationToCardData, useInfiniteRejectedQuotations } from '../hook/historyHooks';
import { Stack } from '@mui/system';
import { Typo } from '@/shared/styles/Typo/Typo';
import Image from 'next/image';
import { colorChips } from '@/shared/styles/colorChips';

export default function RejectedQuot({ tabType }: { tabType: string }) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, refetch } =
    useInfiniteRejectedQuotations(tabType);

  const list = data?.pages.flatMap((page) => page.list) ?? [];

  const cards = list.map(mapRejectedQuotationToCardData);

  const isJustifyContent = isPending || isFetchingNextPage || list.length === 0;

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomRef.current, hasNextPage]);

  useEffect(() => {
    refetch();
  }, [tabType, refetch]);

  return (
    <Grid container spacing={2} width="100%" justifyContent={isJustifyContent ? 'center' : ''}>
      {isPending ? (
        <Stack py={isMd ? '80px' : '200px'} gap={isMd ? '24px' : '32px'} justifyContent="center" alignItems="center">
          <CircularProgress size={64} thickness={5} />
        </Stack>
      ) : cards.length === 0 ? (
        <Stack py={isMd ? '80px' : '180px'} gap={isMd ? '24px' : '32px'} justifyContent="center" alignItems="center">
          <Image
            src="/assets/images/empty-images/review-blue-02.svg"
            alt="request Icon"
            width={isMd ? 110 : 184}
            height={isMd ? 82 : 136}
          />
          <Typo
            className="text_R_14to20"
            style={{ color: colorChips.grayScale[400] }}
            content="아직 반려된 요청이 없어요!"
          />
        </Stack>
      ) : (
        cards.map((data) => (
          <Grid key={data.id} size={{ xs: 12, md: 6 }}>
            <Card type="rejectRequest" data={data} />
          </Grid>
        ))
      )}
      <Stack ref={bottomRef} />
      {isFetchingNextPage && (
        <Stack py={isMd ? '80px' : '200px'} gap={isMd ? '24px' : '32px'} justifyContent="center" alignItems="center">
          <CircularProgress size={64} thickness={5} />
        </Stack>
      )}
    </Grid>
  );
}
