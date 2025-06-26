'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';
import { Divider, Stack, useMediaQuery } from '@mui/material';
import Card from '@/shared/components/Card/Card';
import ReviewSummary from './_core/components/ReviewSummary';
import { CommonPagination } from '@/shared/components/Pagination/CommonPagination';
import { useState } from 'react';
import useUserStore from '@/shared/store/useUserStore';
import {
  mapMoverProfileToCardData,
  mapReviewToCardData,
  useMoverDetail,
  useReviewList,
} from './_core/hook/myPageHooks';
import Image from 'next/image';

export default function Page() {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [page, setPage] = useState(1);

  const { userInfo } = useUserStore();

  const userId = userInfo?.id ?? '';

  const { data: moverDetail } = useMoverDetail(userId);
  const { data } = useReviewList(userId, page);

  if (!userInfo || !moverDetail) return null;

  const reviews = data?.list ?? [];
  const totalPages = data?.totalPages ?? 1;

  const userCardData = mapMoverProfileToCardData(moverDetail, userInfo);

  return (
    <Stack height="100%">
      <Stack py={isDesktop ? '32px' : '15px'}>
        <Typo className="text_SB_16to24" style={{ color: colorChips.black.b2b2b }} content="마이페이지" />
      </Stack>

      <Stack pt="24px" gap={isDesktop ? '40px' : '24px'}>
        <Card type="profile" data={userCardData} bgColor />

        <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />

        {reviews.length > 0 && (
          <Stack>
            <Typo
              className="text_B_16to24"
              style={{ color: colorChips.black.b2b2b }}
              content={`리뷰 (${reviews.length})`}
            />
            <ReviewSummary
              totalRating={data?.totalRating ?? 0}
              ratingCounts={data?.ratingCounts ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }}
            />
          </Stack>
        )}

        <Stack>
          {reviews.length === 0 ? (
            <Stack
              py={isDesktop ? '180px' : '80px'}
              gap={isDesktop ? '32px' : '24px'}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/assets/images/empty-images/review-blue-02.svg"
                alt="request Icon"
                width={isDesktop ? 110 : 184}
                height={isDesktop ? 82 : 136}
              />
              <Typo
                className="text_R_14to20"
                style={{ color: colorChips.grayScale[400] }}
                content="아직 작성된 리뷰가 없어요!"
              />
            </Stack>
          ) : (
            reviews.map((review) => <Card key={review.id} type="review" data={mapReviewToCardData(review)} />)
          )}
          {reviews.length > 0 && (
            <Stack alignItems="center">
              <CommonPagination
                page={page}
                totalCount={totalPages}
                handleChange={(e, value) => {
                  if (value <= totalPages) setPage(value);
                }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
