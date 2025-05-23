import { Divider, Stack, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { UserCardData } from './CardPresets';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import Image from 'next/image';

interface ReviewSectionProps {
  data: UserCardData;
}

export default function ReviewSection({ data }: ReviewSectionProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

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
          {data.createTime}{' '}
        </Typo>
      </Stack>

      <Stack
        position="relative"
        sx={{
          width: {
            xs: '20px',
            md: '24px',
          },
          height: { xs: '20px', md: '24px' },
          mb: isMdDown ? '8px' : '12px',
        }}
      >
        <Image
          src="/assets/images/start-icon/star-yellow-24x24.svg"
          alt="like icon"
          fill
          style={{ objectFit: 'contain' }}
        />
      </Stack>

      <Divider />
      <Typo
        className={isMdDown ? 'text_R_14' : 'text_R_18'}
        style={{ color: colorChips.black['b2b2b'], paddingTop: isMdDown ? '8px' : '12px' }}
      >
        {data.review?.content || '작성된 리뷰가 없습니다.'}
      </Typo>
    </Stack>
  );
}
