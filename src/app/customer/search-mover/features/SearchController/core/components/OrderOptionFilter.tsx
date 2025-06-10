'use client';

import { Stack, Collapse, SxProps } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { MoverFilterOption } from '@/shared/types/types';
import { useSearchMoverStore } from '@/app/customer/search-mover/core/hooks/useSearchMoverStore';

interface OrderOptionFilterProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const orderOptionFilter: { key: MoverFilterOption; label: string }[] = [
  {
    key: 'MOSTREVIEW',
    label: '리뷰 많은순',
  },
  {
    key: 'BESTRATING',
    label: '평점 높은순',
  },
  {
    key: 'HIGHESTEXP',
    label: '경력 높은순',
  },
  {
    key: 'MOSTCONFIRM',
    label: '확정 많은순',
  },
];

export const OrderOptionFilter = ({ isOpen = false, onToggle }: OrderOptionFilterProps) => {
  const { params, updateParams } = useSearchMoverStore();

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    }
  };

  const handleItemSelect = (value: MoverFilterOption) => {
    updateParams('orderBy', value);

    // 선택 후 필터 닫기
    if (onToggle) {
      onToggle();
    }
  };

  // 버튼에 표시될 텍스트 가져오기
  const getButtonText = () => {
    const selectedItem = orderOptionFilter.find((item) => item.key === params.orderBy);
    return selectedItem ? selectedItem.label : '리뷰 많은순';
  };

  return (
    <Stack width="fit-content" direction={'column'} position={'relative'}>
      <Stack sx={filterButtonSx} onClick={handleToggle}>
        <Typo className="text_SB_12to14" content={getButtonText()} color={colorChips.black[400]} />
        {isOpen ? (
          <ExpandLessIcon sx={{ color: colorChips.grayScale[200], width: '20px', height: '20px' }} />
        ) : (
          <ExpandMoreIcon sx={{ color: colorChips.grayScale[200], width: '20px', height: '20px' }} />
        )}
      </Stack>

      <Collapse in={isOpen} sx={collapseSx}>
        <Stack direction="column">
          {orderOptionFilter.map((item) => (
            <Stack key={item.key} sx={itemSx} onClick={() => handleItemSelect(item.key)}>
              <Typo
                className="text_M_12to14"
                content={item.label}
                color={params.orderBy === item.key ? colorChips.primary[300] : colorChips.black[400]}
              />
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const filterButtonSx: SxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  width: { xs: '100px', md: '120px' },
  height: { xs: '32px', md: '40px' },
  gap: { xs: '4px', md: '10px' },
  padding: { xs: '6px 8px', md: '8px 10px' },
  cursor: 'pointer',
};

const collapseSx: SxProps = {
  flexShrink: 0,
  width: '100%',
  position: 'absolute',
  top: { xs: '42px', md: '50px' },
  left: '0',
  zIndex: 1000,
  borderRadius: '8px',
  bgcolor: colorChips.grayScale[50],
  border: `1px solid ${colorChips.line.e6e6e6}`,
};

const itemSx: SxProps = {
  padding: { xs: '6px 8px', md: '8px 10px' },
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: colorChips.primary[50],
  },
};
