import { Stack, useMediaQuery } from '@mui/material';
import SearchBar from '@/shared/components/Input/SearchBar';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';

export const SearchControllerFeature = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack sx={searchControllerSx}>
      <Stack sx={filterWrapperSx}>
        {!isDesktop && <Typo className="text_M_20" content="검색 필터" color={colorChips.black[400]} />}
        <Typo className="text_M_20" content="정렬 필터" color={colorChips.black[400]} />
      </Stack>
      <SearchBar onSearch={() => {}} />
    </Stack>
  );
};

const searchControllerSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
};

const filterWrapperSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  justifyContent: { xs: 'space-between', md: 'flex-end' },
  alignItems: 'center',
  padding: { xs: '16px 0px', md: '0px 0px 24px 0px' },
  gap: '20px',
};
