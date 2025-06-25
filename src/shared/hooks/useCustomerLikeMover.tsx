import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLikeMoverApi, deleteLikeMoverApi } from '../service/customerLikeMoverService';
import useUserStore from '../store/useUserStore';
import { useRouter } from 'next/navigation';
import { PATH } from '../constants';
import { moverKeys } from '@/shared/utils/queryKeys';

interface UseCustomerLikeMoverProps {
  initialStatus: boolean;
  initialLikeCount: number;
  moverId: string;
}

export const useCustomerLikeMover = ({ initialStatus, initialLikeCount, moverId }: UseCustomerLikeMoverProps) => {
  const [isLiked, setIsLiked] = useState(initialStatus);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const { userType } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  // initialStatus가 변경되면 isLiked 상태 동기화 (페이지 재진입시)
  useEffect(() => {
    setIsLiked(initialStatus);
  }, [initialStatus]);

  // initialLikeCount가 변경되면 likeCount 상태 동기화
  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  // 찜하기/취소 mutation
  const likeMutation = useMutation({
    mutationFn: async (shouldLike: boolean) => {
      if (shouldLike) {
        return await postLikeMoverApi(moverId);
      } else {
        return await deleteLikeMoverApi(moverId);
      }
    },
    onMutate: async (shouldLike: boolean) => {
      // 낙관적 업데이트
      setIsLiked(shouldLike);
      setLikeCount(shouldLike ? likeCount + 1 : likeCount - 1);
    },
    onSuccess: () => {
      // 성공 시 moverDetail, likeList 쿼리 무효화하여 최신 데이터 가져오기
      queryClient.invalidateQueries({
        queryKey: moverKeys.all,
      });
    },
    onError: () => {
      // 실패 시 이전 상태로 롤백
      setIsLiked(initialStatus);
      setLikeCount(initialLikeCount);
      alert('다시 시도해 주세요.');
    },
  });

  const handleLikeClick = async () => {
    // 비회원인 경우 로그인 페이지로 이동
    if (userType === 'temp') {
      alert('로그인 후 이용해주세요.');
      router.push(PATH.customer.login);
      return;
    }

    // 이미 요청 중인 경우 중복 요청 방지
    if (likeMutation.isPending) return;

    // mutation 실행
    likeMutation.mutate(!isLiked);
  };

  return {
    isLiked,
    likeCount,
    isLoading: likeMutation.isPending,
    handleLikeClick,
  };
};
