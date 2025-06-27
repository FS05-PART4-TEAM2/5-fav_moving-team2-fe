'use server';

import { revalidateTag } from 'next/cache';

/**
 * 찜하기 관련 캐시 전부 무효화
 */
export async function revalidateLikeData() {
  revalidateTag('mover-detail'); // 기사님 상세
  revalidateTag('received-offer-detail'); // 일반유저 내견적관리 견적 상세
}

/**
 * 기사님 상세 캐시만 무효화
 */
export async function revalidateMoverDetail() {
  revalidateTag('mover-detail');
}
