import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const formatToFullDateWithTime = (date: string): string => {
  return dayjs(date).locale('ko').format('YYYY.MM.DD(dd) A hh:mm');
};

export const formatToFullDateWithDay = (date: string): string => {
  return dayjs(date).locale('ko').format('YYYY.MM.DD(dd)');
};

export const formatToYYMMDD = (date: string): string => {
  return dayjs(date).locale('ko').format('YY.MM.DD');
};

export const formattedPrice = (price: number): string => {
  return `${price.toLocaleString()}원`;
};
