import { Metadata } from 'next';
import localFont from 'next/font/local';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/shared/theme';
import '../../public/globals.css';
import { ReactNode } from 'react';
import { QueryProvider } from '@/shared/context/QueryProvider';
import KakaoScriptLoader from '@/shared/context/KakaoScriptLoader';

// TODO: 메타데이터 설정
export const metadata: Metadata = {
  title: 'Moving',
  description: 'Moving',
};

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kor">
      <body className={`${pretendard.className}`}>
        <KakaoScriptLoader />
        <QueryProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
