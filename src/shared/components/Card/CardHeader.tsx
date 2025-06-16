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
  data: UserCardData;
  isModal?: boolean;
}

const labelToCategoryKey: Record<string, CategoryKey> = {
  소형이사: 'SMALL_MOVE',
  가정이사: 'FAMILY_MOVE',
  사무실이사: 'OFFICE_MOVE',
  '지정 견적 요청': 'select',
  '견적 대기': 'wait',
  '확정 견적': 'confirmed',
};

export default function CardHeader({ type, data, isModal }: CardHeaderProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLarge = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();

  const extraInfo = !isModal
    ? type === 'finishReview' && data.moveDay
      ? dayjs(data.moveDay).format('YYYY.MM.DD')
      : type === 'request'
      ? dayjs(data.moveDay).fromNow()
      : ''
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

  const services: string[] = Array.isArray(data.service) ? data.service : [];
  const name: string = data.name || data.name || '';
  const detailDescription: string = data.detailDescription || '';

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      width="100%"
      sx={{ gap: { sm: '14px', md: '16px' }, ...(isModal ? { mt: { sm: '26px', md: '40px' } } : {}) }}
    >
      <Stack direction="row" flexWrap="wrap" width="100%" sx={{ gap: { xs: '8px', md: '12px' } }}>
        {(services.length > 0 || detailDescription) && type !== 'profile' && type !== 'review' ? (
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" flexWrap="wrap" sx={{ gap: { xs: '8px', md: '12px' }, flex: 1, minWidth: 0 }}>
              {data.status?.toUpperCase() === 'PENDING' && <Chip type="wait" />}
              {data.status?.toUpperCase() === 'CONFIRMED' && <Chip type="confirmed" />}

              {services.map((label, idx) => {
                const category = labelToCategoryKey[label];
                return category ? <Chip key={idx} type={category} /> : null;
              })}
              {data.isAssigned && <Chip type="select" />}
            </Stack>
            {extraInfo && <Typo className={extraInfoText} color="text.secondary" content={extraInfo} />}
          </Stack>
        ) : (
          <Stack
            direction="row"
            width="100%"
            justifyContent={isLarge ? 'space-between' : ''}
            alignItems="center"
            sx={{ gap: { xs: '8px', md: '12px' } }}
          >
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
                <Image
                  src={data.userProfileImage || '/assets/images/profile-icon/login-default-36x36.svg'}
                  alt="user profile Image"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Stack>
            )}

            {type !== 'review' && (
              <Stack direction="column" flexWrap="nowrap" sx={{ gap: { xs: '2px', md: '12px' } }}>
                <Typo className={profileNameText}>{name}</Typo>
                <Typo className={profileDescriptionText} sx={{ color: colorChips.grayScale[400], textWrap: 'nowrap' }}>
                  {detailDescription}
                </Typo>
              </Stack>
            )}
            {type === 'profile' && isLarge ? (
              <Stack direction="row" gap="8px">
                <OutlinedButton
                  text="기본 정보 수정"
                  buttonType="done"
                  width="fit-content"
                  onClick={() => router.push(`${PATH.mover.editInfo}`)}
                  hasIcon={true}
                  style={{ textWrap: 'nowrap' }}
                />
                <SolidButton
                  text="내 프로필 수정"
                  width="fit-content"
                  onClick={() => router.push(`${PATH.mover.editProfile}`)}
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

      {detailDescription && ExcludeDescription ? <Typo className={descriptionText}>{detailDescription}</Typo> : ''}
    </Stack>
  );
}
