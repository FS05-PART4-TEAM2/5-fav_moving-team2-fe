import { CustomerQuoteHistoryData } from '@/shared/types/types';

export const mockDetail: CustomerQuoteHistoryData = {
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
  ],
};

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
    quotationId: '4f594741-6175-4adasd14e-8ed6-0a607ca6909a', // 일반유저가 요청한 견적 id
    requestedAt: '2023-04-10T15:32:08.000Z', //견적 요청일
    moveType: 'SMALL_MOVE',
    moveDate: '2023-05-29T15:32:08.000Z', // 서비스 이용일
    startAddress: '서울시 중구', // 출발지
    endAddress: '경기도 수원시', // 도착지
    offers: [
      {
        offerId: '4f594741adfdf-6175-414e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
        moverId: 'b293525a-26c8asdf-48ff-b3ea-f5fd35a77818', // 기사 id
        isAssigned: false, // 지정견적요청 여부
        isConfirmedMover: true, // 유저가 확정한 견적 여부
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
    quotationId: '4f594741-617asdfsdfg5-414e-8ed6-0a607ca6909a', // 일반유저가 요청한 견적 id
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
        isConfirmedMover: true, // 유저가 확정한 견적 여부
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
        isAssigned: false, // 지정견적요청 여부
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
      {
        offerId: '4f59474asd1-6175-414e-8ed6-0a6asdf07ca6909a', // 기사가 보낸 견적 id
        moverId: 'b293525a-26c8-4ad8ff-b3ea-f5fd35ffsda77818', // 기사 id
        isAssigned: false, // 지정견적요청 여부
        isConfirmedMover: false, // 유저가 확정한 견적 여부
        isCompleted: false, // 서비스 이용 완료(이사날짜 지났는지) 여부
        price: 15004000,
        moverProfileImageUrl: '/assets/images/profile-icon/avatartion-pink-02.svg',
        moverNickname: '핑크0',
        likeCount: 55,
        isLiked: false,
        totalRating: 4.9,
        reviewCounts: 10,
        intro: '안전하게 운반해드릴게요!',
        career: 7,
        confirmedQuotationCount: 8,
      },
    ],
  },
  {
    quotationId: '4f594741adf-6175aasd-4ad14easdf-8ed6-0a607ca6909a', // 일반유저가 요청한 견적 id
    requestedAt: '2024-08-15T15:32:08.000Z', //견적 요청일
    moveType: 'OFFICE_MOVE',
    moveDate: '2024-09-25T15:32:08.000Z', // 서비스 이용일
    startAddress: '서울시 중구', // 출발지
    endAddress: '경기도 수원시', // 도착지
    offers: [
      {
        offerId: '4f594741adfdf-6175-4asdf14e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
        moverId: 'b2as93525a-26c8asdf-48ff-b3ea-f5fd35a77818', // 기사 id
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
        offerId: '4f5947ad41-6175sadf-414e-8ed6-0a607ca6909a', // 기사가 보낸 견적 id
        moverId: 'b293525a-2asdf6c8-ffda48ff-b3ea-f5fd35a77818', // 기사 id
        isAssigned: true, // 지정견적요청 여부
        isConfirmedMover: true, // 유저가 확정한 견적 여부
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
];
