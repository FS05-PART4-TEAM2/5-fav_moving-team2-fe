'use client';

import { useEffect } from 'react';
import useUserStore from '@/shared/store/useUserStore';

export default function FaceHydration() {
  useEffect(() => {
    useUserStore.persist.rehydrate();
  }, []);
  return null;
}
