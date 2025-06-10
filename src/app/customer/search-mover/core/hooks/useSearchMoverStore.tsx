'use client';

import { create } from 'zustand';
import { SearchMoverListPayload, RegionType, MovingType, MoverFilterOption } from '@/shared/types/types';

interface SearchMoverStore {
  params: SearchMoverListPayload;
  updateParams: (field: string, value: RegionType | MovingType | MoverFilterOption | string | number | null) => void;
  reset: () => void;
}

//쿼리 기본값
const initialState: SearchMoverListPayload = {
  region: null, // null이 기본값(전체 조회)
  service: null, // null이 기본값(전체 조회)
  orderBy: 'MOSTREVIEW',
  keyword: '',
  idNumCursor: null,
  orderCursor: null,
  limit: 10,
};

export const useSearchMoverStore = create<SearchMoverStore>((set) => ({
  params: initialState,

  updateParams: (field, value) =>
    set((state) => ({
      params: { ...state.params, [field]: value },
    })),

  reset: () => set({ params: initialState }),
}));
