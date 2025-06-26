import { PATH } from '@/shared/constants';

export const ProfileDrowndownMenu = {
  customer: [
    {
      title: '프로필 수정',
      path: PATH.customer.myPage,
    },
    {
      title: '찜한 기사님',
      path: PATH.customer.pickMover,
    },
    {
      title: '이사 리뷰',
      path: PATH.customer.myReview,
    },
  ],
  mover: [
    {
      title: '마이페이지',
      path: PATH.mover.myPage,
    },
  ],
};

export const HeaderNavMenu = {
  temp: [
    {
      title: '기사님 찾기',
      path: PATH.customer.searchMover,
    },
    {
      title: '로그인',
      path: PATH.customer.login,
    },
  ],
  customer: [
    {
      title: '견적 요청',
      path: PATH.customer.movingQuoteRequest,
    },
    {
      title: '기사님 찾기',
      path: PATH.customer.searchMover,
    },
    {
      title: '내 견적 관리',
      path: PATH.customer.movingQuoteHistory,
    },
  ],
  mover: [
    {
      title: '받은 요청',
      path: PATH.mover.movingQuoteRequest,
    },
    {
      title: '내 견적 관리',
      path: PATH.mover.movingQuoteHistory,
    },
  ],
};
