'use client';

import { Stack } from '@mui/material';
import FilterCheckList from '@/shared/components/DropDown/FilterCheckList';
import { SolidButton } from '@/shared/components/Button/SolidButton';

interface Item {
  label: string;
  count: number;
  checked: boolean;
}

interface FilterModalProps {
  moveTypeItems: Item[];
  filterItems: Item[];
  onChange: (label: string, checked: boolean) => void;
  onCheckAll: (group: '이사유형' | '필터') => (checked: boolean) => void;
  onClose: () => void;
  currentTab: 'move' | 'filter';
}

export default function FilterModal({
  moveTypeItems,
  filterItems,
  onChange,
  onCheckAll,
  onClose,
  currentTab,
}: FilterModalProps) {
  return (
    <Stack spacing={3} width="100%">
      {currentTab === 'move' ? (
        <FilterCheckList
          title="이사유형"
          items={moveTypeItems}
          onChange={onChange}
          onCheckAll={onCheckAll('이사유형')}
          checkAll={moveTypeItems.every((item) => item.checked)}
          isModal
        />
      ) : (
        <FilterCheckList
          title="필터"
          items={filterItems}
          onChange={onChange}
          onCheckAll={onCheckAll('필터')}
          checkAll={filterItems.every((item) => item.checked)}
          isModal
        />
      )}
      <SolidButton text="조회하기" onClick={onClose} width="100%" />
    </Stack>
  );
}
