import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { typographyStyles } from '@/shared/styles/Typo/TypoStyles';
import { useTheme, useMediaQuery, Chip as MuiChip, Stack } from '@mui/material';
import Image from 'next/image';

export const Category = {
  small: {
    type: '소형이사',
    src: './assets/images/chip-icon/box-20x20.svg',
    alt: '소형 이사 아이콘',
    color: colorChips.primary[300],
    bgColor: colorChips.primary[100],
    className: 'text_SB_16',
    mobileClassName: 'text_SB_13',
    radius: '4px',
  },
  home: {
    type: '가정이사',
    src: './assets/images/chip-icon/home-20x20.svg',
    alt: '가정 이사 아이콘',
    color: colorChips.primary[300],
    bgColor: colorChips.primary[100],
    className: 'text_SB_16',
    mobileClassName: 'text_SB_13',
    radius: '4px',
  },
  office: {
    type: '사무실이사',
    src: './assets/images/chip-icon/office-20x20.svg',
    alt: '사무실 이사 아이콘',
    color: colorChips.primary[300],
    bgColor: colorChips.primary[100],
    className: 'text_SB_16',
    mobileClassName: 'text_SB_13',
    radius: '4px',
  },
  select: {
    type: '소형이사',
    src: './assets/images/chip-icon/file-20x20-red.svg',
    alt: '지정 견적 아이콘',
    color: colorChips.secondary.red[200],
    bgColor: colorChips.secondary.red[100],
    className: 'text_SB_16',
    mobileClassName: 'text_SB_13',
    radius: '4px',
  },
  wait: {
    type: '견적 대기',
    radius: '4px',
    color: colorChips.primary[400],
    bgColor: colorChips.line['f2f3f8'],
    className: 'text_SB_16',
    mobileClassName: 'text_SB_13',
  },
  moveType: {
    type: '지역',
    radius: '16px',
    color: colorChips.primary[300],
    bgColor: colorChips.primary[100],
    borderColor: colorChips.primary[300],
    className: 'text_M_18',
    mobileClassName: 'text_M_14',
  },
  region: {
    type: '지역',
    radius: '16px',
    color: colorChips.primary[400],
    bgColor: colorChips.background['fafafa'],
    borderColor: colorChips.grayScale[100],
    className: 'text_M_18',
    mobileClassName: 'text_M_14',
  },
  address: {
    type: '도로명',
    radius: '16px',
    color: colorChips.primary[300],
    bgColor: colorChips.primary[50],
    className: 'text_SB_14',
    mobileClassName: 'text_SB_12',
  },
} as const;

export type CategoryKey = keyof typeof Category;

interface ChipProps {
  type: CategoryKey;
  children?: React.ReactNode;
  sx?: object;
}

export default function Chip({ type, children, sx }: ChipProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const item = Category[type];
  const label = children ?? item.type;
  const hasIcon = 'src' in item;
  const typoClass = isMobile && 'mobileClassName' in item ? item.mobileClassName : item.className;

  return (
    <MuiChip
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          {hasIcon && <Image src={item.src} alt={item.alt ?? ''} width={20} height={20} />}
          {hasIcon && isMobile ? null : typeof label === 'string' ? (
            <Typo className={typoClass} content={label} />
          ) : (
            label
          )}
        </Stack>
      }
      sx={{
        height: '32px',
        borderRadius: item.radius,
        backgroundColor: item.bgColor,
        padding: '0 12px',
        border: 'borderColor' in item ? `1px solid ${item.borderColor}` : 'none',
        color: item.color,
        ...sx,
      }}
    />
  );
}
