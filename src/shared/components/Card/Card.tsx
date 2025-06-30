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
import { SolidButton } from '../Button/SolidButton';

interface CardProps {
  type: PresetCardName;
  data: UserCardData;
  height?: string;
  bgColor?: boolean;
  isModal?: boolean;
  onRequestClick?: (id: string) => void;
  onRejectClick?: (id: string) => void;
}

export default function Card({ type, data, isModal, height, bgColor, onRequestClick, onRejectClick }: CardProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery('(max-width:420px)');
  const router = useRouter();

  const isProfile = type === 'profile';
  const isReview = type === 'review';
  const isFinish = type === 'rejectRequest' || type === 'finishRequest' || type === 'refuse';
  const isFinishExcludeReject = type === 'finishRequest' || type === 'refuse';

  return (
    <Box position="relative" width="100%">
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

            {isFinishExcludeReject && (
              <OutlinedButton
                text="견적 상세보기"
                width="100%"
                isButtonBC
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
        bgcolor={bgColor ? colorChips.background.fafafa : 'white'}
        p={isModal ? ' ' : isMd ? '20px' : '30px 20px'}
        border={isModal || isReview ? ' ' : `0.5px solid ${colorChips.line['f2f2f2']}`}
        borderRadius={isMd ? '16px' : '24px'}
      >
        <Stack>
          <CardHeader type={type} data={data} isModal={isModal} />
        </Stack>

        <Stack>
          <CommonCardInfo
            type={type}
            data={data}
            isModal={isModal}
            bgColor={bgColor}
            onRequestClick={onRequestClick}
            onRejectClick={onRejectClick}
          />
        </Stack>
      </Stack>
      {isProfile && isMd && (
        <Stack direction={isMobile ? 'column' : 'row'} width="100%" gap="8px" pt="10px">
          <SolidButton
            text="내 프로필 수정"
            onClick={() => router.push(`${PATH.mover.editProfile}`)}
            hasIcon={true}
            style={{ textWrap: 'nowrap' }}
          />
          <OutlinedButton
            text="기본 정보 수정"
            buttonType="done"
            onClick={() => router.push(`${PATH.mover.editInfo}`)}
            hasIcon={true}
            style={{ textWrap: 'nowrap' }}
          />
        </Stack>
      )}
    </Box>
  );
}
