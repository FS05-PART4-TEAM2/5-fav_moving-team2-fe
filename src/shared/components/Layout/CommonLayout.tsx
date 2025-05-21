import { Stack } from '@mui/material';
import { Header } from '../Header/Header';
import { colorChips } from '@/shared/styles/colorChips';

// 탭바 없는 기본 헤더 페이지에서 사용
export const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack sx={{ minHeight: '100vh', width: '100%' }}>
      <Stack sx={headerContainerSx}>
        <Header />
      </Stack>
      <Stack sx={mainContainerSx}>
        <Stack sx={contentContainerSx}>{children}</Stack>
      </Stack>
    </Stack>
  );
};

const headerContainerSx = {
  flexDirection: 'row',
  position: 'fixed',
  top: 0,
  zIndex: 99999,
  width: '100%',
  height: 'fit-content',
  justifyContent: 'center',
  backgroundColor: colorChips.grayScale[50],
  borderBottom: `1px solid ${colorChips.line.f2f2f2}`,
};

const mainContainerSx = {
  flex: 1,
  width: '100%',
  marginTop: { xs: '55px', md: '89px' },
  overflowY: 'hidden',
};

const contentContainerSx = {
  height: '100%',
  width: '100%',
  maxWidth: '1448px',
  margin: '0 auto',
  padding: '0 24px',
  overflowY: 'scroll',
};
