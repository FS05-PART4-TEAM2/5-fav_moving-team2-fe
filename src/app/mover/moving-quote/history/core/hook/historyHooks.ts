import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRejectedQuotations, fetchSentQuotations } from '../Api/historyApi';
import { PresetCardName, UserCardData } from '@/shared/components/Card/CardPresets';
import { cutAddress, moveTypeToLabel, QuotationAPIData } from '../../../request/core/hook/mapToUserCardData';
import dayjs from 'dayjs';

export interface SentQuotationAPIData extends QuotationAPIData {
  isConfirmedToMe: boolean;
  customerNick: string;
  isAssignQuo: boolean;
}

interface RejectedQuotationAPIData {
  id: string;
  customerNick: string;
  moveType: 'SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE';
  startAddress: string;
  endAddress: string;
  moveDate: string;
  price: number;
}

export function useInfiniteRejectedQuotations(tabType: string) {
  return useInfiniteQuery({
    queryKey: ['infiniteRejectedQuotations', tabType],
    queryFn: ({ pageParam = 1 }) => fetchRejectedQuotations({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
}

// 보낸 견적
export function useInfiniteSentQuotations(tabType: string) {
  return useInfiniteQuery({
    queryKey: ['infiniteSentQuotations', tabType],
    queryFn: ({ pageParam = 1 }) => fetchSentQuotations({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
}

export function mapSentQuotationToCardData(apiData: SentQuotationAPIData): {
  type: PresetCardName;
  data: UserCardData;
} {
  const isPastMoveDay = dayjs().isAfter(dayjs(apiData.moveDate).add(1, 'day'), 'day');
  let cardType: PresetCardName = 'moveQuotation';
  let displayStatus: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'REFUSED';

  const isFinishRequest = apiData.isConfirmedToMe === true && apiData.status === 'COMPLETED' && isPastMoveDay;
  const isRefuse = apiData.isConfirmedToMe === false && apiData.status === 'COMPLETED';
  const isConfirmedQuotation =
    (apiData.isConfirmedToMe === true && apiData.status === 'CONFIRMED') ||
    (apiData.isConfirmedToMe === true && apiData.status === 'COMPLETED');

  if (isFinishRequest) {
    //  이사 완료
    cardType = 'finishRequest';
    displayStatus = 'COMPLETED';
  } else if (isConfirmedQuotation) {
    // 확정 견적
    cardType = 'moveQuotation';
    displayStatus = 'CONFIRMED';
  } else if (isRefuse) {
    //  거절된 견적
    cardType = 'refuse';
    displayStatus = 'REFUSED';
  } else {
    //  견적 대기
    cardType = 'moveQuotation';
    displayStatus = 'PENDING';
  }

  const cardData: UserCardData = {
    id: apiData.id,
    name: apiData.customerNick,
    moveDay: apiData.moveDate,
    isAssigned: apiData.isAssignQuo,
    startPoint: cutAddress(apiData.startAddress),
    endPoint: cutAddress(apiData.endAddress),
    service: [moveTypeToLabel(apiData.moveType)],
    isConfirmedToMe: apiData.isConfirmedToMe,
    status: displayStatus,
    price: apiData.price ? Number(apiData.price) : undefined,
  };

  return { type: cardType, data: cardData };
}

export function mapRejectedQuotationToCardData(apiData: RejectedQuotationAPIData): UserCardData {
  return {
    id: apiData.id,
    name: apiData.customerNick,
    moveDay: apiData.moveDate,
    startPoint: cutAddress(apiData.startAddress),
    endPoint: cutAddress(apiData.endAddress),
    service: [moveTypeToLabel(apiData.moveType)],
    isAssigned: true,
    price: apiData.price ? Number(apiData.price) : undefined,
  };
}
