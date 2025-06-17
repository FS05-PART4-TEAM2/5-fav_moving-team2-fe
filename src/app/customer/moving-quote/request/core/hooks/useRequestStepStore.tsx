import { create } from 'zustand';

interface RequestStepStore {
  requestStep: 1 | 2 | 3 | 4 | 5;
  increaseStep: () => void;
  decreaseStep: () => void;
}

export const useRequestStepStore = create<RequestStepStore>()((set) => ({
  requestStep: 1,
  increaseStep: () =>
    set((state) => ({
      requestStep: state.requestStep < 5 ? ((state.requestStep + 1) as typeof state.requestStep) : state.requestStep,
    })),
  decreaseStep: () =>
    set((state) => ({
      requestStep: state.requestStep > 1 ? ((state.requestStep - 1) as typeof state.requestStep) : state.requestStep,
    })),
}));
