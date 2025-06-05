import { useState, useEffect } from 'react';
import { postLikeMoverApi, deleteLikeMoverApi } from '../service/customerLikeMoverService';
import useUserStore from '../store/useUserStore';
import { useRouter } from 'next/navigation';
import { PATH } from '../constants';

interface UseCustomerLikeMoverProps {
  initialStatus: boolean;
  initialLikeCount: number;
  moverId: string;
  revalidateFn?: () => Promise<void> | void; // 캐시 무효화 함수
}

export const useCustomerLikeMover = ({
  initialStatus,
  initialLikeCount,
  moverId,
  revalidateFn,
}: UseCustomerLikeMoverProps) => {
  const [isLiked, setIsLiked] = useState(initialStatus);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);
  const { userType } = useUserStore();
  const router = useRouter();

  // initialStatus가 변경되면 isLiked 상태 동기화 (페이지 재진입시)
  useEffect(() => {
    setIsLiked(initialStatus);
  }, [initialStatus]);

  // initialLikeCount가 변경되면 likeCount 상태 동기화
  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  const handleLikeClick = async () => {
    // 비회원인 경우 로그인 페이지로 이동
    if (userType === 'temp') {
      alert('로그인 후 이용해주세요.');
      router.push(PATH.customer.login);
      return;
    }

    // 이미 요청 중인 경우 중복 요청 방지
    if (isLoading) return;

    const previousStatus = isLiked;
    const previousCount = likeCount;

    try {
      setIsLoading(true);

      // 낙관적 UI 업데이트
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

      // API 호출
      if (isLiked) {
        // 찜 취소
        await deleteLikeMoverApi(moverId);
      } else {
        // 찜하기
        await postLikeMoverApi(moverId);
      }

      // 캐시 무효화 (선택적)
      if (revalidateFn) {
        await revalidateFn();
      }
    } catch (error) {
      console.error('찜하기 처리 중 오류:', error);

      // 실패시 이전 상태로 롤백
      setIsLiked(previousStatus);
      setLikeCount(previousCount);

      alert('다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    likeCount,
    isLoading,
    handleLikeClick,
  };
};
