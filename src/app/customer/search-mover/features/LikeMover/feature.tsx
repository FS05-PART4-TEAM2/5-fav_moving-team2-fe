import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import { useLikeMoverList } from '@/shared/hooks/useLikeMoverListQuery';
import { MoverCardSmall } from './core/components/MoverCardSmall';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';

export const LikeMoverFeature = () => {
  const router = useRouter();
  const { likeMovers } = useLikeMoverList(3);

  if (likeMovers.length <= 0) {
    return null; // 데이터 없으면 아예 안보이게
  }

  const handleClickMore = () => {
    router.push(PATH.customer.pickMover);
  };

  return (
    <Stack width="100%" height="100%" direction="column" gap="16px">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typo className="text_SB_20" content="찜한 기사님" color={colorChips.black[400]} />
        <Typo
          className="text_M_16"
          content="더보기"
          color={colorChips.grayScale[300]}
          customStyle={{ cursor: 'pointer' }}
          onClick={handleClickMore}
        />
      </Stack>
      {likeMovers.map((item) => {
        const data = {
          ...item,
          nickname: item.nickName || '',
          profileImage: item.profileImage || '',
          intro: item.intro || '',
        };
        return <MoverCardSmall key={item.id} data={data} />;
      })}
    </Stack>
  );
};
