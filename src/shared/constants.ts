export const PATH = {
  landing: '/',
  customer: {
    login: '/customer/auth/login',
    signup: '/customer/auth/signup',
    profile: '/customer/profile', // 프로필 등록
    movingQuoteRequest: '/customer/moving-quote/request', // 견적 요청
    movingQuoteHistory: '/customer/moving-quote/history', // 내 견적 관리
    searchMover: '/customer/search-mover', // 기사님 찾기
    myPage: '/customer/my-page', // 프로필수정
    pickMover: '/customer/pick-mover', // 찜한 기사님
    myReview: '/customer/my-review', // 이사 리뷰
  },
  mover: {
    login: '/mover/auth/login',
    signup: '/mover/auth/signup',
    profile: '/mover/profile', // 프로필 등록
    movingQuoteRequest: '/mover/moving-quote/request', // 받은 요청
    movingQuoteHistory: '/mover/moving-quote/history', // 내 견적 관리
    myPage: '/mover/my-page', // 마이페이지
    editProfile: '/mover/my-page/edit-profile', // 프로필 수정
    editInfo: '/mover/my-page/edit-info', // 기본정보 수정
  },
};

export const Service = ['소형이사', '가정이사', '사무실이사'];

export const Region = [
  '서울',
  '경기',
  '인천',
  '강원',
  '충북',
  '충남',
  '세종',
  '대전',
  '전북',
  '전남',
  '경주',
  '경북',
  '경남',
  '대구',
  '울산',
  '부산',
  '제주',
];
