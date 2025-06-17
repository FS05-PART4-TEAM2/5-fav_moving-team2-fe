'use client';

import { useState } from 'react';
import { Stack, Collapse, SxProps } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

type FilterType = 'all' | 'confirmed';

interface OfferFilterProps {
  onFilterChange: (filter: FilterType) => void;
}

export const OfferFilter = ({ onFilterChange }: OfferFilterProps) => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [isOpen, setIsOpen] = useState(false);

  const filterLabels = {
    all: '전체',
    confirmed: '확정한 견적서',
  };

  const iconColor = isOpen ? colorChips.primary[300] : colorChips.black[100];
  const iconSize = { xs: '16px', md: '24px' };

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (filter: FilterType) => {
    setCurrentFilter(filter);
    setIsOpen(false);
    onFilterChange(filter);
  };

  return (
    <Stack width={'fit-content'} direction={'column'} position={'relative'}>
      <Stack
        sx={{
          ...filterButtonSx,
          backgroundColor: isOpen ? colorChips.primary[50] : colorChips.grayScale[50],
          border: `1px solid ${isOpen ? colorChips.primary[300] : colorChips.line.f2f2f2}`,
        }}
        onClick={handleToggle}
      >
        <Typo
          className="text_M_14to18"
          content={filterLabels[currentFilter]}
          color={isOpen ? colorChips.primary[300] : colorChips.black[400]}
        />
        {isOpen ? (
          <ExpandLessIcon sx={{ color: iconColor, width: iconSize, height: iconSize }} />
        ) : (
          <ExpandMoreIcon sx={{ color: iconColor, width: iconSize, height: iconSize }} />
        )}
      </Stack>

      <Collapse in={isOpen} sx={CollapseStyled}>
        <Stack sx={itemSx} onClick={() => handleFilterSelect('all')}>
          <Typo className="text_M_14to18" content={'전체'} color={colorChips.black[400]} />
        </Stack>
        <Stack sx={itemSx} onClick={() => handleFilterSelect('confirmed')}>
          <Typo className="text_M_14to18" content={'확정한 견적서'} color={colorChips.black[400]} />
        </Stack>
      </Collapse>
    </Stack>
  );
};

const filterButtonSx: SxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: { xs: '127px', md: '190px' },
  height: { xs: '36px', md: '64px' },
  padding: { xs: '6px 14px', md: '16px 24px' },
  borderRadius: { xs: '8px', md: '16px' },
  cursor: 'pointer',
};

const CollapseStyled: SxProps = {
  position: 'absolute',
  top: { xs: '46px', md: '74px' },
  left: '0',
  zIndex: 1000,
  width: '100%',
  borderRadius: { xs: '8px', md: '16px' },
  bgcolor: colorChips.grayScale[50],
  border: `1px solid ${colorChips.line.e6e6e6}`,
};

const itemSx: SxProps = {
  padding: { xs: '6px 14px', md: '19px 24px' },
  cursor: 'pointer',
};
