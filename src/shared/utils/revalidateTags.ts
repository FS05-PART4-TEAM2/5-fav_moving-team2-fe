'use server';

import { revalidateTag } from 'next/cache';

/**
 * 찜하기 관련 캐시 전부 무효화
 */
export async function revalidateLikeData() {
  revalidateTag('mover-detail'); // 기사님 상세
  revalidateTag('received-offer-detail'); // 일반유저 내견적관리 견적 상세
  revalidateTag('pending-quotes'); // 일반유저 대기중견적
  revalidateTag('received-quotes'); // 일반유저 받았던견적
}

export async function revalidateReviewList() {
  revalidateTag('write-review-list');
  revalidateTag('finished-review-list');
}

/**
 * 기사님 상세 캐시만 무효화
 */
export async function revalidateMoverDetail() {
  revalidateTag('mover-detail');
}
