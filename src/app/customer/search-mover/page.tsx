'use client';

import { QueryProvider } from '@/shared/context/QueryProvider';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import useUserStore from '@/shared/store/useUserStore';
import { SearchFilterFeature } from './features/SearchFilter/feature';
import { LikeMoverFeature } from './features/LikeMover/feature';
import { SearchControllerFeature } from './features/SearchController/feature';
import { MoverListFeature } from './features/MoverList/feature';

// TODO: 필터 고정, 리스트만 스크롤되게 수정하기
export default function Page() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { userType } = useUserStore();

  return (
    <QueryProvider>
      <Stack sx={pageContainerSx}>
        {isDesktop && (
          <Typo
            className="text_SB_24"
            content="기사님 찾기"
            color={colorChips.black.b2b2b}
            customStyle={{ padding: '32px 0', marginBottom: '24px', flexShrink: 0 }}
          />
        )}
        <Stack sx={contentContainerSx}>
          {isDesktop && (
            <Stack sx={widgetWrapperSx}>
              <SearchFilterFeature />
              {userType === 'customer' && (
                // 비회원일때는 안보이게
                <LikeMoverFeature />
              )}
            </Stack>
          )}
          <Stack sx={listWrapperSx}>
            <SearchControllerFeature />
            <MoverListFeature />
          </Stack>
        </Stack>
      </Stack>
    </QueryProvider>
  );
}

const pageContainerSx = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
};

const contentContainerSx = {
  width: '100%',
  height: 'calc(100vh - 88px)',
  flex: 1,
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { xs: 'flex-start', md: 'space-between' },
  gap: '24px',
  overflow: 'hidden',
};

const listWrapperSx = {
  width: '100%',
  maxWidth: { xs: '100%', md: '955px' },
  flexDirection: 'column',
  gap: '24px',
};

const widgetWrapperSx = {
  width: '340px',
  height: 'fit-content',
  flexDirection: 'column',
  gap: '48px',
  flexShrink: 0,
};
