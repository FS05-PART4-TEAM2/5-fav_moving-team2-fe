import { Stack, useMediaQuery } from '@mui/material';
import { PresetCardName, UserCardData } from './CardPresets';
import dayjs from '@/lib/utill';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import Chip, { CategoryKey } from '../Chip/Chip';
import theme from '@/shared/theme';
import { SolidButton } from '../Button/SolidButton';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { OutlinedButton } from '../Button/OutlinedButton';

import Image from 'next/image';

interface CardHeaderProps {
  type: PresetCardName;
  services: string[];
  moveDay?: string;
  name?: string;
  description?: string;
  data: UserCardData;
}

const labelToCategoryKey: Record<string, CategoryKey> = {
  소형이사: 'small',
  가정이사: 'home',
  사무실이사: 'office',
  '지정 견적 요청': 'select',
  '견적 대기': 'wait',
};

export default function CardHeader({ type, services, moveDay, description, name, data }: CardHeaderProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLarge = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();

  const extraInfo =
    type === 'finishReview' && data.moveDay
      ? dayjs(data.moveDay).format('YYYY.MM.DD')
      : type === 'confirmRequest'
      ? dayjs(data.moveDay).format('YYYY.MM.DD')
      : type === 'request'
      ? dayjs(data.moveDay).fromNow()
      : '';

  const extraInfoText = isMobile ? 'text_R_12' : 'text_R_14';
  const descriptionText = isMobile ? 'text_SB_14' : 'text_SB_24';
  const profileNameText = isMobile ? 'text_SB_16' : 'text_SB_24';
  const profileDescriptionText = isMobile ? 'text_R_14' : 'text_R_20';
  const ExcludeDescription =
    type !== 'profile' &&
    type !== 'pickMover' &&
    type !== 'confirmRequest' &&
    type !== 'request' &&
    type !== 'writeReview' &&
    type !== 'review' &&
    type !== 'finishReview';

  return (
    <Stack direction="column" justifyContent="space-between" sx={{ gap: { sm: '14px', md: '16px' } }}>
      <Stack direction="row" flexWrap="wrap" sx={{ gap: { xs: '8px', md: '12px' } }}>
        {description && type !== 'profile' && type !== 'review' ? (
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" flexWrap="wrap" sx={{ gap: { xs: '8px', md: '12px' }, flex: 1, minWidth: 0 }}>
              {services.map((label, idx) => {
                const category = labelToCategoryKey[label];
                return category ? <Chip key={idx} type={category} /> : null;
              })}
            </Stack>
            {extraInfo && <Typo className={extraInfoText} color="text.secondary" content={extraInfo} />}
          </Stack>
        ) : (
          <Stack direction="row" sx={{ gap: { xs: '8px', md: '12px' } }}>
            {type === 'profile' && !isLarge && (
              <Stack
                sx={{
                  width: {
                    xs: 46,
                    lg: 56,
                  },
                  height: {
                    xs: 46,
                    lg: 56,
                  },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `2px solid black`,
                  position: 'relative',
                }}
              >
                <Image src={data.userProfileImage ?? ''} alt="user profile Image" fill style={{ objectFit: 'cover' }} />
              </Stack>
            )}

            {type !== 'review' && (
              <Stack direction="column" flexWrap="nowrap" sx={{ gap: { xs: '2px', md: '12px' } }}>
                <Typo className={profileNameText}>{name}</Typo>
                <Typo className={profileDescriptionText} sx={{ color: colorChips.grayScale[400], textWrap: 'nowrap' }}>
                  {description}
                </Typo>
              </Stack>
            )}
            {type === 'profile' && isLarge ? (
              <Stack direction="row" gap="8px">
                <OutlinedButton
                  text="기본 정보 수정"
                  buttonSize="sm"
                  buttonType="done"
                  width="fit-content"
                  onClick={() => router.push(`${PATH.mover.profile}`)}
                  hasIcon={true}
                  style={{ textWrap: 'nowrap' }}
                />
                <SolidButton
                  text="내 프로필 수정"
                  buttonSize="sm"
                  width="fit-content"
                  onClick={() => router.push(`${PATH.mover.profile}`)}
                  hasIcon={true}
                  style={{ textWrap: 'nowrap' }}
                />
              </Stack>
            ) : (
              ''
            )}
          </Stack>
        )}
      </Stack>

      {description && ExcludeDescription ? <Typo className={descriptionText}>{description}</Typo> : ''}
    </Stack>
  );
}
