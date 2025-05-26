export type UserType = 'customer' | 'mover' | 'temp';
export type MovingType = 'SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE';
export type QuotationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'; // TODO: 여기 확인필요

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

export interface CustomerRequestPayload {
  moveType: MovingType | null;
  moveDate: string;
  startAddress: string;
  endAddress: string;
}

export interface CustomerRequestResponseData {
  id: string;
  moveType: MovingType;
  moveDate: string;
  price: number | null;
  startAddress: string;
  endAddress: string;
  status: QuotationStatus;
  customerId: string;
  assignMover: string | null; // TODO: 여기 배열로 가는지 확인필요
  confirmedMoverId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CustomerRequestResponse {
  success: boolean;
  message: string;
  data: CustomerRequestResponseData;
}
