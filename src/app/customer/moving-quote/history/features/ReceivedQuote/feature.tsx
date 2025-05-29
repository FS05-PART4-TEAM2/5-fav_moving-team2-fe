import { Stack } from '@mui/material';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { EmptyDataView } from '../../core/components/EmptyDataView';

const mockList = [
  {
    id: '4f594741-6175-414e-8ed6-0a607ca6909a',
    isAssigned: true, // 지정요청 여부
    moveType: 'SMALL_MOVE',
    offerMover: {
      id: 'b293525a-26c8-48ff-b3ea-f5fd35a77818',
      username: 'syga', // 닉네임
      likeCount: 10,
      totalRating: 5,
      reviewCounts: 22,
      intro: '친절하게 :)',
      career: 10,
      completedQuotationCount: 16,
    },
    quotation: {
      id: '0a86c249-7b49-4912-a801-9bb73360c54f',
      createdAt: '2025-05-29T15:32:08.000Z',
      moveDate: '0122-12-31T15:32:08.000Z',
      startAddress: '서울시 중구', // 출발지
      endAddress: '경기도 수원시', // 도착지
    },
    price: '1800000', // 견적 금액
    isCompleted: true,
    isConfirmedMover: false,
  },
  {
    id: '4f594741-6175-414e-8ed6-0a607casda',
    isAssigned: true, // 지정요청 여부
    moveType: 'SMALL_MOVE',
    offerMover: {
      id: 'b293525a-26c8-48ff-b3ea-f5asd35a77818',
      username: 'syga', // 닉네임
      likeCount: 10,
      totalRating: 5,
      reviewCounts: 22,
      intro: '친절하게 :)',
      career: 10,
      completedQuotationCount: 16,
    },
    quotation: {
      id: '0a86c249-7b49-4912-adf01-9bb73360c54f',
      createdAt: '2025-05-29T15:32:08.000Z',
      moveDate: '0122-12-31T15:32:08.000Z',
      startAddress: '서울시 중구', // 출발지
      endAddress: '경기도 수원시', // 도착지
    },
    price: '1800000', // 견적 금액
    isCompleted: true,
    isConfirmedMover: false,
  },
];

export const ReceivedQuoteFeature = () => {
  // TODO: 받았던 견적 api 연결하기
  const data = [];
  // const data = mockList

  return (
    <Stack sx={contentContainerSx}>
      {data.length === 0 ? (
        // 받았던 견적 데이터 없는 경우
        <EmptyDataView type="received" />
      ) : (
        // 받았던 견적 데이터 있는 경우
        <Typo content="받았던 견적" className="text_M_16" color={colorChips.black[400]} />
      )}
    </Stack>
  );
};

const contentContainerSx = {
  flex: 1,
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
};
