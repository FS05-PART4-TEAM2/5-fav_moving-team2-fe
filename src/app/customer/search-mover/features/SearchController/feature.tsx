import { Stack, useMediaQuery } from '@mui/material';
import theme from '@/shared/theme';
import { useState } from 'react';
import { useSearchMoverStore } from '../../core/hooks/useSearchMoverStore';
import { SearchOptionFilter } from '../../core/components/SearchOptionFilter';
import SearchBar from '@/shared/components/Input/SearchBar';
import { OrderOptionFilter } from './core/components/OrderOptionFilter';

type OpenFilterType = 'region' | 'service' | 'order' | null;

export const SearchControllerFeature = () => {
  const { updateParams } = useSearchMoverStore();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [openFilter, setOpenFilter] = useState<OpenFilterType>(null);

  const handleFilterToggle = (filterType: OpenFilterType) => {
    if (openFilter === filterType) {
      // 같은 필터를 클릭하면 닫기
      setOpenFilter(null);
    } else {
      // 다른 필터를 클릭하면 해당 필터만 열기
      setOpenFilter(filterType);
    }
  };

  const handleChangeKeyword = (keyword: string) => {
    updateParams('keyword', keyword);
  };

  return (
    <Stack sx={searchControllerSx}>
      <Stack sx={filterWrapperSx}>
        {!isDesktop && (
          <Stack direction="row" alignItems="center" gap={{ xs: '8px', sm: '12px' }}>
            <SearchOptionFilter
              filterType="region"
              isOpen={openFilter === 'region'}
              onToggle={() => handleFilterToggle('region')}
            />
            <SearchOptionFilter
              filterType="service"
              isOpen={openFilter === 'service'}
              onToggle={() => handleFilterToggle('service')}
            />
          </Stack>
        )}
        <OrderOptionFilter isOpen={openFilter === 'order'} onToggle={() => handleFilterToggle('order')} />
      </Stack>
      <SearchBar onSearch={handleChangeKeyword} />
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
