import CommonCardInfo from './CommonCardInfo';
import ReviewSection from './parts/ReviewSection';

export type PresetCardName =
  | 'profile'
  | 'waitRequest' // 대기중
  | 'search' // 기사님 찾기
  | 'pickMover' // 찜한 기사님
  | 'quotation' // 견적 내역
  | 'request' // 받은 요청
  | 'confirmRequest' // 확정 견적
  | 'rejectRequest' // 반려 요청
  | 'finishRequest' // 이사완료
  | 'writeReview' // 작성 가능한 리뷰
  | 'finishReview' // 내가 작성한 리뷰
  | 'review'; // 리뷰 카드

export interface UserCardData {
  name: string;
  service: string[];
  description?: string;
  likeCount: number;
  userProfileImage: string;
  review: {
    reviewer: number;
  };
  present: number;
  confirmation: number;
  moveDay?: string;
  startPoint?: string;
  endPoint?: string;
  provideService?: string[];
  region?: string[];
  QuoteAmount?: number;
  reviewContent?: string;
}

export type CardButtonType = 'solid' | 'outlined';

export interface CardButtonConfig {
  buttonType: CardButtonType;
  text: string;
  actionKey: string;
  buttonSize?: 'sm' | 'md';
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

export const CardPresets: Record<PresetCardName, CardPreset> = {
  profile: {
    showChips: false,
    showDescription: true,
    Content: CommonCardInfo,
  },
  waitRequest: {
    showChips: true,
    showDescription: true,
    Content: CommonCardInfo,
    buttons: [
      {
        buttonType: 'outlined',
        text: '상세보기',
        actionKey: 'openDetail',
      },
      {
        buttonType: 'solid',
        text: '확정하기',
        actionKey: 'confirmQuote',
      },
    ],
  },
  search: {
    showChips: true,
    showDescription: true,
    Content: CommonCardInfo,
  },
  pickMover: {
    showChips: true,
    showDescription: false,
    Content: CommonCardInfo,
  },
  quotation: {
    showChips: true,
    showDescription: true,
    Content: CommonCardInfo,
  },
  request: {
    showChips: true,
    showDescription: true,
    Content: CommonCardInfo,
  },
  confirmRequest: {
    showChips: true,
    showDescription: true,
    Content: CommonCardInfo,
  },
  rejectRequest: {
    showChips: true,
    showDescription: true,
    Content: CommonCardInfo,
  },
  finishRequest: {
    showChips: true,
    showDescription: true,
    Content: CommonCardInfo,
  },
  writeReview: {
    showChips: true,
    showDescription: false,
    Content: CommonCardInfo,
    buttons: [
      {
        buttonType: 'solid',
        text: '리뷰 작성하기',
        actionKey: 'writeReview',
        hasIcon: true,
      },
    ],
  },
  finishReview: {
    showChips: true,
    showDescription: false,
    Content: ReviewSection,
  },
  review: {
    showChips: false,
    showDescription: false,
    Content: ReviewSection,
  },
};
