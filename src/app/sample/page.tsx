'use client';
import Textarea from '@/shared/components/Input/TextArea';
import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
import { useState } from 'react';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { OutlinedButton } from '@/shared/components/Button/OutlinedButton';
import { colorChips } from '@/shared/styles/colorChips';
import { Stack, SxProps } from '@mui/material';
import Chip from '@/shared/components/Chip/Chip';

// Box는 div와 동일, Stack은 flex가 적용된 div입니다.
// Typo, colorChips 아래와같이 사용하시면 됩니다.
// 스타일링은 컴포넌트에 직접 적용하거나 sx로 줄 수 있는데,
// 저는 주로 3~5개 정도 있을 땐 1번 방법을 쓰고 css가 너무 길어지면 2번처럼 변수로 정의해서 사용하는 편입니다.

export default function SamplePage() {
  const [value, setValue] = useState('');
  const isTooShort = value.length > 0 && value.length < 10;

  return (
    <Stack justifyContent="center" alignItems="center" gap="20px" padding="20px" height="100%">
      {/* CommonButton 테스트 - 확인하고 다 주석처리해주셔도 됩니다~ */}
      <SolidButton buttonSize="sm" text="sm with icon" hasIcon={true} />
      <SolidButton buttonSize="sm" text="sm no icon" />
      <SolidButton buttonSize="sm" text="sm disabled" disabled={true} />
      <SolidButton text="md with icon" hasIcon={true} />
      <SolidButton text="md no icon" />
      <SolidButton text="md disabled" disabled={true} hasIcon={true} />

      <OutlinedButton buttonSize="sm" text="sm outlined default" justifyContent="flex-start" />
      <OutlinedButton buttonType="done" buttonSize="sm" text="sm outlined done" justifyContent="flex-start" />
      <OutlinedButton buttonSize="sm" text="sm outlined disabled" disabled={true} justifyContent="flex-start" />
      <OutlinedButton text="md outlined default" />
      <OutlinedButton buttonType="done" text="md outlined done" hasIcon={true} />
      <OutlinedButton text="md outlined disabled" disabled={true} />

      {/* TextFieldChat, Textarea 테스트 - 확인하고 주석 처리하셔도 됩니다!?! */}
      <Stack height="300px" gap="20px" bgcolor={colorChips.background.f7f7f7}>
        <TextFieldChat
          type="user"
          message="테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트"
        />
        <TextFieldChat
          type="bot"
          message="테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트"
        />
      </Stack>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={isTooShort}
        helperText={isTooShort ? '10자 이상 입력해 주세요' : `${value.length}/500`}
      />

      <Stack height="200px" direction="row" gap="20px" bgcolor="black">
        <Chip type="home" />
        <Chip type="region" />
        <Chip type="select" />
        <Chip type="small">맞춤 이사</Chip>
      </Stack>
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
