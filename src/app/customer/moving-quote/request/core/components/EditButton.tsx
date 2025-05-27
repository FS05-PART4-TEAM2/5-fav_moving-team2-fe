import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';

interface EditButtonProps {
  onClick: () => void;
}

export const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <Stack width="fit-content" pr="10px" onClick={onClick} sx={{ cursor: 'pointer' }}>
      <Typo
        className="text_M_12to16"
        content="수정하기"
        color={colorChips.black[400]}
        customStyle={{ textDecoration: 'underline' }}
      />
    </Stack>
  );
};
