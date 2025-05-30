import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';
import { Stack, useMediaQuery } from '@mui/system';

interface ProfileFormHeaderProps {
  mode: 'create' | 'modify' | 'baseInfo';
  userType: 'customer' | 'mover';
}

export default function ProfileFormHeader({ mode, userType }: ProfileFormHeaderProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const isModify = mode === 'modify';
  const isBaseInfo = mode === 'baseInfo';
  const isCustomer = userType === 'customer';
  const isCreate = mode === 'create';

  const title = isBaseInfo
    ? '기본정보 수정'
    : isModify
    ? '프로필 수정'
    : `${isCustomer ? '일반 유저' : '기사님'} 프로필 등록`;

  return (
    <Stack gap={isMd ? '16px' : '32px'}>
      <Typo
        className={isMd ? 'text_B_18' : 'text_SB_32'}
        style={{ color: colorChips.black[400], textWrap: 'nowrap' }}
        content={title}
      />
      {isCreate && (
        <Typo
          className={isMd ? 'text_SB_16' : 'text_SB_20'}
          style={{ color: isMd ? colorChips.black[100] : colorChips.black[200], textWrap: 'nowrap' }}
          content={'추가 정보를 입력하여 회원가입을 완료해주세요'}
        />
      )}
    </Stack>
  );
}
