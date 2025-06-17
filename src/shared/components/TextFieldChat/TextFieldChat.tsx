'use client';

import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack } from '@mui/material';

interface ChatBubbleProps {
  color: 'white' | 'blue';
  align: 'left' | 'right';
  text?: string;
  isText?: boolean;
  children?: React.ReactNode;
}

export default function TextFieldChat({ color, align, isText = true, text, children }: ChatBubbleProps) {
  const isRight = align === 'right';
  const isBlue = color === 'blue';

  return (
    <Stack width="100%" direction="row" justifyContent={isRight ? 'flex-end' : 'flex-start'}>
      <Stack
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          maxWidth: {
            xs: '100%',
            md: '60%',
          },
          minHeight: {
            xs: '40px',
            md: '50px',
          },
          px: {
            xs: isText ? '20px' : '24px',
            md: isText ? '40px' : '32px',
          },
          py: {
            xs: isText ? '12px' : '20px',
            md: isText ? '20px' : '32px',
          },
          bgcolor: isBlue ? colorChips.primary[300] : 'white',
          borderRadius: {
            xs: isRight ? '24px 0 24px 24px' : '0 24px 24px 24px',
            md: isRight ? '30px 0 30px 30px' : '0 30px 30px 30px',
          },
        }}
      >
        {isText ? (
          <Typo
            content={text}
            className="text_M_14to18"
            color={isBlue ? colorChips.grayScale[50] : colorChips.black[400]}
            customStyle={{ wordBreak: 'break-word' }}
          />
        ) : (
          children
        )}
      </Stack>
    </Stack>
  );
}
