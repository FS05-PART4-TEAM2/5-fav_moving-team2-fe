import { SearchMoverListPayload } from '../types/types';

interface ReviewListPayload {
  page: number;
  limit: number;
}

export const moverKeys = {
  all: ['mover'],
  list: (params: SearchMoverListPayload) => [...moverKeys.all, 'list', params],
  detail: (moverId: string) => [...moverKeys.all, 'detail', moverId],
  likeList: (limit?: number) => [...moverKeys.all, 'likeList', { limit }],
};

export const notificationKeys = {
  all: ['notification'],
  list: () => [...notificationKeys.all, 'list'],
};

export const customerQuoteHistoryKeys = {
  all: ['customerQuoteHistory'],
  pendingList: () => [...customerQuoteHistoryKeys.all, 'pending'],
  receivedList: () => [...customerQuoteHistoryKeys.all, 'received'],
};

export const reviewKeys = {
  all: ['review'],
  writeList: (params: ReviewListPayload) => [...reviewKeys.all, 'write', params],
  finishedList: (params: ReviewListPayload) => [...reviewKeys.all, 'finished', params],
};