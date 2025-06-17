import { Pagination } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';

interface CustomPaginationProps {
  page: number; // 현재 페이지
  totalCount: number; // 전체 페이지 수
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
/*
ex)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
   setPage(value);
  };
 */
export const CommonPagination: React.FC<CustomPaginationProps> = ({ page, totalCount, handleChange }) => {
  return (
    <Pagination
      defaultPage={1}
      page={page}
      count={totalCount}
      onChange={handleChange}
      siblingCount={1}
      boundaryCount={1}
      variant="text"
      shape="rounded"
      sx={{
        '& .MuiPaginationItem-root': {
          width: { xs: '30px', sm: '34px', md: '48px' },
          height: { xs: '30px', sm: '34px', md: '48px' },
          borderRadius: { xs: '6px', md: '8px' },
          fontFamily: 'pretendard',
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
          lineHeight: { xs: '24px', sm: '28px', md: '40px' },
          marginRight: '4px', // 숫자 버튼 간격
          backgroundColor: colorChips.grayScale[50], // 버튼 배경색
          color: colorChips.grayScale[300], // 버튼의 텍스트 색상
          fontWeight: '400',
          '&.Mui-selected': {
            backgroundColor: colorChips.grayScale[50], // 선택된 버튼 배경색
            color: colorChips.black[400], // 선택된 버튼의 텍스트 색상
            fontWeight: '600',
          },
        },
        '& .MuiPaginationItem-root:last-of-type': {
          marginRight: 0, // 마지막 숫자 버튼 간격 0
        },
        '& .MuiPaginationItem-previousNext': {
          marginRight: { xs: '6px', sm: '8px', md: '10px' },
          color: colorChips.black[400], // 활성화 색상
        },
      }}
    />
  );
};
