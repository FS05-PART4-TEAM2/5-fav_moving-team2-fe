import { Box, Stack, useMediaQuery } from '@mui/material';
import CommonCardInfo from './CommonCardInfo';
import CardHeader from './CardHeader';
import { PresetCardName, UserCardData } from './CardPresets';
import { Typo } from '@/shared/styles/Typo/Typo';
import { OutlinedButton } from '../Button/OutlinedButton';
import theme from '@/shared/theme';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { colorChips } from '@/shared/styles/colorChips';

interface CardProps {
  type: PresetCardName;
  data: UserCardData;
  height?: string;
  isModal?: boolean;
  onRequestClick?: (id: string) => void;
  onRejectClick?: (id: string) => void;
}

export default function Card({ type, data, isModal, height, onRequestClick, onRejectClick }: CardProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const isFinish = type === 'rejectRequest' || type === 'finishRequest' || type === 'refuse';

  return (
    <Box position="relative">
      {isFinish && (
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
            borderRadius: isMd ? '16px' : '24px',
          }}
        >
          <Stack padding="24px" borderRadius="12px" alignItems="center" gap="16px" sx={{ minWidth: '240px' }}>
            <Typo className={isMd ? 'text_SB_16' : 'text_SB_18'} style={{ color: 'white' }}>
              {type === 'refuse'
                ? '거절된 요청이에요'
                : type === 'rejectRequest'
                ? '반려된 요청이에요'
                : '이사 완료된 견적이에요'}
            </Typo>

            {isFinish && (
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
        height={height}
        gap="16px"
        bgcolor="white"
        p={isModal ? ' ' : isMd ? '20px' : '30px 20px'}
        border={isModal ? ' ' : `1px solid ${colorChips.line['f2f2f2']}`}
        borderRadius={isMd ? '16px' : '24px'}
      >
        <Stack>
          <CardHeader
            type={type}
            services={data.service ?? []}
            detailDescription={data.detailDescription}
            name="김코드"
            data={data}
            isModal={isModal}
          />
        </Stack>

        <Stack>
          <CommonCardInfo
            type={type}
            data={data}
            isModal={isModal}
            onRequestClick={onRequestClick}
            onRejectClick={onRejectClick}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
