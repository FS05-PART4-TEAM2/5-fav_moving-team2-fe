import dayjs from 'dayjs';
import { SentQuotationAPIData } from '../../../core/hook/historyHooks';

export interface QuotationDetailDisplayData {
  customerName: string;
  moveTypeLabel: string;
  moveDay: string;
  moveDayWithWeek: string;
  startAddress: string;
  endAddress: string;
  price?: string;
}

export function mapQuotationDetailDisplay(data: SentQuotationAPIData): QuotationDetailDisplayData {
  return {
    customerName: `${data.customerNick} 고객님`,
    moveTypeLabel: moveTypeToLabel(data.moveType),
    moveDay: dayjs(data.moveDate).format('YYYY.MM.DD'),
    moveDayWithWeek: dayjs(data.moveDate).format('YYYY.MM.DD(ddd)'),
    startAddress: data.startAddress,
    endAddress: data.endAddress,
    price: data.price ? `${data.price.toLocaleString()}원` : undefined,
  };
}

function moveTypeToLabel(type: SentQuotationAPIData['moveType']): string {
  const map = {
    SMALL_MOVE: '소형이사',
    FAMILY_MOVE: '가정이사',
    OFFICE_MOVE: '사무실이사',
  };
  return map[type] ?? '';
}
