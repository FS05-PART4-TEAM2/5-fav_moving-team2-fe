import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import { colorChips } from '@/shared/styles/colorChips';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 22,
  height: 22,
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  border: `1.5px solid ${colorChips.line.e6e6e6}`,
  display: 'inline-block',
  transition: 'background 0.2s',
  [theme.breakpoints.down('md')]: {
    width: 16,
    height: 16,
  },
  'input:hover ~ &': {
    backgroundColor: colorChips.primary[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: colorChips.primary[300],
  border: 'none',
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 12,
    height: 8,
    background: `url('/assets/images/check-white-10x6.svg') no-repeat center/contain`,
    [theme.breakpoints.down('md')]: {
      width: 8,
      height: 5,
      background: `url('/assets/images/check-white-10x6.svg') no-repeat center/contain`,
    },
  },
  'input:hover ~ &': {
    backgroundColor: colorChips.primary[200],
  },
}));

// Inspired by blueprintjs
export const RoundCheckButton = (props: RadioProps) => {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      sx={{ padding: 0, margin: 0, minWidth: 0, minHeight: 0 }}
      {...props}
    />
  );
};
