'use client';

import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Paper } from '@mui/material';
import { SolidButton } from '../Button/SolidButton';
import DatePickerHeader from './DatePickerHeader';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Box, Stack, useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';

interface DatePickerProps {
  onSelect: (date: Dayjs) => void;
}

export default function DatePicker({ onSelect }: DatePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [confirmedDate, setConfirmedDate] = useState<Dayjs | null>(null);
  const [view, setView] = useState<'year' | 'month' | 'day'>('day');

  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const handleConfirm = () => {
    if (value) {
      setConfirmedDate(value);
      onSelect(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ position: 'relative' }}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            view={view}
            onViewChange={(newView) => setView(newView)}
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

          {confirmedDate && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Stack direction="row" gap="4px">
                <Typo className={isMdDown ? 'text_M_16' : 'text_M_20'} style={{ color: colorChips.grayScale[400] }}>
                  선택된 이사 날짜 :
                </Typo>
                <Typo className={isMdDown ? 'text_M_16' : 'text_M_20'} style={{ color: colorChips.black[400] }}>
                  {confirmedDate.format('YYYY년 MM월 DD일')}
                </Typo>
              </Stack>
            </Box>
          )}
        </Box>

        <SolidButton
          fullWidth
          onClick={handleConfirm}
          buttonSize={isMdDown ? 'sm' : 'md'}
          text={'선택완료'}
          sx={{ mt: 2 }}
        />
      </Paper>
    </LocalizationProvider>
  );
}
