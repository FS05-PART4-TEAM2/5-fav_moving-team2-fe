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

export const formattedPrice = (price: number): string => {
  return `${price.toLocaleString()}원`;
};

// 주소를 공백 기준으로 분할하여 앞의 2개 단어만 사용
export const getShortAddress = (address: string) => {
  const parts = address.split(' ');
  return parts.slice(0, 2).join(' ');
};
