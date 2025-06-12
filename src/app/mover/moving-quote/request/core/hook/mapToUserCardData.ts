import { UserCardData } from '@/shared/components/Card/CardPresets';
import { QuotationStatus } from '@/shared/types/types';

interface QuotationAPIData {
  customer: {
    id: string;
    username: string;
  };
  endAddress: string;
  id: string;
  isAssigned: boolean;
  moveDate: string;
  moveType: 'SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE';
  startAddress: string;
  status: string;
}

function isValidStatus(status: string): status is QuotationStatus {
  return ['PENDING', 'ACCEPTED', 'REFUSED', 'COMPLETED'].includes(status);
}

export function cutAddress(fullAddress: string): string {
  const parts = fullAddress.trim().split(' '); // 띄어쓰기 기준으로 자름
  if (parts.length < 2) return fullAddress;

  const [first, second] = parts;

  if (first.endsWith('시') && !first.includes('도')) {
    return `${first} ${second}`; // 시 + 구
  } else if (first.endsWith('도')) {
    // 경기도, 강원도 등
    return `${first} ${second}`; // 도 + 시
  }

  return first;
}

export function mapToUserCardData(apiData: QuotationAPIData): UserCardData {
  return {
    id: apiData.id,
    customerId: apiData.customer.id,
    name: apiData.customer.username,
    moveDay: apiData.moveDate,
    startPoint: cutAddress(apiData.startAddress),
    endPoint: cutAddress(apiData.endAddress),
    service: [moveTypeToLabel(apiData.moveType)],
    status: isValidStatus(apiData.status) ? apiData.status : undefined,
  };
}

function moveTypeToLabel(type: QuotationAPIData['moveType']): string {
  switch (type) {
    case 'SMALL_MOVE':
      return '소형이사';
    case 'FAMILY_MOVE':
      return '가정이사';
    case 'OFFICE_MOVE':
      return '사무실이사';
    default:
      return '기타';
  }
}
