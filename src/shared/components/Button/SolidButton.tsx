import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Button, ButtonProps, CircularProgress, Stack } from '@mui/material';
import Image from 'next/image';

export type CustomButtonSize = 'sm' | 'md';

interface SolidButtonProps extends ButtonProps {
  buttonSize?: CustomButtonSize;
  text: string;
  width?: string;
  justifyContent?: 'center' | 'flex-start' | 'space-between';
  isLoading?: boolean;
  hasIcon?: boolean;
  borderRadius?: string;
}

export const SolidButton = ({
  buttonSize = 'md',
  text,
  width = '100%',
  justifyContent = 'center',
  isLoading = false,
  hasIcon = false,
  onClick,
  disabled,
  borderRadius = '16px',
  ...props
}: SolidButtonProps) => {
  const textSize = buttonSize === 'sm' ? 'text_SB_16' : 'text_SB_20';
  const iconGap = buttonSize === 'sm' ? '4px' : '8px';

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="contained"
      sx={{
        width: width,
        height: buttonSize === 'sm' ? '54px' : '64px',
        padding: '16px 24px',
        borderRadius: borderRadius,
        backgroundColor: colorChips.primary[300],
        color: colorChips.grayScale[50],
        justifyContent: justifyContent,
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: colorChips.primary[200],
        },
        '&:disabled': {
          backgroundColor: colorChips.grayScale[100],
          color: colorChips.grayScale[50],
        },
      }}
      {...props}
    >
      {isLoading ? (
        <CircularProgress size={15} sx={{ color: colorChips.grayScale[50] }} />
      ) : (
        <Stack direction="row" justifyContent="center" alignItems="center" gap={iconGap}>
          <Typo className={textSize} content={text} />
          {hasIcon && (
            <Image src={'./assets/images/writing-icon/writing-24x24-white.svg'} alt="writing" width={24} height={24} />
          )}
        </Stack>
      )}
    </Button>
  );
};
