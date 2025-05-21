import { SxProps, Theme } from '@mui/material';
import { PresetCardName } from './CardPresets';

interface StylePreset {
  paddingX: string;
  paddingY: string;
  gap: string;
  wrapperSx?: SxProps<Theme>;
}

export const CardStylePresets: Record<PresetCardName, StylePreset> = {
  profile: { paddingX: '16px', paddingY: '20px', gap: '14px' },
  waitRequest: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  search: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  pickMover: { paddingX: '16px', paddingY: '20px', gap: '12px' },
  quotation: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  request: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  confirmRequest: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  rejectRequest: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  finishRequest: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  writeReview: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  finishReview: { paddingX: '16px', paddingY: '20px', gap: '16px' },
  review: { paddingX: '20px', paddingY: '20px', gap: '18px' },
};
