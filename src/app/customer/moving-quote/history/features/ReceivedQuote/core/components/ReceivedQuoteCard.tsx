import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { CustomerQuoteHistoryData } from '@/shared/types/types';

export const ReceivedQuoteCard = ({ data }: { data: CustomerQuoteHistoryData }) => {
  return (
    <Stack sx={cardContainerSx}>
      <Stack sx={dataWrapperSx}>
        <Typo content="견적 정보" className="text_SB_16to24" color={colorChips.black[400]} />
      </Stack>
      <Stack sx={dataWrapperSx}>
        <Typo content="견적서 목록" className="text_SB_16to24" color={colorChips.black[400]} />
      </Stack>
    </Stack>
  );
};

const cardContainerSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '32px', md: '48px' },
  border: `0.5px solid ${colorChips.line.f2f2f2}`,
  borderRadius: { xs: '0px', sm: '24px', md: '40px' },
  padding: { xs: '40px 24px', sm: '16px 32px', md: '48px 40px' },
  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.08)',
};

const dataWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '14px', md: '24px' },
};
