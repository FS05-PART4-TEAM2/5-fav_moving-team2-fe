import { Modal, Stack, SxProps, useMediaQuery } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import Image from 'next/image';

interface CommonModalProps {
  modalTitle: string;
  isOpen: boolean;
  handleClickClose: () => void;
  children: React.ReactNode;
}

export const CommonModal: React.FC<CommonModalProps> = ({ modalTitle, isOpen, handleClickClose, children }) => {
  const isDesktop = useMediaQuery('(min-width: 744px)');
  const closeIconSrc = isDesktop ? '/assets/images/x-icon/x-36x36.svg' : '/assets/images/x-icon/x-24x24.svg';
  const closeIconSize = isDesktop ? 36 : 24;

  return (
    <Modal
      open={isOpen}
      onClose={handleClickClose}
      aria-labelledby="common-modal"
      sx={{
        zIndex: 10000,
        marginX: '20px',
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
            <Typo className="modal_header" content={modalTitle} color={colorChips.black[400]} />
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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // TODO:여기 뷰보고 다시 잡기
  minWidth: '292px',
  maxWidth: '608px',
  height: 'auto',
  backgroundColor: colorChips.grayScale[50],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: { xs: '24px', md: '32px' },
  padding: { xs: '24px 16px', md: '32px 24px 40px' },
  boxSizing: 'border-box',
} as const;

const ModalWrapperSx: SxProps = {
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

const ModalHeaderWrapperSx: SxProps = {
  width: '100%',
  height: 'fit-content',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
} as const;
