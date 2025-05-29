import { MovingType } from '@/shared/types/types';

export const selectTypeOptions: { value: MovingType; text: string }[] = [
  {
    value: 'SMALL_MOVE',
    text: '소형이사 (원룸, 투룸, 20평대 미만)',
  },
  {
    value: 'FAMILY_MOVE',
    text: '가정이사 (쓰리룸, 20평대 이상)',
  },
  {
    value: 'OFFICE_MOVE',
    text: '사무실이사 (사무실, 상업공간)',
  },
];
