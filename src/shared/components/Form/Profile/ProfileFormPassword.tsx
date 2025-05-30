import { Typo } from '@/shared/styles/Typo/Typo';
import { Divider, Stack } from '@mui/material';
import InputField from '../../Input/InputField';
import { colorChips } from '@/shared/styles/colorChips';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';

interface ProfileFormPasswordProps {
  mode?: 'create' | 'modify' | 'baseInfo';
}

export default function ProfileFormPassword({ mode }: ProfileFormPasswordProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isBaseInfo = mode === 'baseInfo';

  return (
    <>
      <Stack gap={isMd ? '20px' : '32px'}>
        <Stack component="section" spacing={2}>
          <Typo
            className={isMd ? 'text_SB_16' : 'text_SB_20'}
            style={{ color: colorChips.black[300] }}
            content={'현재 비밀번호'}
          />
          <InputField
            name="currentPassword"
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
            content={'새 비밀번호'}
          />
          <InputField
            name="newPassword"
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
            content={'새 비밀번호 확인'}
          />
          <InputField
            name="newPasswordConfirm"
            override={{
              backgroundColor: colorChips.background['f7f7f7'],
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}
