import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { useMediaQuery } from '@mui/system';
import InputField from '../../Input/InputField';
import theme from '@/shared/theme';
import { Divider, Stack } from '@mui/material';
import ProfileFormPassword from './ProfileFormPassword';
import ProfileImageUploader from './ProfileImageUploader';

interface ProfileFormProps {
  mode: 'create' | 'modify' | 'baseInfo';
  userType: 'customer' | 'mover';
}

export default function ProfileFormLeft({ mode, userType }: ProfileFormProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const isModify = mode === 'modify';
  const isCustomer = userType === 'customer';
  const isMover = userType === 'mover';
  const isBaseInfo = mode === 'baseInfo';
  const isCreate = mode === 'create';

  return (
    <Stack gap={isMd ? '20px' : '32px'}>
      {isMover && !isBaseInfo && (
        <Stack component="section">
          <ProfileImageUploader /> <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
        </Stack>
      )}

      {isCustomer || isBaseInfo ? (
        <>
          <Stack component="section">
            <Typo
              className={isMd ? 'text_SB_16' : 'text_SB_20'}
              style={{ color: colorChips.black[300] }}
              content={'이름'}
            />

            <InputField
              name="username"
              override={{
                backgroundColor: colorChips.background['f7f7f7'],
              }}
            />
          </Stack>
          <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
          <Stack component="section" spacing={2}>
            <Typo
              className={isMd ? 'text_SB_16' : 'text_SB_20'}
              style={{ color: colorChips.black[300] }}
              content={'이메일'}
            />
            <InputField
              name="email"
              override={{
                backgroundColor: colorChips.background['f7f7f7'],
              }}
            />
          </Stack>
          <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
          <Stack component="section" spacing={2}>
            <Typo
              className={isMd ? 'text_SB_16' : 'text_SB_20'}
              style={{ color: colorChips.black[300] }}
              content={'전화번호'}
            />
            <InputField
              name="phoneNumber"
              override={{
                backgroundColor: colorChips.background['f7f7f7'],
              }}
            />
          </Stack>
          {isCustomer || isMd ? <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} /> : ''}
        </>
      ) : (
        ''
      )}

      {isMover && !isBaseInfo && (
        <>
          <Stack component="section">
            <Stack direction="row" gap="4px">
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.black[300] }}
                content={'별명'}
              />
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.primary[300] }}
                content="*"
              />
            </Stack>
            <InputField
              name="nickname"
              override={{
                backgroundColor: colorChips.background['f7f7f7'],
              }}
            />
          </Stack>

          <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />

          <Stack component="section" spacing={2}>
            <Stack direction="row" gap="4px">
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.black[300] }}
                content={'경력'}
              />
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.primary[300] }}
                content="*"
              />
            </Stack>
            <InputField
              name="career"
              override={{
                backgroundColor: colorChips.background['f7f7f7'],
              }}
            />
          </Stack>

          <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />

          <Stack component="section" spacing={2}>
            <Stack direction="row" gap="4px">
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.black[300] }}
                content={'한 줄 소개'}
              />
              <Typo
                className={isMd ? 'text_SB_16' : 'text_SB_20'}
                style={{ color: colorChips.primary[300] }}
                content="*"
              />
            </Stack>
            <InputField
              name="intro"
              override={{
                backgroundColor: colorChips.background['f7f7f7'],
              }}
            />
          </Stack>
        </>
      )}
      {isMover && !isBaseInfo && !isCreate && <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />}

      {isCustomer && <ProfileFormPassword />}

      {isMover && !isMd && isModify && (
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
      )}
    </Stack>
  );
}
