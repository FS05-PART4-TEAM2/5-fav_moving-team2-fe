import CommonCardInfo from './CommonCardInfo';
import ReviewSection from './ReviewSection';

export type PresetCardName =
  | 'profile'
  | 'waitRequest' // 대기중
  | 'search' // 기사님 찾기
  | 'pickMover' // 찜한 기사님
  | 'quotation' // 견적 내역
  | 'moveQuotation' // 견적 내역
  | 'request' // 받은 요청
  | 'confirmRequest' // 확정 견적
  | 'rejectRequest' // 반려 요청
  | 'finishRequest' // 이사완료
  | 'writeReview' // 작성 가능한 리뷰
  | 'finishReview' // 내가 작성한 리뷰
  | 'review' // 리뷰 카드
  | 'refuse'; //유저에 의해 거절

export interface UserCardData {
  id?: string;
  name?: string;
  service?: string[];
  detailDescription?: string;
  likeCount?: number;
  userProfileImage?: string;
  price?: number;
  review?: {
    content?: string;
    reviewer?: number;
    averageScore?: number;
  };
  career?: number;
  comment?: string;
  confirmation?: number;
  moveDay?: string;
  startPoint?: string;
  endPoint?: string;
  provideService?: string[];
  region?: string[];
  quoteAmount?: number;
  reviewContent?: string;
  createTime?: string;
}

export type CardButtonType = 'solid' | 'outlined';

export interface CardButtonConfig {
  buttonType: CardButtonType;
  text: string;
  actionKey: string;
  justifyContent?: 'center' | 'space-between' | 'flex-start';
  hasIcon?: boolean;
  isLoading?: boolean;
}

export interface CardPreset {
  showChips?: boolean;
  showDescription?: boolean;
  Content: React.FC<{ type: PresetCardName; data: UserCardData }>;
  Footer?: React.FC<{ type: PresetCardName; data: UserCardData }>;
  buttons?: CardButtonConfig[];
}
