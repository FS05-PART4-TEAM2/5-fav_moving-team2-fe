import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { MovingType } from '@/shared/types/types';
import { RoundCheckButton } from '@/shared/components/Button/RoundCheckButton';

interface SelectOptionProps {
  isSelected: boolean;
  value: MovingType;
  text: string;
  onChange: (value: MovingType) => void;
}

export const SelectOption = ({ isSelected, value, text, onChange }: SelectOptionProps) => {
  return (
    <Stack sx={isSelected ? selectedSx : defaultSx} onClick={() => onChange(value)}>
      <RoundCheckButton checked={isSelected} />
      <Typo content={text} className="text_SB_14to18" />
    </Stack>
  );
};

const baseSx = {
  flexDirection: 'row',
  width: '100%',
  minWidth: { xs: '280px', md: '560px' },
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '8px',
  borderRadius: '16px',
  padding: { xs: '14px 16px', md: '24px 32px' },
  cursor: 'pointer',
};

const defaultSx = {
  ...baseSx,
  border: `1px solid ${colorChips.line.e6e6e6}`,
};

const selectedSx = {
  ...baseSx,
  border: `1px solid ${colorChips.primary[300]}`,
  backgroundColor: colorChips.primary[50],
};
