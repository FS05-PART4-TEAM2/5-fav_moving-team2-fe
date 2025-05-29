'use client';
// TODO 반응형 디자인 수정 필요
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Paper } from '@mui/material';
import { SolidButton } from '../Button/SolidButton';
import DatePickerHeader from './DatePickerHeader';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';

interface DatePickerProps {
  onSelect: (formattedDate: string) => void;
  value?: string;
}

// 기본값: 오늘날짜, 한번 선택했다가 수정할때는 선택값 보이도록 수정함
export default function DatePicker({ onSelect, value }: DatePickerProps) {
  const initialDayjs = value ? parseKoreanDateString(value) : dayjs();
  const [selected, setSelected] = useState<Dayjs | null>(initialDayjs);
  const [confirmedDate, setConfirmedDate] = useState<Dayjs | null>(null);
  const [view, setView] = useState<'year' | 'month' | 'day'>('day');

  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const handleConfirm = () => {
    if (selected) {
      setConfirmedDate(selected);
      onSelect(selected.format('YYYY-MM-DD') || '');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Paper
        sx={{
          boxShadow: 'none',
          width: 'fit-content',
          padding: '14px 24px',
          borderRadius: { xs: '16px', md: '32px' },
        }}
      >
        <StaticDatePicker
          sx={{
            fontSize: '13px',
            height: 'fit-content',
            '& .MuiPickersDay-root.Mui-selected, \
                & .MuiPickersMonth-root.Mui-selected, \
                & .MuiPickersYear-root.Mui-selected': {
              background: colorChips.primary[300],
              color: '#fff',
              '&:hover, &:focus': {
                background: colorChips.primary[200],
              },
            },
          }}
          displayStaticWrapperAs="desktop"
          value={selected}
          onChange={(newValue) => setSelected(newValue)}
          view={view}
          onViewChange={(newView) => {
            setView(newView);
            if (newView !== 'day') {
              setConfirmedDate(null);
            }
          }}
          views={['year', 'month', 'day']}
          minDate={dayjs().startOf('day')}
          showDaysOutsideCurrentMonth
          slotProps={{
            actionBar: { actions: [] },
          }}
          slots={{
            calendarHeader: (props) => <DatePickerHeader {...props} isMdDown={isMdDown} />,
          }}
        />

        <SolidButton
          onClick={handleConfirm}
          text={'선택완료'}
          disabled={!selected || view !== 'day' || !selected.isAfter(dayjs(), 'day')}
        />
      </Paper>
    </LocalizationProvider>
  );
}

function parseKoreanDateString(dateStr: string): Dayjs | null {
  const match = dateStr.match(/(\d{4})년 (\d{2})월 (\d{2})일/);
  if (!match) return null;
  const [, year, month, day] = match;
  return dayjs(`${year}-${month}-${day}`);
}
