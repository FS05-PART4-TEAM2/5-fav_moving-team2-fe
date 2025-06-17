import { Metadata } from 'next';
import localFont from 'next/font/local';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/shared/theme';
import '../../public/globals.css';
import { ReactNode, Suspense } from 'react';
import { QueryProvider } from '@/shared/context/QueryProvider';
import KakaoScriptLoader from '@/shared/context/KakaoScriptLoader';

// TODO: 메타데이터 설정
export const metadata: Metadata = {
  title: 'Moving',
  description: 'Moving',
  metadataBase: new URL('http://localhost:3000'), // 나중에 실제 도메인으로 변경
  openGraph: {
    title: 'Moving 서비스 ',
    description: '믿을 수 있는 이사, Moving에서 간편하게 공유해 보세요.',
    url: '/',
    siteName: 'Moving',
    type: 'website',
    images: [
      {
        url: 'opengraph-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
  },
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
            <Suspense fallback={<div>페이지 로딩 중...</div>}>{children}</Suspense>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
