'use client';

import { Region, Service } from '@/shared/constants';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { CategoryType, dropdownPresets } from './DropDownListPresets';
import { colorChips } from '@/shared/styles/colorChips';

interface DropDownListProps {
  type: CategoryType;
  selectedItem?: string;
  onSelect?: (value: string) => void;
  onClose?: () => void;
}

type AlarmItem = {
  title: string;
  createTime: string;
};
const MoveSortItems = ['이사 빠른순', '요청일 빠른순'];
const SortItems = ['평점 높은순', '경력 높은순', '리뷰 많은순', '확정 많은순'];
const AlarmItems: AlarmItem[] = [
  { title: '김코드 기사님의 소형이사 견적이 도착했어요', createTime: '2시간 전' },
  { title: '김코드 기사님의 견적이 확정되었어요', createTime: '3시간 전' },
  { title: '내일은 경기(일산) → 서울(영등포) 이사 예정일이에요.', createTime: '5시간 전' },
];
const ProfileItems = ['프로필 수정', '찜한 기사님', '이사 리뷰'];

export default function DropDownList({ type, selectedItem, onSelect, onClose }: DropDownListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const preset = dropdownPresets[type];
  const config = isMobile ? preset.mobile : preset.desktop;

  const isRegion = type === 'region';
  const isService = type === 'service';
  const isSort = type === 'sort';
  const isProfile = type === 'profile';
  const isAlarm = type === 'alarm';
  const isMoveSort = type === 'moveSort';

  const items = isRegion
    ? Region
    : isService
    ? Service
    : isSort
    ? SortItems
    : isMoveSort
    ? MoveSortItems
    : isProfile
    ? ProfileItems
    : isAlarm
    ? AlarmItems
    : [];

  const shouldShowAllItem = isRegion || isService;
  const displayItems = shouldShowAllItem ? ['전체', ...items] : items;

  return (
    <Box
      sx={{
        position: 'relative',
        width: config.width,
        height: config.height,
        backgroundColor: 'white',
        borderRadius: config.borderRadius,
        boxShadow: config.boxShadow,
        overflowY: isRegion || isAlarm ? 'auto' : 'visible',
        border: preset.borderColor ? `1px solid ${preset.borderColor}` : undefined,
      }}
    >
      {isRegion ? (
        <Box
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '1px',

              transform: 'translateX(-50%)',
              zIndex: 0,
            }}
          />
          {displayItems.map((item) => (
            <Typo
              key={typeof item === 'string' ? item : item.title}
              className={config.typo}
              onClick={() => onSelect?.(typeof item === 'string' ? item : item.title)}
              sx={{
                textAlign: preset.align,
                padding: config.padding,
                borderRadius: 1,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                backgroundColor:
                  selectedItem === (typeof item === 'string' ? item : item.title)
                    ? colorChips.primary[100]
                    : 'transparent',
                '&:hover': {
                  backgroundColor: colorChips.primary[100],
                },
              }}
            >
              {typeof item === 'string' ? item : item.title}
            </Typo>
          ))}
        </Box>
      ) : (
        <Stack spacing={0.5}>
          {isAlarm && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: config.padding,
                borderBottom: `1px solid ${colorChips.line['e6e6e6']}`,
                backgroundColor: 'white',
                zIndex: 1,
              }}
            >
              <Typo className={'text_B_18'}>알림</Typo>
              <Box
                component="button"
                onClick={onClose}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  width: 24,
                  height: 24,
                }}
              >
                <Image src="/assets/images/x-icon/x-24x24.svg" alt="닫기" width={24} height={24} />
              </Box>
            </Box>
          )}

          {isProfile && (
            <Box
              sx={{
                display: 'flex',

                padding: config.padding,
                borderRadius: config.borderRadius,
                backgroundColor: 'white',
                zIndex: 1,
              }}
            >
              <Typo className={'text_B_18'}>김코드 고객님</Typo>
            </Box>
          )}

          <Stack
            sx={{
              ...(isAlarm && {
                paddingTop: '56px',
              }),
            }}
          >
            {displayItems.map((item, idx) => (
              <Box key={typeof item === 'string' ? item : item.title}>
                <Typo
                  className={config.typo}
                  onClick={() => onSelect?.(typeof item === 'string' ? item : item.title)}
                  sx={{
                    textAlign: preset.align,
                    padding: config.padding,
                    borderRadius: config.borderRadius,
                    whiteSpace: isAlarm ? 'wrap' : 'nowrap',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedItem === (typeof item === 'string' ? item : item.title)
                        ? colorChips.primary[100]
                        : 'transparent',
                    '&:hover': {
                      backgroundColor: colorChips.primary[100],
                    },
                  }}
                >
                  {typeof item === 'string' ? item : item.title}
                </Typo>
                {isAlarm && typeof item !== 'string' && (
                  <Typo className={config.typo} sx={{ color: `${colorChips.grayScale[300]}`, px: 2 }}>
                    {item.createTime}
                  </Typo>
                )}
                {isAlarm && idx < displayItems.length - 1 && (
                  <Box sx={{ my: 2, borderBottom: `1px solid ${colorChips.line['e6e6e6']}` }} />
                )}
              </Box>
            ))}
          </Stack>
          {isProfile && (
            <Box sx={{ borderTop: `1px solid ${colorChips.grayScale[100]}`, mt: 2, py: 1 }}>
              <Typo
                className={config.typo}
                sx={{ textAlign: 'center', color: `${colorChips.grayScale[300]}`, cursor: 'pointer' }}
              >
                로그아웃
              </Typo>
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
}
