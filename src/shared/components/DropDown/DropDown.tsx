'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import DropDownList from './DropDownList';
import DropDownButton from './DropDownButton';
import { CategoryType } from './DropDownListPresets';

type DropDownProps = {
  category: CategoryType;
  selected: string;
  onChange: (value: string) => void;
};

export default function DropDown({ category, selected, onChange }: DropDownProps) {
  const [open, setOpen] = useState(false);

  const defaultLabel = getDefaultLabel(category);
  const isSelected = selected !== defaultLabel && selected !== '';

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <DropDownButton
        category={category}
        label={selected}
        selected={isSelected}
        isOpen={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            right: category === 'profile' || category === 'alarm' ? -30 : 0,
            mt: 1,
            zIndex: 1300,
          }}
        >
          <DropDownList
            type={category}
            selectedItem={selected}
            onSelect={(value) => {
              onChange(value);
              setOpen(false);
            }}
            onClose={() => setOpen(false)}
          />
        </Box>
      )}
    </Box>
  );
}

function getDefaultLabel(category: CategoryType): string {
  switch (category) {
    case 'region':
      return '지역';
    case 'service':
      return '서비스';
    case 'sort':
      return '정렬';
    case 'profile':
    case 'alarm':
      return '';
    default:
      return '';
  }
}
