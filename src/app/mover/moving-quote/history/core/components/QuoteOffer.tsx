import Grid from '@mui/material/Grid';
import { CircularProgress, Stack, useMediaQuery } from '@mui/material';
import theme from '@/shared/theme';
import Card from '@/shared/components/Card/Card';
import { useEffect, useRef } from 'react';
import { mapSentQuotationToCardData, useInfiniteSentQuotations } from '../hook/historyHooks';
import Image from 'next/image';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

export default function QuoteOffer() {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteSentQuotations();

  const list = data?.pages.flatMap((page) => page.list) ?? [];
  const cards = list.map(mapSentQuotationToCardData);
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
  }, [bottomRef.current, hasNextPage]);

  return (
    <Grid container spacing={2} width="100%" justifyContent={isJustifyContent ? 'center' : ''}>
      {isPending ? (
        <Stack py={isMd ? '80px' : '200px'} gap={isMd ? '24px' : '32px'} justifyContent="center" alignItems="center">
          <CircularProgress size={64} thickness={5} />
        </Stack>
      ) : list.length === 0 ? (
        <Stack py={isMd ? '80px' : '180px'} gap={isMd ? '24px' : '32px'} justifyContent="center" alignItems="center">
          <Image
            src="/assets/images/empty-images/review-blue-02.svg"
            alt="empty quotation"
            width={isMd ? 110 : 184}
            height={isMd ? 82 : 136}
          />
          <Typo
            className="text_R_14to20"
            style={{ color: colorChips.grayScale[400] }}
            content=" 아직 보낸 견적이 없습니다!"
          />
        </Stack>
      ) : (
        cards.map(({ type, data }) => (
          <Grid key={data.id} size={{ xs: 12, md: 6 }}>
            <Card type={type} data={data} height={isMd ? ' ' : '260px'} />
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
