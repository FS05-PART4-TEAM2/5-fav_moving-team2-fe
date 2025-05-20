'use client';

// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-pretendard)',
  },
  palette: {
    primary: {
      main: '#1B92FF', // primary300
    },
    secondary: {
      main: '#4DA9FF', // primary200 - 필요에 따라 바꾸셔도 됩니다
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 744,
      lg: 1200,
      xl: 1500,
    },
  },
});

export default theme;
