import { Divider, Rating, Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { UserCardData } from './CardPresets';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import Image from 'next/image';
import dayjs from 'dayjs';

interface ReviewSectionProps {
  data: UserCardData;
}

export default function ReviewSection({ data }: ReviewSectionProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const formattedDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center" paddingBottom="8px">
        <Typo
          className={isMdDown ? 'text_R_14' : 'text_R_18'}
          style={{
            color: colorChips.black[400],
            borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
            paddingRight: isMdDown ? '12px' : '14px',
          }}
        >
          {data.name}{' '}
        </Typo>

        <Typo
          className={isMdDown ? 'text_R_14' : 'text_R_18'}
          style={{
            color: colorChips.grayScale[300],

            paddingLeft: isMdDown ? '12px' : '14px',
          }}
        >
          {formattedDate(data.createTime ?? '')}
        </Typo>
      </Stack>

      <Stack direction="row" spacing={0.5} mb={isMdDown ? '8px' : '12px'}>
        <Stack
          position="relative"
          sx={{
            width: {
              xs: '20px',
              md: '24px',
            },
            height: { xs: '20px', md: '24px' },
          }}
        >
          <Rating
            name="reviews"
            value={data.review?.averageScore}
            precision={0.1}
            readOnly
            icon={<StarIcon filled={true} />}
            emptyIcon={<StarIcon filled={false} />}
          />
        </Stack>
      </Stack>

      <Typo
        className={isMdDown ? 'text_R_14' : 'text_R_18'}
        style={{ color: colorChips.black['b2b2b'], paddingTop: isMdDown ? '8px' : '12px' }}
      >
        {data.review?.content || '작성된 리뷰가 없습니다.'}
      </Typo>

      <Divider sx={{ borderColor: colorChips.line['f2f2f2'], mt: '32px' }} />
    </Stack>
  );
}

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <Image
    src={filled ? `/assets/images/star-icon/star-yellow-24x24.svg` : `/assets/images/star-icon/star-gray-24x24.svg`}
    alt="star"
    width={24}
    height={24}
  />
);
