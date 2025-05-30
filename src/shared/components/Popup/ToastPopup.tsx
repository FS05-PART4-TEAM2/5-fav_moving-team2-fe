import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { Stack, useTheme } from '@mui/material';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

interface ToastPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const ToastPopup = ({ isOpen, onClose, message }: ToastPopupProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const toastIcon = isDesktop
    ? '/assets/images/info-icon/info-24x24-blue.svg'
    : '/assets/images/info-icon/info-16x16-blue.svg';
  const toastIconSize = isDesktop ? 24 : 16;
  const toastMsgSize = isDesktop ? 'text_SB_16' : 'text_SB_13';
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // 애니메이션 완료 후 onClose 호출
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !show) return null;

  return (
    <Stack
      sx={{
        ...toastSx,
        opacity: show ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        position: 'relative',
        marginTop: '16px',
      }}
    >
      <Image src={toastIcon} alt="caution" width={toastIconSize} height={toastIconSize} />
      <Typo className={toastMsgSize} content={message} color={colorChips.primary[300]} />
    </Stack>
  );
};

const toastSx = {
  width: '100%',
  backgroundColor: colorChips.primary[100],
  border: `1px solid ${colorChips.primary[200]}`,
  borderRadius: '12px',
  gap: { xs: '8px', md: '16px' },
  padding: { xs: '10px 24px', md: '24px 32px' },
  flexDirection: 'row',
  alignItems: 'center',
};
