// import TextFieldChat from '@/shared/components/text-field-chat/TextFieldChat';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { OutlinedButton } from '@/shared/components/Button/OutlinedButton';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Button, Stack, SxProps } from '@mui/material';

// Box는 div와 동일, Stack은 flex가 적용된 div입니다.
// Typo, colorChips 아래와같이 사용하시면 됩니다.
// 스타일링은 컴포넌트에 직접 적용하거나 sx로 줄 수 있는데,
// 저는 주로 3~5개 정도 있을 땐 1번 방법을 쓰고 css가 너무 길어지면 2번처럼 변수로 정의해서 사용하는 편입니다.

export default function SamplePage() {
  const typoSample = '타이포 텍스트 이렇게 넣으면 됩니다';
  return (
    // 스타일링 방법 1.
    <Stack justifyContent="center" alignItems="center" gap="20px" padding="20px" height="100%">
      {/* 스타일링 방법 2. */}
      <Stack sx={typoWraperSx}>
        <Typo className="text_R_24" content={typoSample} color={colorChips.background.f4f7fb} />
      </Stack>
      {/* MUI 컴포넌트 사용할 때 color에 primary, secondary 등 넣을 수 있음 - theme.ts에서 정의된 색상입니다. 정의안하면 기본적으로 primary 컬러 사용 */}
      <Button color="secondary" variant="contained" sx={buttonSx}>
        <Typo className="text_B_16" content="변수로 해도 되고 이렇게 바로 넣어도 돼요" />
      </Button>

      {/* CommonButton 테스트 - 확인하고 다 주석처리해주셔도 됩니다~ */}
      <SolidButton buttonSize="sm" text="sm with icon" hasIcon={true} />
      <SolidButton buttonSize="sm" text="sm no icon" />
      <SolidButton buttonSize="sm" text="sm disabled" disabled={true} />
      <SolidButton text="md with icon" hasIcon={true} />
      <SolidButton text="md no icon" />
      <SolidButton text="md disabled" disabled={true} />

      <OutlinedButton buttonSize="sm" text="sm outlined default" justifyContent="flex-start" />
      <OutlinedButton buttonType="done" buttonSize="sm" text="sm outlined done" justifyContent="flex-start" />
      <OutlinedButton buttonSize="sm" text="sm outlined disabled" disabled={true} justifyContent="flex-start" />
      <OutlinedButton text="md outlined default" />
      <OutlinedButton buttonType="done" text="md outlined done" hasIcon={true} />
      <OutlinedButton text="md outlined disabled" disabled={true} />
    </Stack>
  );
}

// 스타일링 방법 2.
const typoWraperSx: SxProps = {
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px',
  bgcolor: colorChips.secondary.red[200],
  borderRadius: '20px',
};

const buttonSx: SxProps = {
  height: '50px',
  borderRadius: '20px',

  // 이렇게 추가로 스타일 커스텀 가능합니다
  '&:hover': {
    bgcolor: colorChips.secondary.red[100],
  },
};
