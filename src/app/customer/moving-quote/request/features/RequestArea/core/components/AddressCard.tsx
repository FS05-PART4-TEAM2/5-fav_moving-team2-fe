import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

interface AddressCardProps {
  isSelected: boolean;
  code: string;
  roadAddr: string;
  jibunAddr: string;
  onClick: () => void;
}

export const AddressCard = ({ isSelected, code, roadAddr, jibunAddr, onClick }: AddressCardProps) => {
  return (
    <Stack sx={isSelected ? selectedSx : defaultSx} onClick={onClick}>
      <Typo content={code} className="text_SB_14to18" color={colorChips.black[400]} />
      <AddressItem isSelected={isSelected} type="road" text={roadAddr} />
      <AddressItem isSelected={isSelected} type="jibun" text={jibunAddr} />
    </Stack>
  );
};

const AddressItem = ({ isSelected, type, text }: { isSelected: boolean; type: 'road' | 'jibun'; text: string }) => {
  const chipTitle = type === 'road' ? '도로명' : '지번';
  return (
    <Stack sx={itemWrapperSx}>
      <Stack sx={{ ...chipSx, backgroundColor: isSelected ? colorChips.primary[100] : colorChips.grayScale[50] }}>
        <Typo content={chipTitle} className="text_SB_12to14" color={colorChips.primary[300]} />
      </Stack>
      <Typo
        content={text}
        className="text_R_14to16"
        color={colorChips.black[400]}
        customStyle={{ wordBreak: 'break-word' }}
      />
    </Stack>
  );
};

const baseSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: '16px',
  borderRadius: '16px',
  padding: '20px 16px 24px',
  cursor: 'pointer',
};

const defaultSx = {
  ...baseSx,
  border: `1px solid ${colorChips.line.f2f2f2}`,
};

const selectedSx = {
  ...baseSx,
  border: `1px solid ${colorChips.primary[300]}`,
  backgroundColor: colorChips.primary[50],
};

const itemWrapperSx = {
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  gap: '8px',
};

const chipSx = {
  flexShrink: 0,
  width: { xs: '44px', md: '54px' },
  height: '100%',
  p: '2px 4px',
  borderRadius: '16px',
  justifyContent: 'center',
  alignItems: 'center',
};
