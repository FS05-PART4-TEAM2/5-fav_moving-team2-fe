import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { SearchOptionFilter } from '../../core/components/SearchOptionFilter';
import { useSearchMoverStore } from '../../core/hooks/useSearchMoverStore';

type OpenFilterType = 'region' | 'service' | null;

export const SearchFilterFeature = () => {
  const [openFilter, setOpenFilter] = useState<OpenFilterType>(null);
  const { reset } = useSearchMoverStore();

  const handleCLickClear = () => {
    reset();
    setOpenFilter(null); // 필터도 모두 닫기
  };

  const handleFilterToggle = (filterType: 'region' | 'service') => {
    if (openFilter === filterType) {
      // 같은 필터를 클릭하면 닫기
      setOpenFilter(null);
    } else {
      // 다른 필터를 클릭하면 해당 필터만 열기
      setOpenFilter(filterType);
    }
  };

  return (
    <Stack sx={filterWrapperSx}>
      <Stack sx={filterTitleSx}>
        <Typo className="text_M_20" content="필터" color={colorChips.black[400]} />
        <Typo
          className="text_M_16"
          content="초기화"
          color={colorChips.grayScale[300]}
          customStyle={{ cursor: 'pointer' }}
          onClick={handleCLickClear}
        />
      </Stack>
      <Stack sx={filterContentSx}>
        <Typo className="text_SB_18" content="지역을 선택해주세요" color={colorChips.black[400]} />
        <SearchOptionFilter
          filterType="region"
          isOpen={openFilter === 'region'}
          onToggle={() => handleFilterToggle('region')}
        />
      </Stack>
      <Stack sx={filterContentSx}>
        <Typo className="text_SB_18" content="어떤 서비스가 필요하세요?" color={colorChips.black[400]} />
        <SearchOptionFilter
          filterType="service"
          isOpen={openFilter === 'service'}
          onToggle={() => handleFilterToggle('service')}
        />
      </Stack>
    </Stack>
  );
};

const filterWrapperSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  gap: '32px',
};

const filterTitleSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 10px',
  gap: '20px',
  borderBottom: `1px solid ${colorChips.line.e6e6e6}`,
};

const filterContentSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  gap: '16px',
};
