import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserType } from '../types/types';

// TODO: 로그인 api 완성되면 데이터타입 맞는지 확인해보기

// 예시: 일반유저 로그인 성공 시 / 프로필 등록 완료 시 response data로 아래 2가지 작업을 하면 됩니다.
// 1. setUserInfo(userType: 'customer', userInfo: {
//     id: data.id,
//     username: data.username,
//     email: data.email,
//     phoneNumber: data.phoneNumber,
//     profileImage: data.profileImage,
//   });
// 2. setCustomerData(customerData: {
//     wantService: data.wantService,
//     livingPlace: data.livingPlace,
//   });

// 최초 로그인시 일반 유저 / 기사님 공통으로 가지는 데이터
// - 헤더 프로필에 usernamd, profileImage 사용
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
}

// 일반유저 프로필 데이터
// 일반유저 로그인 response로 여기 업데이트해놓기 -> 프로필 수정 시 사용
export interface CustomerData {
  wantService: string[] | null;
  livingPlace: string | null;
}

// 기사님 프로필 데이터
// 기사님 로그인 response로 여기 업데이트해놓기 -> 프로필 수정 시 사용
export interface DriverData {
  nickname: string | null;
  serviceArea: string[] | null;
  serviceList: string[] | null;
  intro: string | null;
  career: string | null;
  detailDescription: string | null;
}

interface UserStore {
  userType: UserType;
  userInfo: UserInfo | null;
  customerData: CustomerData | null;
  driverData: DriverData | null;
  isAuthenticated: boolean; // 로그인 여부
  setUserInfo: (userType: UserType, userInfo: UserInfo) => void;
  setCustomerData: (customerData: CustomerData) => void;
  setDriverData: (driverData: DriverData) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userType: 'temp',
      userInfo: null,
      customerData: null,
      driverData: null,
      isAuthenticated: false,

      setUserInfo: (userType: UserType, userInfo: UserInfo) => {
        set({ userType, userInfo, isAuthenticated: true });
      },
      setCustomerData: (customerData: CustomerData) => {
        set({ customerData });
      },
      setDriverData: (driverData: DriverData) => {
        set({ driverData });
      },
    }),
    {
      name: 'user-info-storage', // storage name
      skipHydration: true, // 서버 사이드 렌더링 시 하이드레이션 스킵
    },
  ),
);

export default useUserStore;
