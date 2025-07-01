'use client';

import { SolidButton } from '@/shared/components/Button/SolidButton';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const theme = useTheme();

  return (
    <html>
      <body>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          bgcolor={theme.palette.background.default}
          spacing={2}
        >
          <Typo className="text_B_24to38" content={'치명적인 오류 발생'} />
          <Typo className="text_R_14to20" content={'다시 시도하시겠습니까?'} />
          <SolidButton text={'다시 시도'} width={'30%'} onClick={() => reset()} />
        </Stack>
      </body>
    </html>
  );
}
