'use client';

import { Box, Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import ProgressBar from '@/shared/components/ProgressBar/ProgressBar';
import Image from 'next/image';

interface ReviewSummaryProps {
  ratingCounts: Record<1 | 2 | 3 | 4 | 5, number>;
  totalRating: number;
}

export default function ReviewSummary({ ratingCounts, totalRating }: ReviewSummaryProps) {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery('(max-width:600px)');

  const scores = [5, 4, 3, 2, 1].map((score) => ({
    score,
    count: ratingCounts[score as 1 | 2 | 3 | 4 | 5] ?? 0,
  }));

  const total = scores.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <Stack
      direction={isDesktop ? 'row' : isMobile ? 'column' : 'row'}
      alignItems="center"
      justifyContent="center"
      bgcolor={isDesktop ? colorChips.background.f7f7f7 : ''}
      borderRadius="32px"
      py={isDesktop ? '40px' : ''}
      mt="32px"
      gap={isDesktop ? '83px' : isMobile ? '40px' : '53px'}
    >
      {/* 왼쪽 별점 평균 */}
      <Stack direction="column" alignItems="center">
        <Stack direction="row" gap="8px" alignItems="center">
          <Typo className="text_B_40to64" style={{ color: colorChips.black[300] }} content={totalRating.toFixed(1)} />
          <Typo className="text_B_24to38" content="/ 5" style={{ color: colorChips.grayScale[100] }} />
        </Stack>
        <Stack direction="row" spacing="2px" mt="4px">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Image
              key={idx}
              src="/assets/images/star-icon/star-yellow-24x24.svg"
              alt="star icon"
              width={isDesktop ? 48 : 24}
              height={isDesktop ? 48 : 24}
            />
          ))}
        </Stack>
      </Stack>

      {/* 오른쪽 점수 분포 */}
      <Stack
        bgcolor={colorChips.background.f7f7f7}
        borderRadius="32px"
        py={isDesktop ? '' : '16px'}
        px={isDesktop ? '' : '21.5px'}
      >
        {scores.map(({ score, count }) => (
          <Stack key={score} direction="row" alignItems="center" gap={isDesktop ? '30px' : '16px'}>
            <Typo
              className="text_B_14to20"
              style={{ color: colorChips.black[300], textWrap: 'nowrap' }}
              content={`${score}점`}
            />
            <Box width={isDesktop ? '370px' : '180px'}>
              <ProgressBar type="review" percentage={total ? (count / total) * 100 : 0} />
            </Box>
            <Typo
              className="text_B_14to20"
              style={{ color: colorChips.grayScale[300], textWrap: 'nowrap' }}
              content={`${count}`}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
