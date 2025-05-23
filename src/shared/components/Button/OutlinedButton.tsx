import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Button, ButtonProps, CircularProgress, Stack } from '@mui/material';
import Image from 'next/image';
import { CustomButtonSize } from './SolidButton';

export type OutlinedButtonType = 'default' | 'done';

interface OutlinedButtonProps extends ButtonProps {
  buttonType?: OutlinedButtonType;
  buttonSize?: CustomButtonSize;
  text: string;
  width?: string;
  justifyContent?: 'center' | 'flex-start' | 'space-between';
  isLoading?: boolean;
  hasIcon?: boolean;
  borderRadius?: string;
}

export const OutlinedButton = ({
  buttonType = 'default',
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
}: OutlinedButtonProps) => {
  const textSize = buttonSize === 'sm' ? 'text_SB_16' : 'text_SB_20';
  const disabledColor = colorChips.grayScale[100];
  const disabledTextColor = colorChips.grayScale[300];
  const iconGap = buttonSize === 'sm' ? '4px' : '8px';

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="outlined"
      sx={{
        width: width,
        height: buttonSize === 'sm' ? '54px' : '64px',
        padding: '16px 24px',
        borderRadius: borderRadius,
        border: buttonType === 'default' ? `1px solid ${colorChips.primary[300]}` : `1px solid ${disabledColor}`,
        backgroundColor: 'transparent',
        color: buttonType === 'default' ? colorChips.primary[300] : disabledTextColor,
        justifyContent: justifyContent,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: buttonType === 'default' ? colorChips.primary[50] : 'transparent',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
          color: disabledTextColor,
          border: `1px solid ${disabledColor}`,
        },
      }}
      {...props}
    >
      {isLoading ? (
        <CircularProgress size={15} sx={{ color: colorChips.grayScale[300] }} />
      ) : (
        <Stack direction="row" justifyContent="center" alignItems="center" gap={iconGap}>
          <Typo className={textSize} content={text} />
          {hasIcon && (
            <Image src={'./assets/images/writing-icon/writing-24x24-gray.svg'} alt="writing" width={24} height={24} />
          )}
        </Stack>
      )}
    </Button>
  );
};
