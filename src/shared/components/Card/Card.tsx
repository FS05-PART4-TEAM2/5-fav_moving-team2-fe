import { Box, Stack, useMediaQuery } from '@mui/material';
import CommonCardInfo from './CommonCardInfo';
import CardHeader from './CardHeader';
import { PresetCardName } from './CardPresets';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { OutlinedButton } from '../Button/OutlinedButton';
import theme from '@/shared/theme';

export const UserData = {
  name: '김코드',
  service: ['견적 대기', '소형이사', '지정 견적 요청'],
  description: '누구보다 빠르게 안전 운송합니다!',
  likeCount: 7942,
  userProfileImage: '/assets/images/profile-icon/avatartion-yellow-01.svg', // 70x64
  review: {
    content: '완전 친절하고 싸고 어쩌구 저쩌구 이것저것 길게 설명과 중간에 칭찬',
    reviewer: 172,
    averageScore: 4.3,
  },
  present: 10,
  confirmation: 216,
  moveDay: '2025-05-20',
  startPoint: '고양시 덕양구',
  endPoint: '서울시 강남구',
  provideService: ['소형이사', '가정이사'],
  region: ['서울', '경기'],
  QuoteAmount: 274000,
  createTime: '2025-05-22',
};

// 1. 프리셋으로 padding 등 style 값 저장
// 2. type을 || 연산자로 분기 처리
// 3. 컴포넌트 분리 굳이?... cleanCode를 위해 분해 해서 분기처리하자...

// chip 맵핑
// 리뷰 5점만점 백분율
// 좋아요 버튼 on, off
// md: padding

interface CardProps {
  type: PresetCardName;
}

export default function Card({ type }: CardProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box position="relative">
      {(type === 'rejectRequest' || type === 'finishRequest') && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#040404A3',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: isMdDown ? '16px' : '24px',
          }}
        >
          <Stack padding="24px" borderRadius="12px" alignItems="center" gap="16px" sx={{ minWidth: '240px' }}>
            <Typo className={isMdDown ? 'text_SB_16' : 'text_SB_18'} style={{ color: 'white' }}>
              {type === 'rejectRequest' ? '반려된 요청이에요' : '이사 완료된 견적이에요'}
            </Typo>

            {type === 'finishRequest' && (
              <OutlinedButton
                text="견적 상세보기"
                width="100%"
                onClick={() => console.log('견적 상세보기')}
                buttonSize="md"
              />
            )}
          </Stack>
        </Box>
      )}
      <Stack
        direction="column"
        width="100%"
        gap="14px"
        p={isMdDown ? '20px' : '30px 20px'}
        bgcolor="white"
        borderRadius={isMdDown ? '16px' : '24px'}
      >
        <Stack>
          <CardHeader
            type={type}
            services={UserData.service}
            description={UserData.description}
            name="김코드"
            data={UserData}
          />
        </Stack>

        <Stack>
          <CommonCardInfo type={type} data={UserData} />
        </Stack>
      </Stack>
    </Box>
  );
}
