import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import dayjs from '@/lib/utill';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

interface Props extends PickersCalendarHeaderProps {
  isMdDown: boolean;
}

export default function DatePickerHeader({
  currentMonth,
  onMonthChange,
  view,
  onViewChange,
  disabled,
  views,

  isMdDown,
}: Props) {
  const handleClickCenter = () => {
    if (view === 'day' && views.includes('month')) onViewChange?.('month');
    else if (view === 'month' && views.includes('year')) onViewChange?.('year');
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" padding="12px 14px">
      <IconButton
        onClick={() => onMonthChange(dayjs(currentMonth).subtract(1, 'month'))}
        disabled={disabled}
        sx={iconSx}
      >
        <ChevronLeft sx={iconSx} />
      </IconButton>

      <Box
        sx={{
          width: 'fit-content',
          cursor: 'pointer',
          borderRadius: '8px',
          padding: '2px 4px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            bgcolor: colorChips.line['f2f2f2'],
          },
        }}
      >
        <Typo
          className={isMdDown ? 'text_SB_16' : 'text_SB_20'}
          content={dayjs(currentMonth).format('YYYY. MM')}
          onClick={handleClickCenter}
          color={colorChips.black[400]}
          textAlign="center"
        />
      </Box>

      <IconButton onClick={() => onMonthChange(dayjs(currentMonth).add(1, 'month'))} disabled={disabled} sx={iconSx}>
        <ChevronRight sx={iconSx} />
      </IconButton>
    </Box>
  );
}

const iconSx = {
  width: { xs: '24px', md: '36px' },
  height: { xs: '24px', md: '36px' },
  color: colorChips.grayScale[300],
  '&:hover': {
    color: colorChips.grayScale[400],
  },
};
