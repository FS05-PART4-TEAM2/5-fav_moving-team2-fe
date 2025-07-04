import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserType } from '../types/types';

// 최초 로그인시 일반 유저 / 기사님 공통으로 가지는 데이터
// - 헤더 프로필에 usernamd, profileImage 사용
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  isProfile: boolean;
}

// 일반유저 프로필 데이터
// 일반유저 로그인 response로 여기 업데이트해놓기 -> 프로필 수정 시 사용
export interface CustomerData {
  wantService: string[] | null;
  livingPlace: string[] | null;
  hasQuotation: boolean;
}

// 기사님 프로필 데이터
// 기사님 로그인 response로 여기 업데이트해놓기 -> 프로필 수정 시 사용
export interface MoverData {
  nickname: string | null;
  serviceArea: string[] | null;
  serviceList: string[] | null;
  intro: string | null;
  career: string | null;
  detailDescription: string | null;
  totalRating: number | null;
  reviewCounts: number | null;
  confirmQuotation: number | null;
  confirmedCounts?: number | null;
  likeCount: number | null;
}

interface UserStore {
  userType: UserType;
  userInfo: UserInfo | null;
  customerData: CustomerData | null;
  moverData: MoverData | null;
  isAuthenticated: boolean; // 로그인 여부
  hasRehydrated: boolean;
  setUserInfo: (userType: UserType, userInfo: UserInfo) => void;
  setCustomerData: (customerData: CustomerData) => void;
  setMoverData: (moverData: MoverData) => void;
  logout: () => void;
  setHasRehydrated: (flag: boolean) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userType: 'temp',
      userInfo: null,
      customerData: null,
      moverData: null,
      isAuthenticated: false,
      hasRehydrated: false,
      setUserInfo: (userType: UserType, userInfo: UserInfo) => {
        set({ userType, userInfo, isAuthenticated: true });
      },
      setCustomerData: (customerData: CustomerData) => {
        set({ customerData });
      },
      setMoverData: (moverData: MoverData) => {
        set({ moverData });
      },
      logout: () => {
        localStorage.removeItem('accessToken'); // accessTokend은 dev/prod 환경 둘다 삭제
        if (process.env.NODE_ENV === 'development') {
          localStorage.removeItem('refreshToken');
        }
        set({ userType: 'temp', userInfo: null, customerData: null, moverData: null, isAuthenticated: false });
      },
      setHasRehydrated: (flag) => set({ hasRehydrated: flag }),
    }),
    {
      name: 'user-info-storage', // storage name
      skipHydration: true, // 서버 사이드 렌더링 시 하이드레이션 스킵
      onRehydrateStorage: () => (state, error) => {
        if (!error) state?.setHasRehydrated(true);
      },
    },
  ),
);

export default useUserStore;
