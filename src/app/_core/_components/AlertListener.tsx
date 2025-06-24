'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AlertListener() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const alertMessage = searchParams.get('alert');
    if (alertMessage) {
      alert(decodeURIComponent(alertMessage));
    }
  }, [searchParams]);

  return null;
}
