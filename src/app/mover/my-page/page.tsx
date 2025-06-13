'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';
import { Divider, Stack, useMediaQuery } from '@mui/material';
import { mockQuotation } from '../moving-quote/history/core/mock';
import Card from '@/shared/components/Card/Card';
import ReviewSummary from './_core/components/ReviewSummary';
import { CommonPagination } from '@/shared/components/Pagination/CommonPagination';
import { useEffect, useState } from 'react';

export default function Page() {
  const [page, setPage] = useState(1);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const itemsPerPage = isDesktop ? 5 : isTablet ? 4 : 3;

  const totalReviews = mockQuotation.length;
  const startIdx = (page - 1) * itemsPerPage;
  const pagedReviews = mockQuotation.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(totalReviews / itemsPerPage);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [itemsPerPage, totalPages]);

  //TODO  ReviewSummary :총 리뷰 별점 토탈,1~5 점수 각각 토탈 count 넘겨주기
  //      리뷰 리스트 : 데이터 받아와서 맵핑
  return (
    <Stack height="100%">
      <Stack py={isDesktop ? '32px' : '15px'}>
        <Typo className="text_SB_14to24" style={{ color: colorChips.black.b2b2b }} content="마이페이지" />
      </Stack>

      <Stack pt="24px" gap={isDesktop ? '40px' : '24px'}>
        <Card type="profile" data={mockQuotation[0].data} bgColor />

        <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
        <Stack>
          <Typo className="text_B_16to24" style={{ color: colorChips.black.b2b2b }} content="리뷰 (178)" />
          <ReviewSummary />
        </Stack>

        <Stack>
          {pagedReviews.map((review, idx) => (
            <Card key={idx} type="review" data={review.data} />
          ))}
          <Stack alignItems="center">
            <CommonPagination page={page} totalCount={totalPages} handleChange={(event, value) => setPage(value)} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
