import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const formatToFullDateWithTime = (date: string): string => {
  return dayjs(date).locale('ko').format('YYYY.MM.DD(dd) A hh:mm');
};

export const formatToFullDate = (date: string): string => {
  return dayjs(date).locale('ko').format('YYYY.MM.DD');
};

export const formatToFullDateWithDay = (date: string): string => {
  return dayjs(date).locale('ko').format('YYYY.MM.DD(dd)');
};

export const formatToYYMMDD = (date: string): string => {
  return dayjs(date).locale('ko').format('YY.MM.DD');
};

export const formatWithDash = (date: string): string => {
  return dayjs(date).locale('ko').format('YYYY-MM-DD');
};

export const formatNotiTime = (date: string): string => {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diffMinutes = now.diff(targetDate, 'minute');
  const diffHours = now.diff(targetDate, 'hour');
  const diffDays = now.diff(targetDate, 'day');
  const diffMonths = now.diff(targetDate, 'month');

  if (diffMinutes < 1) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;
  if (diffMonths < 12) return `${diffMonths}개월 전`;
  
  return dayjs(date).locale('ko').format('YYYY.MM.DD');
};

export const formattedPrice = (price: number): string => {
  return `${price.toLocaleString()}원`;
};

// 주소를 공백 기준으로 분할하여 앞의 2개 단어만 사용
export const getShortAddress = (address: string) => {
  const parts = address.split(' ');
  return parts.slice(0, 2).join(' ');
};
