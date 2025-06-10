import { CircularProgress, Stack } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { CustomerFinishedReviewListResponseData } from '@/shared/types/types';
import { mockFinishedListResponse } from '../../core/constants';
import { FinishedReviewList } from './core/components/FinishedReviewList';

export const FinishedReviewFeature = () => {
  // TODO: api 연결
  const isLoading = false;
  const data: CustomerFinishedReviewListResponseData = mockFinishedListResponse;

  const finishedReviewList = data.list;
  const hasReview = finishedReviewList.length > 0;

  if (isLoading) {
    return (
      <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={80} />
      </Stack>
    );
  }

  return (
    <Stack sx={contentContainerSx}>
      {hasReview ? (
        // 작성한 리뷰 데이터 있는 경우
        <FinishedReviewList data={finishedReviewList} />
      ) : (
        // TODO: 페이지네이션
        // 데이터 없는 경우
        <EmptyDataView type="finished" />
      )}
    </Stack>
  );
};

const contentContainerSx = {
  flex: 1,
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '40px 24px',
};
