import { CustomerQuoteHistoryData } from '@/shared/types/types';

export const mockList: CustomerQuoteHistoryData = {
  quotationId: '4f594741-6175-4ad14e-8ed6-0a607ca6909a', // 일반유저가 요청한 견적 id

  requestedAt: '2025-05-29T15:32:08.000Z', //견적 요청일
  moveType: 'SMALL_MOVE',
  moveDate: '2025-05-29T15:32:08.000Z', // 서비스 이용일
  startAddress: '서울시 중구', // 출발지
  endAddress: '경기도 수원시', // 도착지
  offers: [
    {
      offerId: '4f594741adfdf-6175-414e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
      moverId: 'b293525a-26c8asdf-48ff-b3ea-f5fd35a77818', // 기사 id
      isAssigned: true, // 지정견적요청 여부
      isConfirmedMover: false, // 유저가 확정한 견적 여부
      isCompleted: false, // 서비스 이용 완료(이사날짜 지났는지) 여부
      price: 1800000,
      moverProfileImageUrl: '/assets/images/profile-icon/avatartion-blue-02.svg',
      moverNickname: 'syga',
      likeCount: 10,
      isLiked: true,
      totalRating: 5,
      reviewCounts: 22,
      intro: '친절하게 :)',
      career: 10,
      confirmedQuotationCount: 16,
    },
    {
      offerId: '4f5947ad41-6175-414e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
      moverId: 'b293525a-2asdf6c8-48ff-b3ea-f5fd35a77818', // 기사 id
      isAssigned: true, // 지정견적요청 여부
      isConfirmedMover: false, // 유저가 확정한 견적 여부
      isCompleted: false, // 서비스 이용 완료(이사날짜 지났는지) 여부
      price: 1500000,
      moverProfileImageUrl: '/assets/images/profile-icon/avatartion-green-02.svg',
      moverNickname: '펭귄',
      likeCount: 15,
      isLiked: false,
      totalRating: 4.5,
      reviewCounts: 10,
      intro: '친절하게 도와드릴게요!',
      career: 4,
      confirmedQuotationCount: 10,
    },
  ],
};

export const receivedQuoteList: CustomerQuoteHistoryData[] = [
  {
    quotationId: '4f594741-6175-4ad14e-8ed6-0a607ca6909a', // 일반유저가 요청한 견적 id
    requestedAt: '2025-05-29T15:32:08.000Z', //견적 요청일
    moveType: 'SMALL_MOVE',
    moveDate: '2025-05-29T15:32:08.000Z', // 서비스 이용일
    startAddress: '서울시 중구', // 출발지
    endAddress: '경기도 수원시', // 도착지
    offers: [
      {
        offerId: '4f594741adfdf-6175-414e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
        moverId: 'b293525a-26c8asdf-48ff-b3ea-f5fd35a77818', // 기사 id
        isAssigned: true, // 지정견적요청 여부
        isConfirmedMover: false, // 유저가 확정한 견적 여부
        isCompleted: false, // 서비스 이용 완료(이사날짜 지났는지) 여부
        price: 1800000,
        moverProfileImageUrl: '/assets/images/profile-icon/avatartion-blue-02.svg',
        moverNickname: 'syga',
        likeCount: 10,
        isLiked: true,
        totalRating: 5,
        reviewCounts: 22,
        intro: '친절하게 :)',
        career: 10,
        confirmedQuotationCount: 16,
      },
      {
        offerId: '4f5947ad41-6175-414e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
        moverId: 'b293525a-2asdf6c8-48ff-b3ea-f5fd35a77818', // 기사 id
        isAssigned: true, // 지정견적요청 여부
        isConfirmedMover: false, // 유저가 확정한 견적 여부
        isCompleted: false, // 서비스 이용 완료(이사날짜 지났는지) 여부
        price: 1500000,
        moverProfileImageUrl: '/assets/images/profile-icon/avatartion-green-02.svg',
        moverNickname: '펭귄',
        likeCount: 15,
        isLiked: false,
        totalRating: 4.5,
        reviewCounts: 10,
        intro: '친절하게 도와드릴게요!',
        career: 4,
        confirmedQuotationCount: 10,
      },
    ],
  },
  {
    quotationId: '4f594741-617asdfsdf5-414e-8ed6-0a607ca6909a', // 일반유저가 요청한 견적 id
    requestedAt: '2025-01-29T15:32:08.000Z', //견적 요청일
    moveType: 'FAMILY_MOVE',
    moveDate: '2025-02-12T15:32:08.000Z', // 서비스 이용일
    startAddress: '서울시 중구', // 출발지
    endAddress: '경기도 수원시', // 도착지
    offers: [
      {
        offerId: '4f594741-61ass75-414e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
        moverId: 'b293525a-26c8-48ff-b3ea-f5fd3fdsd5a77818', // 기사 id
        isAssigned: true, // 지정견적요청 여부
        isConfirmedMover: false, // 유저가 확정한 견적 여부
        isCompleted: false, // 서비스 이용 완료(이사날짜 지났는지) 여부
        price: 1500000,
        moverProfileImageUrl: '/assets/images/profile-icon/avatartion-green-02.svg',
        moverNickname: 'codeit',
        likeCount: 15,
        isLiked: false,
        totalRating: 4.5,
        reviewCounts: 10,
        intro: '친절하게 도와드릴게요!',
        career: 4,
        confirmedQuotationCount: 10,
      },
      {
        offerId: '4f594741-6175-414e-8ed6-0a6asdf07ca6909a', // 기사가 보낸 견적 id
        moverId: 'b293525a-26c8-48ff-b3ea-f5fd35ffsda77818', // 기사 id
        isAssigned: true, // 지정견적요청 여부
        isConfirmedMover: false, // 유저가 확정한 견적 여부
        isCompleted: false, // 서비스 이용 완료(이사날짜 지났는지) 여부
        price: 1500000,
        moverProfileImageUrl: '/assets/images/profile-icon/avatartion-green-02.svg',
        moverNickname: '오리',
        likeCount: 19,
        isLiked: false,
        totalRating: 4.5,
        reviewCounts: 10,
        intro: '친절하게 도와드릴게요!',
        career: 4,
        confirmedQuotationCount: 10,
      },
    ],
  },
];
