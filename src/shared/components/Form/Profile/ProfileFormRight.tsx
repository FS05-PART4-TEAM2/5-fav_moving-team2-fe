import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { useMediaQuery } from '@mui/system';
import InputField from '../../Input/InputField';
import theme from '@/shared/theme';
import { Divider, Stack } from '@mui/material';
import ProfileFormPassword from './ProfileFormPassword';
import ProfileImageUploader from './ProfileImageUploader';
import ServiceSelector from './ServiceSelector';
import RegionSelector from './RegionSelector';

interface ProfileFormProps {
  mode: 'create' | 'modify' | 'baseInfo';
  userType: 'customer' | 'mover';
}

export default function ProfileFormRight({ mode, userType }: ProfileFormProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const isModify = mode === 'modify';
  const isCustomer = userType === 'customer';
  const isMover = userType === 'mover';
  const isBaseInfo = mode === 'baseInfo';
  const isCreate = !isModify && !isBaseInfo;

  return (
    <>
      {!isBaseInfo ? (
        <Stack
          sx={{
            width: '100%',
            paddingTop: isMd ? '20px' : '',
            gap: isMd ? '20px' : '32px',
          }}
        >
          {isMover && isCreate && (
            <>
              <Stack component="section" spacing={2}>
                <Stack direction="row" gap="4px">
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.black[300] }}
                    content={'상세 설명'}
                  />
                  <Typo
                    className={isMd ? 'text_SB_16' : 'text_SB_20'}
                    style={{ color: colorChips.primary[300] }}
                    content="*"
                  />
                </Stack>
                <InputField
                  name="detailDescription"
                  override={{
                    backgroundColor: colorChips.background['f7f7f7'],
                  }}
                />
              </Stack>

              <Divider
                variant="fullWidth"
                sx={{ borderColor: colorChips.line['f2f2f2'], width: isMd ? '327px' : '640px' }}
              />
            </>
          )}

          {isCustomer && <ProfileImageUploader />}

          {isCustomer && <Divider sx={{ borderColor: colorChips.line['f2f2f2'], width: isMd ? '327px' : '640px' }} />}
          <ServiceSelector userType={userType} />
          <Divider sx={{ borderColor: colorChips.line['f2f2f2'], width: isMd ? '327px' : '640px' }} />
          <RegionSelector userType={userType} />

          {isMover && isMd && isModify && (
            <Stack component="section" spacing={2}>
              <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
              <Stack direction="row" gap="4px">
                <Typo
                  className={isMd ? 'text_SB_16' : 'text_SB_20'}
                  style={{ color: colorChips.black[300] }}
                  content={'상세 설명'}
                />
                <Typo
                  className={isMd ? 'text_SB_16' : 'text_SB_20'}
                  style={{ color: colorChips.primary[300] }}
                  content="*"
                />
              </Stack>
              <InputField
                name="detailDescription"
                override={{
                  backgroundColor: colorChips.background['f7f7f7'],
                }}
              />
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack pt={isMd ? '20px' : ''}>
          <ProfileFormPassword />
        </Stack>
      )}
    </>
  );
}
