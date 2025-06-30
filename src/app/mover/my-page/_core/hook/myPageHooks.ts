import { UserCardData } from '@/shared/components/Card/CardPresets';
import { REGIONS, SERVICE_TYPES } from '@/shared/constants';
import { MoverData, UserInfo } from '@/shared/store/useUserStore';
import { getMoverDetail, getReviewList } from '../api/myPageApi';
import { useQuery } from '@tanstack/react-query';
import { MoverReviewListItem } from '@/shared/types/types';

export const useReviewList = (id: string, page: number) => {
  return useQuery({
    queryKey: ['reviewList', id, page],
    queryFn: () => getReviewList(id, page),
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
    placeholderData: (prev) => prev,
  });
};

export function useMoverDetail(id: string) {
  return useQuery({
    queryKey: ['moverDetail', id],
    queryFn: () => getMoverDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
    placeholderData: (prev) => prev,
  });
}

export function mapKeysToLabels<T extends string>(
  keys: T[] | null | undefined,
  dictionary: { key: T; label: string }[],
): string[] {
  if (!keys) return [];
  return keys
    .map((key) => dictionary.find((item) => item.key === key)?.label)
    .filter((label): label is string => !!label);
}
export function mapMoverProfileToCardData(moverData: MoverData, userInfo: UserInfo): UserCardData {
  return {
    id: userInfo.id,
    name: moverData.nickname ?? userInfo.username,
    userProfileImage: userInfo.profileImage ?? undefined,
    service: mapKeysToLabels(moverData.serviceList, SERVICE_TYPES),
    provideService: moverData.serviceList ?? undefined,
    region: mapKeysToLabels(moverData.serviceArea, REGIONS),
    detailDescription: moverData.intro ?? undefined,
    likeCount: moverData.likeCount ?? undefined,
    career: Number(moverData.career ?? 0),
    totalRating: Number(moverData.totalRating ?? 0),
    reviewCounts: Number(moverData.reviewCounts ?? 0),
    confirmation: Number(moverData.confirmQuotation ?? 0),
  };
}
export function mapReviewToCardData(review: MoverReviewListItem): UserCardData {
  return {
    name: review.customerNick,
    review: {
      content: review.content,
      averageScore: review.rating,
    },
    createTime: review.createdAt,
  };
}
