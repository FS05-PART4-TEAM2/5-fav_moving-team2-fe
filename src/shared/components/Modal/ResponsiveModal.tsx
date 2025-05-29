import { Modal, Stack, SxProps, useMediaQuery, useTheme } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import Image from 'next/image';

interface ResponsiveModalProps {
  modalTitle: string;
  isOpen: boolean;
  handleClickClose: () => void;
  children: React.ReactNode;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({ modalTitle, isOpen, handleClickClose, children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const closeIconSrc = isDesktop ? '/assets/images/x-icon/x-36x36.svg' : '/assets/images/x-icon/x-24x24.svg';
  const closeIconSize = isDesktop ? 36 : 24;

  return (
    <Modal
      open={isOpen}
      onClose={handleClickClose}
      aria-labelledby="common-modal"
      sx={{
        zIndex: 10000000,
        marginX: { xs: '0px', sm: '20px' },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        '& :focus': {
          outline: 'none',
        },
      }}
    >
      <Stack sx={CommonModalSx}>
        <Stack sx={ModalWrapperSx}>
          <Stack sx={ModalHeaderWrapperSx}>
            <Typo className="header_title" content={modalTitle} color={colorChips.black[400]} />
            <Image
              src={closeIconSrc}
              alt="close"
              width={closeIconSize}
              height={closeIconSize}
              onClick={handleClickClose}
              style={{ cursor: 'pointer' }}
            />
          </Stack>

          {children}
        </Stack>
      </Stack>
    </Modal>
  );
};

const CommonModalSx: SxProps = {
  position: 'absolute',
  top: { xs: 'auto', sm: '50%' },
  bottom: { xs: 0, sm: 'auto' },
  left: '50%',
  transform: { xs: 'translateX(-50%)', sm: 'translate(-50%, -50%)' },
  width: { xs: '100%', sm: '80%' },
  minWidth: { xs: '100%', sm: '292px' },
  maxWidth: { xs: '100%', sm: '608px' },
  height: { xs: '90%', sm: 'auto' },
  backgroundColor: colorChips.grayScale[50],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: { xs: '32px 32px 0px 0px', sm: '32px' },
  padding: '32px 24px 40px',
  boxSizing: 'border-box',
} as const;

const ModalWrapperSx: SxProps = {
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
} as const;

const ModalHeaderWrapperSx: SxProps = {
  width: '100%',
  height: 'fit-content',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
} as const;
