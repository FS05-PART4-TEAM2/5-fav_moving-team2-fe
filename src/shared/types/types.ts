// 카카오 공유
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      cleanup: () => void;
      Share: {
        sendDefault: (
          param:
            | {
                objectType: 'feed';
                content: {
                  title: string;
                  description: string;
                  imageUrl: string;
                  link: { mobileWebUrl: string; webUrl: string };
                };
              }
            | {
                objectType: 'text';
                text: string;
                link: { mobileWebUrl: string; webUrl: string };
              },
        ) => void;
        sendCustom: (param: { templateId: number; templateArgs?: Record<string, string> }) => void;
        cleanup: () => void;
      };
    };
  }
}
export type UserType = 'customer' | 'mover' | 'temp';
export type MovingType = 'SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE';
export type QuotationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'DELETED';
export type RegionType =
  | 'SEOUL'
  | 'GYEONGGI'
  | 'INCHEON'
  | 'GANGWON'
  | 'CHUNGBUK'
  | 'CHUNGNAM'
  | 'SEJONG'
  | 'DAEJEON'
  | 'JEONBUK'
  | 'JEONNAM'
  | 'GWANGJU'
  | 'GYEONGBUK'
  | 'GYEONGNAM'
  | 'DAEGU'
  | 'ULSAN'
  | 'BUSAN'
  | 'JEJU';
export type MoverFilterOption = 'MOSTREVIEW' | 'BESTRATING' | 'HIGHESTEXP' | 'MOSTCONFIRM';
export type NotificationType =
  | 'QUOTE_ARRIVED' // 새로운 견적
  | 'QUOTE_CONFIRMED' // 확정 견적
  | 'MOVE_SCHEDULE'; // 이사 당일

export interface GlobalResponse {
  success: boolean;
  message: string;
  data: any;
  errorCode: string;
}

export interface GlobalResponseWithGeneric<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode: string;
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  segments: {
    text: string;
    isHighlight: boolean;
  }[];
  isRead: boolean;
  receivedQuoteId: string;
  createdAt: string;
}

export interface NotificationResponseData {
  data: NotificationItem[];
  nextCursor: {
    cursorId: string;
    cursorDate: string;
  };
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
  currentPassword?: string;
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
  currentPassword?: string;
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

// 일반유저 내견적관리 응답 데이터
export interface CustomerQuoteHistoryData extends CustomerQuoteData {
  offers: ReceivedOffers[];
}

// 유저가 요청한 견적 정보
export interface CustomerQuoteData {
  quotationId: string; // 일반유저가 요청한 견적 id
  requestedAt: string; //견적 요청일
  moveType: MovingType;
  moveDate: string; // 서비스 이용일
  startAddress: string;
  endAddress: string;
}

// 기사가 보낸 견적 정보
export interface ReceivedOffers {
  offerId: string; // 기사가 보낸 견적 id
  moverId: string; // 기사 id
  moverNickname: string;
  moverProfileImageUrl: string | null;
  isAssigned: boolean; // 지정견적요청 여부
  isConfirmedMover: boolean; // 유저가 확정한 견적 여부
  isCompleted: boolean; // 서비스 이용 완료(이사날짜 지났는지) 여부
  price: number;
  likeCount: number;
  isLiked: boolean;
  totalRating: number;
  reviewCounts: number;
  intro: string;
  career: number;
  confirmedQuotationCount: number;
}

export interface SearchMoverListPayload {
  region?: RegionType | null;
  service?: MovingType | null;
  orderBy: MoverFilterOption;
  keyword: string; // 기사 별명
  idNumCursor?: number | null; // idNum 커서
  orderCursor?: number | null; // 정렬 커서
  limit: number; // 조회 개수
}

export interface SearchMoverListItem {
  id: string;
  idNum: number;
  nickname: string;
  profileImage: string | null;
  serviceList: MovingType[] | null;
  isAssigned: boolean;
  isLiked: boolean;
  likeCount: number;
  totalRating: number;
  reviewCounts: number;
  intro: string;
  career: number;
  confirmedCounts: number;
}

// 기사님찾기 리스트 조회
export interface SearchMoverListResponse {
  list: SearchMoverListItem[];
  orderNextCursor: number;
  idNumNextCursor: number;
  hasNext: boolean;
}

// 찜한 기사님 리스트 조회
export interface LikeMoverListItem {
  id: string;
  idNum: number;
  nickName: string | null;
  profileImage: string | null;
  serviceList: MovingType[] | null;
  likeCount: number;
  totalRating: number;
  reviewCounts: number;
  intro: string | null;
  career: number;
  confirmedCounts: number;
  createdAt: string;
  isLiked: boolean;
  isAssigned: boolean;
}

export interface LikeMoverListResponseData {
  list: LikeMoverListItem[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}
// 기사님 상세조회
export interface SearchMoverDetailResponse extends SearchMoverListItem {
  detailDescription: string;
  serviceArea: RegionType[] | null;
}

export interface MoverReviewListItem {
  id: string;
  content: string;
  rating: number;
  moverId: string;
  quotationId: string;
  customerId: string;
  customerNick: string;
  createdAt: string;
  updatedAt: string;
}

export interface reviewRating {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

// 기사 리뷰 리스트 조회
export interface MoverDetailReviewResponse {
  list: MoverReviewListItem[];
  ratingCounts: reviewRating;
  ratingPercentages: reviewRating;
  totalRating: number;
  totalPages: number;
  currentPage: number;
}

export interface AssignMoverResponse {
  id: string;
  status: QuotationStatus;
  rejectedReason: string | null;
  moverId: string;
  customerId: string;
  quotationId: string;
  createdAt: string;
  updatedAt: string;
}

// mover 받은 요청 조회
export interface GetMoverQuotationsParams {
  type?: ('SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE')[];
  region?: string[];
  isAssigned?: boolean;
  username?: string;
  sorted?: 'MOVE_DATE_ASC' | 'REQUEST_DATE_ASC';
}

// mover 받은 요청 카운트 조회
export interface MoverQuotationStats {
  moveTypeStats: Record<MovingType, number>;
  startRegionStats: Record<string, number>;
  endRegionStats: Record<string, number>;
  assignedQuotationCount: number;
  totalQuotationCount: number;
}

export interface QuotationItem {
  id: string;
  moveType: MovingType;
  isAssigned: boolean;
  customer: {
    id: string;
    username: string;
  };
  startAddress: string;
  endAddress: string;
  status: QuotationStatus;
  moveDate: string;
}

export interface CursorInfo {
  cursorId: string;
  cursorDate: string;
}

export interface InfiniteQuotationPage {
  data: QuotationItem[];
  nextCursor: CursorInfo | null;
}

export interface GetMoverQuotationsResponse {
  data: {
    data: QuotationItem[];
    nextCursor: CursorInfo | null;
  };
  success: boolean;
  message: string;
  errorCode?: string;
}

// mover 견적 보내기
export interface SendQuotationPayload {
  price: number;
  comment: string;
  isAssignQuo: boolean;
  customerId: string;
  quotationId: string;
}

// mover 반려
export interface RejectQuotationPayload {
  quotationId: string;
  comment: string;
}

export interface WriteReviewPayload {
  content: string;
  rating: number;
}

// 이사 리뷰 작성 응답
export interface WriteReviewResponseData {
  id: string;
  content: string;
  rating: number;
  moverId: string;
  quotationId: string;
  customerId: string;
  customerNick: string;
  createdAt: string;
  updatedAt: string;
}

// 일반유저 작성가능한 리뷰 목록 아이템
export interface CustomerWriteReviewItem {
  content: string;
  rating: number;
  reviewDate: string | null;
  moverName: string;
  moverProfileImage: string;
  moveDate: string;
  startAddress: string;
  endAddress: string;
  moveType: MovingType;
  price: string;
  isAssignedMover: boolean;
  offerId: string;
}

// 일반유저 작성가능한 리뷰 목록 조회
export interface CustomerWriteReviewListResponseData {
  list: CustomerWriteReviewItem[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

// 일반유저 작성한 리뷰 목록 아이템
export interface CustomerFinishedReviewItem {
  content: string;
  rating: number;
  reviewDate: string;
  moverName: string;
  moverProfileImage: string;
  moveDate: string;
  startAddress: string;
  endAddress: string;
  moveType: MovingType;
  price: string;
  isAssignedMover: boolean;
}

// 일반유저 작성한 리뷰 목록 조회
export interface CustomerFinishedReviewListResponseData {
  list: CustomerFinishedReviewItem[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

// 손님 프로필 조회 API response
export interface GetCustomerProfileData {
  id: string;
  username: string;
  email: string;
  isProfile: boolean;
  phoneNumber: string;
  profileImage: string | null;
  wantService: string[] | null;
  livingPlace: string[] | null;
  hasQuotation: boolean;
}

// 기사 프로필 조회 API response
export interface GetMoverProfileData {
  id: string;
  username: string;
  nickname: string | null;
  email: string;
  isProfile: boolean;
  phoneNumber: string;
  profileImage: string | null;
  intro: string | null;
  detailDescription: string | null;
  career: string | null;
  likeCount: number;
  totalRating: number;
  reviewCounts: number;
  confirmQuotation: number;
  serviceList: string[] | null;
  serviceArea: string[] | null;
}

export type UserProfileData = GetCustomerProfileData | GetMoverProfileData;

export type UserLoginData = MoverLoginData | CustomerLoginData;

export interface MoverLoginData {
  accessToken: string;
  refreshToken: string;
  mover: {
    id: string;
    username: string;
    nickname: string | null;
    email: string;
    phoneNumber: string;
    isProfile: boolean;
    profileImage: string | null;
    serviceArea: string[] | null;
    serviceList: string[] | null;
    intro: string | null;
    career: number | null;
    detailDescription: string | null;
    likeCount: number;
    totalRating: number;
    reviewCounts: number;
    confirmQuotation: number;
    createdAt: string;
  };
}

export interface CustomerLoginData {
  accessToken: string;
  refreshToken: string;
  customer: {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    isProfile: boolean;
    profileImage: string | null;
    wantService: string[] | null;
    livingPlace: string[] | null;
    createdAt: string;
    hasQuotation: boolean;
  };
}

export type UserSignupData = CustomerSignupData | MoverSignupData;

export interface CustomerSignupData {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  authType: null | string;
  provider: string | null;
  isProfile: boolean;
  profileImage: string | null;
  wantService: string[] | null;
  livingPlace: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface MoverSignupData {
  id: string;
  idNum: number;
  username: string;
  nickname: string | null;
  isProfile: boolean;
  email: string;
  password: string;
  phoneNumber: string;
  provider: string | null;
  profileImage: string | null;
  serviceArea: string[] | null;
  serviceList: string[] | null;
  intro: string | null;
  career: number | null;
  detailDescription: string | null;
  likeCount: number;
  totalRating: number;
  reviewCounts: number;
  confirmedCounts: number;
  createdAt: string;
}
// 손님 프로필 변경 리스폰스 타입
export interface UpdateCustomerProfileResponse {
  id: string;
  username: string;
  email: string;
  isProfile: boolean;
  phoneNumber: string;
  profileImage: string | null;
  wantService: string[] | null;
  livingPlace: string[] | null;
}

// 기사 프로필 변경 리스폰스 타입
export interface UpdateMoverProfileResponse {
  id: string;
  username: string;
  nickname: string | null;
  email: string;
  isProfile: boolean;
  phoneNumber: string;
  profileImage: string | null;
  intro: string | null;
  detailDescription: string | null;
  career: string | null;
  likeCount: number;
  totalRating: number;
  reviewCounts: number;
  serviceList: string[];
  serviceArea: string[];
}
