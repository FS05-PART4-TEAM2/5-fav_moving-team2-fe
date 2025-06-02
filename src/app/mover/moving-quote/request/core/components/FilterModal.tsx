'use client';

import { useState } from 'react';
import { Stack } from '@mui/material';
import FilterCheckList from '@/shared/components/DropDown/FilterCheckList';
import { TabBar } from '@/shared/components/Tab/TabBar';
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
}

export default function FilterModal({ moveTypeItems, filterItems, onChange, onCheckAll, onClose }: FilterModalProps) {
  const [currentTab, setCurrentTab] = useState<'move' | 'filter'>('move');

  return (
    <Stack spacing={3} width="100%">
      <TabBar
        currentVal={currentTab}
        firstVal="move"
        firstLabel="이사유형"
        secondVal="filter"
        secondLabel="필터"
        handleChange={(val) => setCurrentTab(val as 'move' | 'filter')}
      />

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
