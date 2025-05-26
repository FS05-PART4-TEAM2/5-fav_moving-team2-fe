// 사용하는 타입을 여기에 모아서 쓰는게 좋을 것 같아요(컴포넌트는 깔끔하게)

// TODO: 이거 나중에 api 타입잡고 파일 추가되면 유저쪽에 가져가야할듯
export type UserType = 'customer' | 'mover' | 'temp';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface MoverUser {
  id: string;
  username: string;
  nickName: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  isProfile: boolean;
}

export interface CustomerUser {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  isProfile: boolean;
}

export interface AuthResponseMover {
  accessToken: string;
  refreshToken: string;
  mover: MoverUser;
}

export interface AuthResponseCustomer {
  accessToken: string;
  refreshToken: string;
  customer: CustomerUser;
}
