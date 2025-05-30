import { Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import theme from '@/shared/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface MoveDataBaseProps {
  moveDate: string;
  startAddress: string;
  endAddress: string;
}

/**
 * 카드 컴포넌트 베이스 - 이사일, 출발, 도착 정보 표시
 */
export function MoveDataBase({ moveDate, startAddress, endAddress }: MoveDataBaseProps) {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const formattedDate = (date: string): string => {
    return dayjs(date).locale('ko').format('YYYY.MM.DD(dd)');
  };

  return (
    <Stack
      width="100%"
      direction={{ xs: 'column', md: 'row' }}
      gap={{ xs: '14px', md: '0px' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
    >
      <Stack width="fit-content" direction="row" alignItems="center">
        {/* 이사일 */}
        <Stack sx={itemWrapperSx}>
          <Stack sx={chipSx}>
            <Typo content="이사일" className="text_R_14to18" color={colorChips.grayScale[500]} />
          </Stack>
          <Typo content={formattedDate(moveDate)} className="text_M_14to18" color={colorChips.black[300]} />
        </Stack>
        {isDesktop && <Stack sx={borderRightSx} />}
      </Stack>

      <Stack width="fit-content" direction="row" alignItems="center">
        {/* 출발 */}
        <Stack sx={{ ...itemWrapperSx }}>
          <Stack sx={chipSx}>
            <Typo content="출발" className="text_R_14to18" color={colorChips.grayScale[500]} />
          </Stack>
          <Typo content={startAddress} className="text_M_14to18" color={colorChips.black[300]} />
        </Stack>
        <Stack sx={borderRightSx} />
        {/* 도착 */}
        <Stack sx={itemWrapperSx}>
          <Stack sx={chipSx}>
            <Typo content="도착" className="text_R_14to18" color={colorChips.grayScale[500]} />
          </Stack>
          <Typo content={endAddress} className="text_M_14to18" color={colorChips.black[300]} />
        </Stack>
      </Stack>
    </Stack>
  );
}

const itemWrapperSx = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: { xs: '8px', md: '12px' },
};

const chipSx = {
  backgroundColor: colorChips.background.f4f7fb,
  padding: { xs: '2px 6px', md: '4px 6px' },
  borderRadius: '4px',
};

const borderRightSx = {
  width: { xs: '14px', md: '16px' },
  height: { xs: '14px', md: '16px' },
  borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
  marginRight: { xs: '14px', md: '16px' },
};
