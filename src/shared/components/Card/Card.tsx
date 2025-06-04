import { Box, Stack, useMediaQuery } from '@mui/material';
import CommonCardInfo from './CommonCardInfo';
import CardHeader from './CardHeader';
import { PresetCardName, UserCardData } from './CardPresets';
import { Typo } from '@/shared/styles/Typo/Typo';
import { OutlinedButton } from '../Button/OutlinedButton';
import theme from '@/shared/theme';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';

interface CardProps {
  type: PresetCardName;
  data: UserCardData;
}

export default function Card({ type, data }: CardProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  return (
    <Box position="relative">
      {(type === 'rejectRequest' || type === 'finishRequest') && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#040404A3',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: isMdDown ? '16px' : '24px',
          }}
        >
          <Stack padding="24px" borderRadius="12px" alignItems="center" gap="16px" sx={{ minWidth: '240px' }}>
            <Typo className={isMdDown ? 'text_SB_16' : 'text_SB_18'} style={{ color: 'white' }}>
              {type === 'rejectRequest' ? '반려된 요청이에요' : '이사 완료된 견적이에요'}
            </Typo>

            {type === 'finishRequest' && (
              <OutlinedButton
                text="견적 상세보기"
                width="100%"
                onClick={() => router.push(`${PATH.mover.movingQuoteHistory}/${data.id}`)}
              />
            )}
          </Stack>
        </Box>
      )}
      <Stack
        direction="column"
        width="100%"
        gap="14px"
        p={isMdDown ? '20px' : '30px 20px'}
        bgcolor="white"
        borderRadius={isMdDown ? '16px' : '24px'}
      >
        <Stack>
          <CardHeader
            type={type}
            services={data.service ?? []}
            detailDescription={data.detailDescription}
            name="김코드"
            data={data}
          />
        </Stack>

        <Stack>
          <CommonCardInfo type={type} data={data} />
        </Stack>
      </Stack>
    </Box>
  );
}
