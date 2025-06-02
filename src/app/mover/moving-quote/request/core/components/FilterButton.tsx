import Image from 'next/image';
import { Box } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';

interface FilterButtonProps {
  selected: boolean;
  onClick: () => void;
}

export default function FilterButton({ selected, onClick }: FilterButtonProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        borderRadius: '16px',
        backgroundColor: selected ? colorChips.primary[50] : colorChips.background['fafafa'],
        border: selected ? '' : `1px solid ${colorChips.line['f2f2f2']}`,
        padding: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={
          selected ? '/assets/images/filter-icon/filter-blue-32x32.svg' : '/assets/images/filter-icon/filter-30x30.svg'
        }
        alt="filter"
        width={selected ? 32 : 30}
        height={selected ? 32 : 30}
      />
    </Box>
  );
}
