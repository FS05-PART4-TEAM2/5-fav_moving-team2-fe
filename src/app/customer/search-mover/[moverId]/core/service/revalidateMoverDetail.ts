'use server';

import { revalidateTag } from 'next/cache';

// 기사님 상세 정보 캐시 무효화
export async function revalidateMoverDetail() {
  revalidateTag('mover-detail');
}
