import { Box, Stack, useMediaQuery } from '@mui/material';
import CommonCardInfo from './CommonCardInfo';
import CardHeader from './CardHeader';
import { PresetCardName, UserCardData } from './CardPresets';
import { Typo } from '@/shared/styles/Typo/Typo';
import { OutlinedButton } from '../Button/OutlinedButton';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';

interface CardProps {
  type: PresetCardName;
  data: UserCardData;
  isModal?: boolean;
  onRequestClick?: (id: string) => void;
  onRejectClick?: (id: string) => void;
}

export default function Card({ type, data, isModal, onRequestClick, onRejectClick }: CardProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Stack position="relative">
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
            borderRadius: isMd ? '16px' : '24px',
          }}
        >
          <Stack padding="24px" borderRadius="12px" alignItems="center" gap="16px" sx={{ minWidth: '240px' }}>
            <Typo className={isMd ? 'text_SB_16' : 'text_SB_18'} style={{ color: 'white' }}>
              {type === 'rejectRequest' ? '반려된 요청이에요' : '이사 완료된 견적이에요'}
            </Typo>

            {type === 'finishRequest' && (
              // TODO: 여기 onClick 처리 수정해야겠네요
              <OutlinedButton text="견적 상세보기" width="100%" onClick={() => console.log('견적 상세보기')} />
            )}
          </Stack>
        </Box>
      )}
      <Stack
        direction="column"
        width="100%"
        gap="16px"
        p={isModal ? ' ' : isMd ? '20px' : '30px 20px'}
        bgcolor="white"
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
    </Stack>
  );
}
