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
  customerId: string;
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

export interface SearchAddressResponseCommon {
  errorMessage: string;
  countPerPage: string;
  totalCount: string;
  errorCode: string;
  currentPage: string;
}

export interface SearchAddressResponseJuso {
  roadAddr: string; // 전체도로명주소
  jibunAddr: string; // 지번주소
  zipNo: string; // 우편번호
  siNm: string; // 시도명
  sggNm: string; // 시군구명
  rn: string; // 도로명
  roadAddrPart1: string;
  roadAddrPart2: string;
  detBdNmList: string;
  engAddr: string;
  emdNm: string;
  emdNo: string;
  bdNm: string;
  admCd: string;
  udrtYn: string;
  lnbrMnnm: string;
  lnbrSlno: string;
  buldMnnm: string;
  bdKdcd: string;
  liNm: string;
  rnMgtSn: string;
  mtYn: string;
  bdMgtSn: string;
  buldSlno: string;
}

export interface SearchAddressResponse {
  results: {
    common: SearchAddressResponseCommon;
    juso: SearchAddressResponseJuso[];
  };
}
