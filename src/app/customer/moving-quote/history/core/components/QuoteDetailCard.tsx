import { colorChips } from '@/shared/styles/colorChips';
import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';

interface QuoteDetailCardProps {
  quoteData: { label: string; value: string }[];
}

export const QuoteDetailCard = ({ quoteData }: QuoteDetailCardProps) => {
  return (
    <Stack sx={dataWrapperSx}>
      <Typo content="견적 정보" className="text_SB_16to24" color={colorChips.black[400]} />
      <Stack sx={dataBoxSx}>
        {quoteData.map((item) => (
          <Stack key={item.label} direction="row" alignItems="center">
            <Typo
              content={item.label}
              className="text_R_14to20"
              color={colorChips.grayScale[300]}
              customStyle={{ width: '110px' }}
            />
            <Typo content={item.value} className="text_R_14to20" color={colorChips.black[400]} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const dataWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '24px', md: '40px' },
};

const dataBoxSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: '8px',
  borderRadius: '16px',
  padding: { xs: '16px', sm: '24px 32px', md: '32px 40px' },
  backgroundColor: colorChips.background.f7f7f7,
  border: `1px solid ${colorChips.line.f2f2f2}`,
};
