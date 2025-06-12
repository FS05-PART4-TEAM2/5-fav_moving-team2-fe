import { CircularProgress, Stack } from '@mui/material';
import { EmptyDataView } from '../../core/components/EmptyDataView';
import { WriteReviewList } from './core/components/WriteReviewList';
import { CommonPagination } from '@/shared/components/Pagination/CommonPagination';
import { useWriteReviewList } from './core/hooks/useWriteReviewList';

export const WriteReviewFeature = () => {
  const { data, isLoading, handleChangePage } = useWriteReviewList();

  if (isLoading || !data) {
    return (
      <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={40} />
      </Stack>
    );
  }

  const writeReviewList = data?.list;
  const hasReview = writeReviewList?.length > 0;

  return (
    <Stack sx={contentContainerSx}>
      {hasReview ? (
        // 작성 가능한 리뷰 데이터 있는 경우
        <Stack direction="column" width="100%" gap={{ xs: '8px', md: '24px' }}>
          <WriteReviewList data={writeReviewList} />
          <Stack width="100%" alignItems="center" justifyContent="center">
            <CommonPagination page={data?.currentPage} totalCount={data?.totalPages} handleChange={handleChangePage} />
          </Stack>
        </Stack>
      ) : (
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
