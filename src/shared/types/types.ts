export type UserType = 'customer' | 'mover' | 'temp';
export type MovingType = 'SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE';
export type QuotationStatus = 'pending' | 'confirmed' | 'completed' | 'deleted';

export interface GlobalResponse {
  success: boolean;
  message: string;
  data: any;
  errorCode: string;
}

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

// UI 전용
export interface FormUIFields {
  region: string[];
  service: string[];
  profileImage?: File;
}

// customer 프로필 타입
export interface CustomerProfileForm extends FormUIFields {
  profileImage?: File;
  username?: string;
  currPassword?: string;
  newPassword?: string;
  phoneNumber: string;
  wantService: string[];
  livingPlace: string[];
}

// mover 프로필 타입 (기본정보 수정 제외)
export interface MoverProfileForm extends FormUIFields {
  profileImage?: File;
  nickname: string;
  career: string;
  intro: string;
  detailDescription: string;
  serviceList: string[];
  serviceArea: string[];
}

// mover 기본정보 수정 타입
export interface MoverBaseInfoForm {
  username: string;
  email: string;
  phoneNumber: string;
  currPassword?: string;
  newPassword?: string;
}

// 일반유저 견적 요청
export interface CustomerRequestPayload {
  moveType: MovingType | null;
  moveDate: string;
  startAddress: string;
  endAddress: string;
  customerId: string;
}

// 일반유저 견적 요청 응답
export interface CustomerRequestResponseMessage {
  id: string;
  moveType: MovingType;
  moveDate: string;
  price: number | null;
  startAddress: string;
  endAddress: string;
  status: QuotationStatus;
  customerId: string;
  assignMover: string[] | null;
  confirmedMoverId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CustomerRequestResponse {
  success: boolean;
  message: string;
  data: CustomerRequestResponseMessage;
}

// 도로명주소 검색 오픈API 응답
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
