import { Box, Stack } from '@mui/material';

const UserData = {
  name: '김코드',
  service: ['견적 대기', '소형이사', '지정 견적 요청'],
  description: '누구보다 빠르게 안전 운송합니다!',
  likeCount: 7942,
  userProfileImage: './assets/images/profile-icon/avatartion-yellow-02', // 70x64
  review: {
    reviewer: 172,
  },
  present: 10,
  confirmation: 216,
  moveDay: '2025-05-20',
  startPoint: '고양시 덕양구',
  endPoint: '서울시 강남구',
  provideService: ['소형이사', '가정이사'],
  region: ['서울', '경기'],
  QuoteAmount: 274000,
};

// 1. 프리셋으로 padding 등 style 값 저장
// 2. type을 || 연산자로 분기 처리
// 3. 컴포넌트 분리 굳이?... cleanCode를 위해 분해 해서 분기처리하자...

// chip 맵핑
// 리뷰 5점만점 백분율
// 좋아요 버튼 on, off
// md: padding

export default function Card() {
  return (
    <Stack direction="column" gap="14px" px="14px" py="16px">
      <Box>{/*chip맵핑 자리*/}</Box>
      <Box>{/*description 자리*/}</Box>

      <Box>
        <Box>
          <Box>{/*userProfileImage 자리*/}</Box>

          <Box>
            <Box>{/*name 자리*/} 기사님</Box>
            <Box>{/*likeCount 자리*/}</Box>
            <Box>
              <Box>
                {/*별이미지 자리*/} {/*리뷰 5점만점 백분율 자리*/} {/*reviewer 자리*/}
              </Box>
              <Box>경력 {/*경력 자리*/}년</Box>
              <Box>{/*confirmation 자리*/} 확정</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
