import { MovingType, RegionType } from './types/types';

export const PATH = {
  landing: '/',
  customer: {
    login: '/customer/login',
    signup: '/customer/signup',
    profile: '/customer/profile', // 프로필 등록
    movingQuoteRequest: '/customer/moving-quote/request', // 견적 요청
    movingQuoteHistory: '/customer/moving-quote/history', // 내 견적 관리
    searchMover: '/customer/search-mover', // 기사님 찾기
    myPage: '/customer/my-page', // 프로필수정
    pickMover: '/customer/pick-mover', // 찜한 기사님
    myReview: '/customer/my-review', // 이사 리뷰
  },
  mover: {
    login: '/mover/login',
    signup: '/mover/signup',
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

export const SERVICE_TYPES: { key: MovingType; label: string }[] = [
  { key: 'SMALL_MOVE', label: '소형이사' },
  { key: 'FAMILY_MOVE', label: '가정이사' },
  { key: 'OFFICE_MOVE', label: '사무실이사' },
];

export const REGIONS: { key: RegionType; label: string }[] = [
  { key: 'SEOUL', label: '서울' },
  { key: 'GYEONGGI', label: '경기' },
  { key: 'INCHEON', label: '인천' },
  { key: 'GANGWON', label: '강원' },
  { key: 'CHUNGBUK', label: '충북' },
  { key: 'CHUNGNAM', label: '충남' },
  { key: 'SEJONG', label: '세종' },
  { key: 'DAEJEON', label: '대전' },
  { key: 'JEONBUK', label: '전북' },
  { key: 'JEONNAM', label: '전남' },
  { key: 'GWANGJU', label: '광주' },
  { key: 'GYEONGBUK', label: '경북' },
  { key: 'GYEONGNAM', label: '경남' },
  { key: 'DAEGU', label: '대구' },
  { key: 'ULSAN', label: '울산' },
  { key: 'BUSAN', label: '부산' },
  { key: 'JEJU', label: '제주' },
];

export const ServiceFilter: { key: MovingType | 'ALL'; label: string }[] = [
  { key: 'ALL', label: '전체' },
  ...SERVICE_TYPES,
];

export const RegionFilter: { key: RegionType | 'ALL'; label: string }[] = [{ key: 'ALL', label: '전체' }, ...REGIONS];
