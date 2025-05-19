'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { typographyStyles } from '@/shared/styles/Typo/TypoStyles';
import { Stack } from '@mui/material';

interface ChatBubbleProps {
  type: 'user' | 'bot';
  message: string;
}

export default function TextFieldChat({ type, message }: ChatBubbleProps) {
  const isUser = type === 'user';
  return (
    <Stack alignItems={isUser ? 'flex-start' : 'flex-end'}>
      <Stack
        justifyContent="center"
        alignItems="flex-start"
        sx={(theme) => ({
          maxWidth: {
            xs: '80%',
            md: '60%',
          },
          minHeight: {
            xs: '40px',
            md: '50px',
          },
          px: {
            xs: '20px',
            md: '40px',
          },
          py: {
            xs: '12px',
            md: '20px',
          },
          fontSize: {
            ...typographyStyles.text_M_14,
            [theme.breakpoints.up('md')]: typographyStyles.text_M_18,
          },
          color: isUser ? colorChips.black[400] : 'white',
          bgcolor: isUser ? 'white' : `${theme.palette.secondary.main}`,
          borderRadius: {
            xs: isUser ? '0 24px 24px 24px' : '24px 0 24px 24px',
            md: isUser ? 'p 24px 30px 30px' : '30px 0 30px 30px',
          },
          wordBreak: 'break-word',
        })}
      >
        {message}
      </Stack>
    </Stack>
  );
}
