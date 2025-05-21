import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Collapse, Stack } from '@mui/material';
import Image from 'next/image';

//TODO: 알림 api 연결
const mockList = [
  { content: '1 김코드 기사님의 소형이사 견적이 도착했어요', createdAt: '2시간 전' },
  { content: '2 김코드 기사님의 견적이 확정되었어요', createdAt: '3시간 전' },
  { content: '3 내일은 경기(일산) → 서울(영등포) 이사 예정일이에요.', createdAt: '5시간 전' },
  { content: '4 김코드 기사님의 소형이사 견적이 도착했어요', createdAt: '2시간 전' },
  { content: '5 김코드 기사님의 견적이 확정되었어요', createdAt: '3시간 전' },
  { content: '6 내일은 경기(일산) → 서울(영등포) 이사 예정일이에요.', createdAt: '5시간 전' },
  { content: '7 김코드 기사님의 소형이사 견적이 도착했어요', createdAt: '2시간 전' },
  { content: '8 김코드 기사님의 견적이 확정되었어요', createdAt: '3시간 전' },
  { content: '9 내일은 경기(일산) → 서울(영등포) 이사 예정일이에요.', createdAt: '5시간 전' },
];

interface HeaderAlarmProps {
  isDesktop: boolean;
  userMenuIconSize: number;
  openDropdown: boolean;
  onToggle: () => void;
}

export const HeaderAlarm = ({ isDesktop, userMenuIconSize, openDropdown, onToggle }: HeaderAlarmProps) => {
  //TODO: 알림 api 연결

  return (
    <Stack position="relative">
      <Image
        src={'/assets/images/alarm-icon/alarm-36x36.svg'}
        alt="close"
        width={userMenuIconSize}
        height={userMenuIconSize}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
        priority
      />

      <Collapse in={openDropdown} sx={CollapseSx}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={isDesktop ? '14px 12px 14px 24px' : '14px 12px 14px 16px'}
        >
          <Typo className={isDesktop ? 'text_B_18' : 'text_B_16'} content={'알림'} color={colorChips.black[400]} />
          <Image
            src={'/assets/images/x-icon/x-24x24.svg'}
            alt="close"
            width={24}
            height={24}
            onClick={onToggle}
            style={{ cursor: 'pointer' }}
            priority
          />
        </Stack>

        {/* 알림 리스트 - 고정 높이와 스크롤 적용 */}
        <Stack
          direction="column"
          sx={{
            height: { xs: '254px', md: '280px' }, // 전체 높이에서 헤더 높이 뺀 값
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: colorChips.grayScale[100],
            },
            '&::-webkit-scrollbar-thumb': {
              background: colorChips.grayScale[300],
              borderRadius: '4px',
            },
          }}
        >
          {mockList.map((item, idx) => (
            <AlarmCard
              key={idx}
              isDesktop={isDesktop}
              content={item.content}
              createdAt={item.createdAt}
              isLast={idx === mockList.length - 1}
            />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface AlarmCardProps {
  isDesktop: boolean;
  content: string;
  createdAt: string;
  isLast: boolean;
}

// TODO: api 붙이고 타입 맞추기
const AlarmCard = ({ isDesktop, content, createdAt, isLast }: AlarmCardProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      padding={isDesktop ? '16px 24px' : '12px 16px'}
      gap="2px"
      sx={{
        borderBottom: isLast ? 'none' : `1px solid ${colorChips.line.e6e6e6}`,
      }}
    >
      <Typo className={isDesktop ? 'text_M_16' : 'text_M_14'} content={content} color={colorChips.black[400]} />
      <Typo className={isDesktop ? 'text_M_14' : 'text_M_13'} content={createdAt} color={colorChips.grayScale[500]} />
    </Stack>
  );
};

const CollapseSx = {
  position: 'absolute',
  width: { xs: '312px', md: '360px' },
  height: { xs: '314px', md: '352px' }, // 고정 높이
  top: { xs: '30px', md: '50px' },
  right: '-10px',
  zIndex: 1000,
  borderRadius: '24px',
  bgcolor: colorChips.grayScale[50],
  border: `1px solid ${colorChips.line.e6e6e6}`,
  boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
  padding: { xs: '10px 6px 6px', md: '16px 4px 6px' },
};
