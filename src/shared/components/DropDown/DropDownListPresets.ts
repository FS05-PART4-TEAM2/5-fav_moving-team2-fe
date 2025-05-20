import { colorChips } from '@/shared/styles/colorChips';
import { TypoClassName } from '@/shared/styles/Typo/Typo';

export type CategoryType = 'region' | 'service' | 'alarm' | 'sort' | 'profile';

interface DropdownPreset {
  desktop: {
    width: number;
    height?: number;
    padding?: string;
    borderRadius: string;
    typo: TypoClassName;
    boxShadow?: string;
  };
  mobile: {
    width: number;
    height?: number;
    padding?: string;
    borderRadius: string;
    typo: TypoClassName;
    boxShadow?: string;
  };
  align: 'left' | 'center';
  borderColor?: string;
}

export const dropdownPresets: Record<string, DropdownPreset> = {
  region: {
    desktop: {
      width: 328,
      height: 320,
      padding: '19px 24px',
      typo: 'text_M_18',
      borderRadius: '16px',
      boxShadow: '4px 4px 10px rgba(224, 224, 224, 0.25)',
    },
    mobile: {
      width: 150,
      height: 180,
      padding: '6px 14px',
      typo: 'text_M_18',
      borderRadius: '8px',
      boxShadow: '4px 4px 10px rgba(191, 191, 191, 0.2)',
    },
    align: 'left',
    borderColor: colorChips.line['e6e6e6'],
  },
  service: {
    desktop: {
      width: 328,
      height: 256,
      padding: '19px 24px',
      typo: 'text_M_18',
      borderRadius: '16px',
      boxShadow: '4px 4px 10px rgba(224, 224, 224, 0.25)',
    },
    mobile: {
      width: 89,
      height: 144,
      padding: '6px 14px',
      typo: 'text_M_14',
      borderRadius: '8px',
      boxShadow: '4px 4px 10px rgba(230, 230, 230, 1)',
    },
    align: 'left',
    borderColor: colorChips.line['e6e6e6'],
  },
  alarm: {
    desktop: {
      width: 359,
      height: 352,
      padding: '10px 16px',
      typo: 'text_M_16',
      borderRadius: '24px',
      boxShadow: '2px 2px 16px rgba(0, 0, 0, 0.06)',
    },
    mobile: {
      width: 312,
      height: 314,
      padding: '10px 16px',
      typo: 'text_M_14',
      borderRadius: '24px',
      boxShadow: '2px 2px 16px rgba(0, 0, 0, 0.06)',
    },
    align: 'left',
    borderColor: colorChips.line['e6e6e6'],
  },
  sort: {
    desktop: {
      width: 114,
      height: 160,
      padding: '8px 10px',
      typo: 'text_M_14',
      borderRadius: '8px',
    },
    mobile: {
      width: 91,
      height: 128,
      padding: '8px 7px',
      typo: 'text_M_12',
      borderRadius: '8px',
    },
    align: 'left',
    borderColor: colorChips.line['f2f2f2'],
  },
  profile: {
    desktop: {
      width: 248,
      padding: '14px 24px',
      typo: 'text_M_16',
      borderRadius: '16px',
      boxShadow: '2px 2px 8px rgba(224, 224, 224, 0.2)',
    },
    mobile: {
      width: 152,

      padding: '8px 12px',
      typo: 'text_M_14',
      borderRadius: '16px',
      boxShadow: '2px 2px 8px rgba(224, 224, 224, 0.2)',
    },
    align: 'left',
    borderColor: colorChips.line['e6e6e6'],
  },
};
