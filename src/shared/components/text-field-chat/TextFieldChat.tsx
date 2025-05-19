import theme from '@/shared/theme';
import { Box, Stack } from '@mui/material';

const radius = {
  mobile: '24px',
  desktop: '30px',
};

export default function TextFieldChat() {
  return (
    <Stack alignItems="flex-end">
      <Stack
        alignItems="center"
        sx={{
          width: {
            xs: `329px`,
            md: `234px`,
          },
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: {
            xs: `24px 0 24px 24px`,
            md: `0 30px 30px 30px`,
          },
        }}
      >
        <div>테스트</div>
      </Stack>
    </Stack>
  );
}
