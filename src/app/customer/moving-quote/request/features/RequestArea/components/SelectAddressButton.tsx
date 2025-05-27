import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

interface SelectAddressProps {
  optionType: 'start' | 'end';
  isSelected: boolean;
  selectedAddress: string;
  onClick: () => void;
}

/**
 * 주소 선택 / 표시 버튼
 */
export const SelectAddressButton = ({ optionType, isSelected, selectedAddress, onClick }: SelectAddressProps) => {
  const object = optionType === 'start' ? '출발지' : '도착지';
  // 주소를 선택한 경우 선택된 주소, 선택하지 않은 경우 선택하기 버튼
  const addressText = isSelected ? selectedAddress : `${object} 선택하기`;

  return (
    <Stack sx={wrapperSx}>
      <Typo content={object} className="text_M_14to18" color={colorChips.black[400]} />

      <Stack sx={selectAddressSx} onClick={onClick}>
        <Typo content={addressText} className="text_SB_16to20" color={colorChips.primary[300]} />
      </Stack>
    </Stack>
  );
};

const wrapperSx = {
  flexDirection: 'column',
  width: { xs: '280px', md: '560px' },
  height: '100%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: { xs: '8px', md: '16px' },
};

const selectAddressSx = {
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '16px',
  border: `1px solid ${colorChips.primary[300]}`,
  padding: '16px 24px',
  cursor: 'pointer',
};
