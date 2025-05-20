// Preset 종류
export type PresetCardName =
  | 'profile'
  | 'waitRequest' // 대기중
  | 'search' // 기사님 찾기
  | 'pickMover' // 찜한 기사님
  | 'quotation' // 견적 내역
  | 'request ' // 받은 요청
  | 'confirmRequest' // 확정 견적
  | 'rejectRequest' // 반려 요청
  | 'finishRequest' // 이사완료
  | 'writeReview' // 작성 가능한 리뷰
  | 'finishReview' // 내가 작성한 리뷰
  | 'review'; // 리뷰 카드
