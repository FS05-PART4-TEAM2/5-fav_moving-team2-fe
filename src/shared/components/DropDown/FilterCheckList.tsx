'use client';

import { Box, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

interface Item {
  label: string;
  count: number;
  checked: boolean;
}

interface FilterCheckListProps {
  title: string;
  items: Item[];
  onChange: (label: string, checked: boolean) => void;
  onCheckAll?: (checked: boolean) => void;
  checkAll?: boolean;
}

export default function FilterCheckList({
  title,
  items,
  onChange,
  onCheckAll,
  checkAll = false,
}: FilterCheckListProps) {
  return (
    <Box
      sx={{
        width: 328,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 2,
        padding: '16px 24px',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
        mb={2}
        borderBottom={`1px solid ${colorChips.line['f2f2f2']}`}
      >
        <Typo className="text_SB_16">{title}</Typo>
        <FormControlLabel
          control={<Checkbox size="small" checked={checkAll} onChange={(e) => onCheckAll?.(e.target.checked)} />}
          label="전체선택"
          sx={{
            '.MuiFormControlLabel-label': {
              fontSize: 14,
              color: '#aaa',
            },
          }}
        />
      </Stack>

      <Stack spacing={1}>
        {items.map(({ label, count, checked }) => (
          <Stack
            key={label}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderBottom={`1px solid ${colorChips.line['f2f2f2']}`}
          >
            <Typo className="text_M_14">{`${label} (${count})`}</Typo>
            <Checkbox size="small" checked={checked} onChange={(e) => onChange(label, e.target.checked)} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
