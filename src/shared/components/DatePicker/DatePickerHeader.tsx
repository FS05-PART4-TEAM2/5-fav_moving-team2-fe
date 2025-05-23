import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
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
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} pt={1}>
        <IconButton onClick={() => onMonthChange(dayjs(currentMonth).subtract(1, 'month'))} disabled={disabled}>
          <ChevronLeft />
        </IconButton>

        <Typo
          className={isMdDown ? 'text_SB_16' : 'text_SB_20'}
          onClick={handleClickCenter}
          sx={{
            cursor: 'pointer',
            userSelect: 'none',
            px: 1,
            py: 1,
            borderRadius: 2,
            transition: 'background-color 0.2s ease',
            '&:hover': {
              bgcolor: colorChips.line['f2f2f2'],
            },
          }}
        >
          {dayjs(currentMonth).format('YYYY. MM')}
        </Typo>

        <IconButton onClick={() => onMonthChange(dayjs(currentMonth).add(1, 'month'))} disabled={disabled}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}
