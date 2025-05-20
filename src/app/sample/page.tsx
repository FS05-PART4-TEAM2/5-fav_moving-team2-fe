'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Stack, SxProps } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { useState } from 'react';

// import Textarea from '@/shared/components/Input/TextArea';
// import TextFieldChat from '@/shared/components/TextFieldChat/TextFieldChat';
// import Chip from '@/shared/components/Chip/Chip';
import { TabBarSampleProvider, useTabBarType } from './core/hooks/TabBarSampleProvider';
import { TabBar } from '@/shared/components/Tab/TabBar';
import { CommonModal } from '@/shared/components/Modal/CommonModal';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { OutlinedButton } from '@/shared/components/Button/OutlinedButton';
import { ResponsiveModal } from '@/shared/components/Modal/ResponsiveModal';

// Box는 div와 동일, Stack은 flex가 적용된 div입니다.
// Typo, colorChips 아래와같이 사용하시면 됩니다.
// 스타일링은 컴포넌트에 직접 적용하거나 sx로 줄 수 있는데,
// 저는 주로 3~5개 정도 있을 땐 1번 방법을 쓰고 css가 너무 길어지면 2번처럼 변수로 정의해서 사용하는 편입니다.

export default function SamplePage() {
  return (
    <TabBarSampleProvider>
      <TabBarSample />
    </TabBarSampleProvider>
  );
}

function TabBarSample() {
  // const [value, setValue] = useState('');
  // const isTooShort = value.length > 0 && value.length < 10;

  // XXX:탭바 사용할 페이지 레이아웃에 프로바이더를 넣고, 사용할 컴포넌트에서 탭바를 추가합니다!
  const { tabBarType, setTabBarType } = useTabBarType();

  return (
    <Stack justifyContent="center" alignItems="center" gap="20px" padding="20px" height="100%">
      <Stack
        direction="column"
        width="100%"
        height="100%"
        alignItems="flex-start"
        bgcolor={colorChips.background.f7f7f7}
      >
        {/* 헤더 영역- 탭바*/}
        <Stack width="100%" borderBottom={`1px solid ${colorChips.black[100]}`}>
          <TabBar
            currentVal={tabBarType}
            firstVal={'tabBarType1'}
            firstLabel="테스트1"
            secondVal={'tabBarType2'}
            secondLabel="테스트2"
            handleChange={(val) => setTabBarType(val as 'tabBarType1' | 'tabBarType2')}
          />
        </Stack>
        {/* 탭바 타입에 따른 컴포넌트 사용 영역 */}
        {tabBarType === 'tabBarType1' ? <TabBarTest1 /> : <TabBarTest2 />}
      </Stack>

      {/* CommonButton 테스트 - 확인하고 다 주석처리해주셔도 됩니다~ */}
      {/* <SolidButton buttonSize="sm" text="sm with icon" hasIcon={true} />
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
      <OutlinedButton text="md outlined disabled" disabled={true} /> */}

      {/* TextFieldChat, Textarea 테스트 - 확인하고 주석 처리하셔도 됩니다!?! */}
      {/* <Stack height="300px" gap="20px" bgcolor={colorChips.background.f7f7f7}>
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
      </Stack> */}
    </Stack>
  );
}

const TabBarTest1 = () => {
  return (
    <Stack
      direction="row"
      width="100%"
      height="100px"
      justifyContent="center"
      alignItems="center"
      bgcolor={colorChips.primary[100]}
    >
      <Typo content="탭바테스트 1번컴포넌트입니다." className="text_M_16" color={colorChips.black[400]} />
    </Stack>
  );
};

const TabBarTest2 = () => {
  const [isCommonModalOpen, setIsCommonModalOpen] = useState(false);
  const [isResponsiveModalOpen, setIsResponsiveModalOpen] = useState(false);
  const handleOpenCommonModal = () => {
    setIsCommonModalOpen(true);
  };
  const handleCloseCommonModal = () => {
    setIsCommonModalOpen(false);
  };
  const handleOpenResponsiveModal = () => {
    setIsResponsiveModalOpen(true);
  };
  const handleCloseResponsiveModal = () => {
    setIsResponsiveModalOpen(false);
  };

  return (
    <>
      <Stack
        direction="column"
        width="100%"
        height="300px"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        bgcolor={colorChips.background.f7f7f7}
      >
        <Typo content="탭바테스트 2번컴포넌트입니다." className="text_M_16" color={colorChips.black[400]} />
        <OutlinedButton buttonSize="sm" text="CommonModal 열기" onClick={handleOpenCommonModal} />
        <OutlinedButton buttonSize="sm" text="ResponsiveModal 열기" onClick={handleOpenResponsiveModal} />
      </Stack>

      {isCommonModalOpen && (
        <CommonModal
          modalTitle="지정 견적 요청하기"
          isOpen={isCommonModalOpen}
          handleClickClose={handleCloseCommonModal}
        >
          <Stack padding="20px 0" gap="10px" alignItems="center">
            <Typo content="테스트테스트" className="text_M_18" color={colorChips.black[400]} />
            <SolidButton buttonSize="sm" text="확인" onClick={handleCloseCommonModal} />
          </Stack>
        </CommonModal>
      )}

      {isResponsiveModalOpen && (
        <ResponsiveModal
          modalTitle="견적 보내기"
          isOpen={isResponsiveModalOpen}
          handleClickClose={handleCloseResponsiveModal}
        >
          <Stack padding="20px 0" gap="10px" alignItems="center">
            <Typo content="테스트테스트" className="text_M_18" color={colorChips.black[400]} />
          </Stack>
        </ResponsiveModal>
      )}
    </>
  );
};
