import { CircularProgress, Stack } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { FinishedReviewList } from './core/components/FinishedReviewList';
import { CommonPagination } from '@/shared/components/Pagination/CommonPagination';
import { useFinishedReviewList } from './core/hooks/useFinishedReviewList';

export const FinishedReviewFeature = () => {
  const { data, isLoading, handleChangePage } = useFinishedReviewList();

  if (isLoading || !data) {
    return (
      <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={40} />
      </Stack>
    );
  }

  const finishedReviewList = data.list;
  const hasReview = finishedReviewList.length > 0;

  return (
    <Stack sx={contentContainerSx}>
      {hasReview ? (
        // 작성한 리뷰 데이터 있는 경우
        <Stack flex={1} direction="column" width="100%" justifyContent="space-between" gap={{ xs: '8px', md: '24px' }}>
          <FinishedReviewList data={finishedReviewList} />
          <Stack width="100%" alignItems="center" justifyContent="center">
            <CommonPagination page={data?.currentPage} totalCount={data?.totalPages} handleChange={handleChangePage} />
          </Stack>
        </Stack>
      ) : (
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
