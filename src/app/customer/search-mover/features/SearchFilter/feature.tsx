import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';

export const SearchFilterFeature = () => {
  // TODO : 초기화 기능 구현
  const handleCLickClear = () => {};
  return (
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
  );
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
