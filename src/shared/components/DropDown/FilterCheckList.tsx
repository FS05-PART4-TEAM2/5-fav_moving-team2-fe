'use client';

import { Checkbox, FormControlLabel, Stack } from '@mui/material';
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
  isModal?: boolean;
}

export default function FilterCheckList({
  title,
  items,
  onChange,
  onCheckAll,
  checkAll = false,
  isModal,
}: FilterCheckListProps) {
  return (
    <Stack
      sx={{
        width: isModal ? '100%' : 328,
        backgroundColor: 'white',
        borderRadius: isModal ? '' : 2,
        boxShadow: isModal ? '' : 2,
        padding: isModal ? '' : '16px 24px',
      }}
    >
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={isModal ? '' : 2}
        mb={isModal ? '' : 2}
        borderBottom={`1px solid ${colorChips.line['f2f2f2']}`}
      >
        {isModal ? (
          <label
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Typo className="text_M_14" color={colorChips.grayScale[300]}>
              전체선택
            </Typo>
            <Checkbox size="small" checked={checkAll} onChange={(e) => onCheckAll?.(e.target.checked)} />
          </label>
        ) : (
          <>
            {!isModal && <Typo className="text_SB_16" content={title} />}
            <FormControlLabel
              control={<Checkbox size="small" checked={checkAll} onChange={(e) => onCheckAll?.(e.target.checked)} />}
              label="전체선택"
              sx={{
                '.MuiFormControlLabel-label': {
                  fontSize: 14,
                  color: colorChips.grayScale[300],
                },
              }}
            />
          </>
        )}
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
    </Stack>
  );
}
