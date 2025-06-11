import { SearchMoverListPayload } from '../types/types';

export const moverKeys = {
  all: ['mover'],
  list: (params: SearchMoverListPayload) => [...moverKeys.all, 'list', params],
  detail: (moverId: string) => [...moverKeys.all, 'detail', moverId],
  likeList: () => [...moverKeys.all, 'likeList'],
};
