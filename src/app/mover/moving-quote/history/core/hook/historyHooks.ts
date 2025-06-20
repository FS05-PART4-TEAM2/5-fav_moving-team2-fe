import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRejectedQuotations, fetchSentQuotations } from '../Api/historyApi';
import { PresetCardName, UserCardData } from '@/shared/components/Card/CardPresets';
import {
  cutAddress,
  isValidStatus,
  moveTypeToLabel,
  QuotationAPIData,
} from '../../../request/core/hook/mapToUserCardData';
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

export function useInfiniteRejectedQuotations() {
  return useInfiniteQuery({
    queryKey: ['infiniteRejectedQuotations'],
    queryFn: ({ pageParam = 1 }) => fetchRejectedQuotations({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 3,
  });
}

// 보낸 견적
export function useInfiniteSentQuotations() {
  return useInfiniteQuery({
    queryKey: ['infiniteSentQuotations'],
    queryFn: ({ pageParam = 1 }) => fetchSentQuotations({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 3,
  });
}

export function mapSentQuotationToCardData(apiData: SentQuotationAPIData): {
  type: PresetCardName;
  data: UserCardData;
} {
  const cardData: UserCardData = {
    id: apiData.id,
    name: apiData.customerNick,
    moveDay: apiData.moveDate,
    isAssigned: apiData.isAssignQuo,
    startPoint: cutAddress(apiData.startAddress),
    endPoint: cutAddress(apiData.endAddress),
    service: [moveTypeToLabel(apiData.moveType)],
    status: isValidStatus(apiData.status) ? apiData.status : undefined,
    price: apiData.price ? Number(apiData.price) : undefined,
  };

  const isPastMoveDay = dayjs().isAfter(dayjs(apiData.moveDate).add(1, 'day'), 'day');
  const isFinishRequest = apiData.isConfirmedToMe === true && isPastMoveDay;
  const isRefuse = apiData.isConfirmedToMe === false && apiData.status === 'CONFIRMED';

  let cardType: PresetCardName = 'moveQuotation';
  if (isFinishRequest) {
    cardType = 'finishRequest';
  }

  if (isRefuse) {
    cardType = 'refuse';
  }

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
    isAssigned: false,
    price: apiData.price ? Number(apiData.price) : undefined,
  };
}
