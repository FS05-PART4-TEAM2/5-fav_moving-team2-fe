'use client';

import { Stack, Collapse, SxProps, Box } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { ServiceFilter, RegionFilter } from '@/shared/constants';
import { MovingType, RegionType } from '@/shared/types/types';
import { useSearchMoverStore } from '../hooks/useSearchMoverStore';

type FilterType = 'region' | 'service';

interface SearchOptionFilterProps {
  filterType: FilterType;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const SearchOptionFilter = ({ filterType, isOpen = false, onToggle }: SearchOptionFilterProps) => {
  const { params, updateParams } = useSearchMoverStore();

  // store에서 현재 선택된 값 가져오기 (null이면 'ALL'로 표시)
  const selectedRegion = params.region || 'ALL';
  const selectedService = params.service || 'ALL';

  const filterLabels = {
    region: '지역',
    service: '서비스',
  };

  const iconColor = isOpen ? colorChips.primary[300] : colorChips.black[100];
  const iconSize = { xs: '16px', md: '24px' };

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    }
  };

  const handleItemSelect = (value: RegionType | MovingType) => {
    // ALL 선택시 null로 변환, 그 외에는 선택된 값으로 설정
    const storeValue = value === 'ALL' ? null : value;

    if (filterType === 'region') {
      updateParams('region', storeValue);
    } else if (filterType === 'service') {
      updateParams('service', storeValue);
    }

    // 선택 후 필터 닫기
    if (onToggle) {
      onToggle();
    }
  };

  const getSelectedValue = () => {
    return filterType === 'region' ? selectedRegion : selectedService;
  };

  const getFilterItems = () => {
    return filterType === 'region' ? RegionFilter : ServiceFilter;
  };

  // 버튼에 표시될 텍스트 가져오기
  const getButtonText = () => {
    const selectedValue = getSelectedValue();

    if (selectedValue === 'ALL') {
      return filterLabels[filterType];
    }

    const items = getFilterItems();
    const selectedItem = items.find((item) => item.key === selectedValue);
    return selectedItem ? selectedItem.label : filterLabels[filterType];
  };

  const renderItems = () => {
    const items = getFilterItems();
    const selectedValue = getSelectedValue();

    if (filterType === 'region') {
      // 지역은 2열로 표시
      const rows = [];
      for (let i = 0; i < items.length; i += 2) {
        const row = items.slice(i, i + 2);
        rows.push(
          <Stack key={i} direction="row" width="100%">
            <Stack
              key={row[0].key}
              sx={{
                ...itemSx,
                flex: 1,
              }}
              onClick={() => handleItemSelect(row[0].key)}
            >
              <Typo
                className="text_M_14to18"
                content={row[0].label}
                color={selectedValue === row[0].key ? colorChips.primary[300] : colorChips.black[400]}
              />
            </Stack>
            {row.length === 2 && (
              <>
                <Box
                  sx={{
                    width: '1px',
                    backgroundColor: colorChips.line.e6e6e6,
                    alignSelf: 'stretch',
                  }}
                />
                <Stack
                  key={row[1].key}
                  sx={{
                    ...itemSx,
                    flex: 1,
                  }}
                  onClick={() => handleItemSelect(row[1].key)}
                >
                  <Typo
                    className="text_M_14to18"
                    content={row[1].label}
                    color={selectedValue === row[1].key ? colorChips.primary[300] : colorChips.black[400]}
                  />
                </Stack>
              </>
            )}
            {row.length === 1 && <Box sx={{ flex: 1 }} />}
          </Stack>,
        );
      }
      return rows;
    } else {
      // 서비스는 1열로 표시
      return items.map((item) => (
        <Stack key={item.key} sx={itemSx} onClick={() => handleItemSelect(item.key)}>
          <Typo
            className="text_M_14to18"
            content={item.label}
            color={selectedValue === item.key ? colorChips.primary[300] : colorChips.black[400]}
          />
        </Stack>
      ));
    }
  };

  // Collapse 스타일을 동적으로 생성
  const getCollapseStyle = (): SxProps => {
    const baseStyle = {
      flexShrink: 0,
      position: 'absolute',
      top: { xs: '46px', md: '74px' },
      left: '0',
      zIndex: 1000,
      borderRadius: { xs: '8px', md: '16px' },
      bgcolor: colorChips.grayScale[50],
      border: `1px solid ${colorChips.line.e6e6e6}`,
      maxHeight: { xs: '180px', md: '300px' },
      overflowY: 'auto',
    };

    // 데스크탑에서는 모든 필터가 100% 너비
    // 태블릿 이하에서는 지역 필터만 150px 고정, 서비스 필터는 100%
    if (filterType === 'region') {
      return {
        ...baseStyle,
        width: { xs: '150px', md: '100%' },
      };
    } else {
      return {
        ...baseStyle,
        width: '100%',
      };
    }
  };

  return (
    <Stack width="100%" direction={'column'} position={'relative'}>
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
          content={getButtonText()}
          color={isOpen ? colorChips.primary[300] : colorChips.black[400]}
        />
        {isOpen ? (
          <ExpandLessIcon sx={{ color: iconColor, width: iconSize, height: iconSize }} />
        ) : (
          <ExpandMoreIcon sx={{ color: iconColor, width: iconSize, height: iconSize }} />
        )}
      </Stack>

      <Collapse in={isOpen} sx={getCollapseStyle()}>
        <Stack direction="column">{renderItems()}</Stack>
      </Collapse>
    </Stack>
  );
};

const filterButtonSx: SxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: { xs: '100px', md: '100%' },
  height: { xs: '36px', md: '64px' },
  padding: { xs: '6px 10px', md: '16px 24px' },
  borderRadius: { xs: '8px', md: '16px' },
  cursor: 'pointer',
};

const itemSx: SxProps = {
  padding: { xs: '6px 14px', md: '16px 24px' },
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: colorChips.primary[50],
  },
};
