import { CustomerQuoteHistoryData } from '@/shared/types/types';

export const mockList: CustomerQuoteHistoryData[] = [
  {
    id: '4f594741-6175-414e-8ed6-0a607ca6909a',
    isAssigned: true, // 지정요청 여부
    moveType: 'SMALL_MOVE',
    offerMover: {
      id: 'b293525a-26c8-48ff-b3ea-f5fd35a77818',
      profileImageUrl: '/assets/images/profile-icon/avatartion-blue-02.svg',
      nickname: 'syga', // 닉네임
      likeCount: 10,
      isLiked: true,
      totalRating: 5,
      reviewCounts: 22,
      intro: '친절하게 :)',
      career: 10,
      completedQuotationCount: 16,
    },
    quotation: {
      id: '0a86c249-7b4912-a801-9bb73360c54f',
      createdAt: '2025-05-29T15:32:08.000Z',
      moveDate: '2025-05-29T15:32:08.000Z',
      startAddress: '서울시 중구', // 출발지
      endAddress: '경기도 수원시', // 도착지
    },
    price: 1800000, // 견적 금액
    isCompleted: false, // 해당 견적이 완료되었는지
    isConfirmedMover: false, // 유저가 확정한 견적 여부
  },
  {
    id: '4f594741-6175-414e-8ed6-0a67ca6909a',
    isAssigned: true, // 지정요청 여부
    moveType: 'FAMILY_MOVE',
    offerMover: {
      id: 'b293525a-26c8-48ff-b3ea-f5fd35a77818',
      profileImageUrl: '/assets/images/profile-icon/avatartion-green-02.svg',
      nickname: 'codeit', // 닉네임
      likeCount: 15,
      isLiked: false,
      totalRating: 4.5,
      reviewCounts: 10,
      intro: '친절하게 도와드릴게요!',
      career: 4,
      completedQuotationCount: 10,
    },
    quotation: {
      id: '0a86c249-7b49-4912-a801-9bb73360c54f',
      createdAt: '2025-05-29T15:32:08.000Z',
      moveDate: '2025-05-29T15:32:08.000Z',
      startAddress: '서울시 중구', // 출발지
      endAddress: '경기도 수원시', // 도착지
    },
    price: 1500000, // 견적 금액
    isCompleted: false, // 해당 견적이 완료되었는지
    isConfirmedMover: false, // 유저가 확정한 견적 여부
  },
  {
    id: '4f594741-6175-414-8ed6-0aca6909a',
    isAssigned: true, // 지정요청 여부
    moveType: 'OFFICE_MOVE',
    offerMover: {
      id: 'b293525a-26c8-48ff-b3ea-f5fd35a77818',
      profileImageUrl: '/assets/images/profile-icon/avatartion-pink-02.svg',
      nickname: '룰루', // 닉네임
      likeCount: 17,
      isLiked: true,
      totalRating: 4.8,
      reviewCounts: 10,
      intro: '친절하게 도와드릴게요!',
      career: 18,
      completedQuotationCount: 134,
    },
    quotation: {
      id: '0a86c249-7b49-4912-a8019bb73360c54f',
      createdAt: '2025-05-29T15:32:08.000Z',
      moveDate: '2025-05-29T15:32:08.000Z',
      startAddress: '서울시 중구', // 출발지
      endAddress: '경기도 수원시', // 도착지
    },
    price: 2200000, // 견적 금액
    isCompleted: false, // 해당 견적이 완료되었는지
    isConfirmedMover: false, // 유저가 확정한 견적 여부
  },
  {
    id: '4f5941-675-414e-8ed60a607ca6909a',
    isAssigned: true, // 지정요청 여부
    moveType: 'FAMILY_MOVE',
    offerMover: {
      id: 'b293525a-26c8-48ff-b3ea-f5fd35a77818',
      profileImageUrl: null,
      nickname: '코드잇', // 닉네임
      likeCount: 80,
      isLiked: false,
      totalRating: 4.5,
      reviewCounts: 60,
      intro: '친절하게 도와드릴게요!',
      career: 4,
      completedQuotationCount: 10,
    },
    quotation: {
      id: '0a86c249-7b49-4912-a801-9bb73360c54f',
      createdAt: '2025-05-29T15:32:08.000Z',
      moveDate: '2025-05-29T15:32:08.000Z',
      startAddress: '서울시 중구', // 출발지
      endAddress: '경기도 수원시', // 도착지
    },
    price: 1500000, // 견적 금액
    isCompleted: false, // 해당 견적이 완료되었는지
    isConfirmedMover: false, // 유저가 확정한 견적 여부
  },
  {
    id: '4f594746175-4-8ed6-0a607ca6909a',
    isAssigned: false, // 지정요청 여부
    moveType: 'SMALL_MOVE',
    offerMover: {
      id: 'b293525a-26c8-48ff-b3ea-f5fd35a77818',
      profileImageUrl: null,
      nickname: '코드잇', // 닉네임
      likeCount: 80,
      isLiked: true,
      totalRating: 4.5,
      reviewCounts: 60,
      intro: '친절하게 도와드릴게요!',
      career: 4,
      completedQuotationCount: 10,
    },
    quotation: {
      id: '0a86c249-7b49-4912-a801-9bb73360c54f',
      createdAt: '2025-05-29T15:32:08.000Z',
      moveDate: '2025-05-29T15:32:08.000Z',
      startAddress: '서울시 중구', // 출발지
      endAddress: '경기도 수원시', // 도착지
    },
    price: 18000, // 견적 금액
    isCompleted: false, // 해당 견적이 완료되었는지
    isConfirmedMover: false, // 유저가 확정한 견적 여부
  },
];
