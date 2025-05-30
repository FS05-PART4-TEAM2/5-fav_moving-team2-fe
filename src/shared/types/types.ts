export type UserType = 'customer' | 'mover' | 'temp';
export type MovingType = 'SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE';
export type QuotationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'DELETED';

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

export interface OfferMover {
  id: string;
  profileImageUrl: string | null;
  nickname: string;
  likeCount: number;
  isLiked: boolean;
  totalRating: number;
  reviewCounts: number;
  intro: string;
  career: number;
  completedQuotationCount: number;
}

export interface Quotation {
  id: string;
  createdAt: string;
  moveDate: string;
  startAddress: string;
  endAddress: string;
}

// 일반유저 내견적관리 - 대기중견적 데이터
export interface CustomerPendingQutoeData {
  id: string;
  isAssigned: boolean; // 지정요청 여부
  moveType: MovingType;
  offerMover: OfferMover;
  quotation: Quotation;
  price: number | null;
  isCompleted: boolean; // 견적 완료 여부
  isConfirmedMover: boolean; // 유저가 확정한 견적 여부
}

export interface ReceivedOffers {
  offerId: string; // 기사가 보낸 견적 id
  moverId: string; // 기사 id
  isAssigned: boolean; // 지정견적요청 여부
  isConfirmedMover: boolean; // 유저가 확정한 견적 여부
  price: number;
  profileImageUrl: string | null;
  nickname: string;
  likeCount: number;
  isLiked: boolean;
  totalRating: number;
  reviewCounts: number;
  intro: string;
  career: number;
  completedQuotationCount: number;
}

// 일반유저 내견적관리 - 받았떤 견적 데이터
export interface CustomerReceivedQuoteData {
  quotationId: string; // 일반유저가 요청한 견적 id
  isCompleted: boolean; // 서비스 이용 완료(이사날짜 지났는지) 여부
  requestData: string; //견적 요청일
  moveType: MovingType;
  moveData: string; // 서비스 이용일
  startAddress: string;
  endAddress: string;
  offers: ReceivedOffers[];
}
