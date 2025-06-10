import { CircularProgress, Stack } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { WriteReviewList } from './core/components/WriteReviewList';
import { CustomerWriteReviewListResponseData } from '@/shared/types/types';
import { mockWriteListResponse } from '../../core/constants';

export const WriteReviewFeature = () => {
  // TODO: api 연결
  const isLoading = false;
  const data: CustomerWriteReviewListResponseData = mockWriteListResponse;

  const writeReviewList = data.list;
  const hasReview = writeReviewList.length > 0;

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
        // 작성 가능한 리뷰 데이터 있는 경우
        <WriteReviewList data={writeReviewList} />
      ) : (
        // TODO: 페이지네이션
        // 데이터 없는 경우
        <EmptyDataView type="write" />
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
