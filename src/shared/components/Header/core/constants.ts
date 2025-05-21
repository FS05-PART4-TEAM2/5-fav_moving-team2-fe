import { PATH } from '@/shared/constants';

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
