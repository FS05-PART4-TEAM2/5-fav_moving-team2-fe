import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
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
    shadow: '4px 4px 8px rgba(217, 217, 217, 0.1)',
    padding: {
      xs: '2px',
      sm: '2px 6px',
      md: '3px 5px',
    },
    height: {
      xs: '24px',
      sm: '26px',
      md: '34px',
    },
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
    shadow: '4px 4px 8px rgba(217, 217, 217, 0.1)',
    padding: {
      xs: '2px 2px',
      sm: '2px 6px',
      md: '3px 5px',
    },
    height: {
      xs: '24px',
      sm: '26px',
      md: '34px',
    },
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
    shadow: '4px 4px 8px rgba(217, 217, 217, 0.1)',
    padding: {
      xs: '2px 2px',
      sm: '2px 6px',
      md: '3px 5px',
    },
    height: {
      xs: '24px',
      sm: '26px',
      md: '34px',
    },
  },
  select: {
    type: '지정 견적 요청',
    src: './assets/images/chip-icon/file-20x20-red.svg',
    alt: '지정 견적 아이콘',
    color: colorChips.secondary.red[200],
    bgColor: colorChips.secondary.red[100],
    className: 'text_SB_16',
    mobileClassName: 'text_SB_13',
    radius: '4px',
    shadow: '4px 4px 8px rgba(217, 217, 217, 0.1)',
    padding: {
      xs: '2px 2px',
      sm: '2px 6px',
      md: '3px 5px',
    },
    height: {
      xs: '24px',
      sm: '26px',
      md: '34px',
    },
  },
  wait: {
    type: '견적 대기',
    radius: '4px',
    color: colorChips.primary[400],
    bgColor: colorChips.line['f2f3f8'],
    className: 'text_SB_16',
    mobileClassName: 'text_SB_13',
    shadow: '4px 4px 8px rgba(217, 217, 217, 0.1)',
    padding: {
      xs: '2px 2px',
      sm: '2px 6px',
      md: '4px 6px',
    },
    height: {
      xs: '24px',
      sm: '26px',
      md: '34px',
    },
  },
  moveType: {
    type: '지역',
    radius: '100px',
    color: colorChips.primary[300],
    bgColor: colorChips.primary[100],
    borderColor: colorChips.primary[300],
    className: 'text_M_18',
    mobileClassName: 'text_M_14',
    shadow: '4px 4px 10px rgba(230, 230, 230, 0.25)',
    padding: {
      sm: '6px 12px',
      md: '10px 20px',
    },
    height: {
      sm: '36px',
      md: '46px',
    },
  },
  region: {
    type: '지역',
    radius: '100px',
    color: colorChips.primary[400],
    bgColor: colorChips.background['fafafa'],
    borderColor: colorChips.grayScale[100],
    className: 'text_M_18',
    mobileClassName: 'text_M_14',
    shadow: '4px 4px 10px rgba(230, 230, 230, 0.25)',
    padding: {
      sm: '6px 12px',
      md: '10px 20px',
    },
    height: {
      sm: '36px',
      md: '46px',
    },
  },
  address: {
    type: '도로명',
    radius: '16px',
    color: colorChips.primary[300],
    bgColor: colorChips.primary[50],
    className: 'text_SB_14',
    mobileClassName: 'text_SB_12',
    padding: {
      sm: '2px 6px',
      md: '2px 8.5px',
    },
    height: {
      sm: '24px',
      md: '28px',
    },
  },
} as const;

export type CategoryKey = keyof typeof Category;

interface ChipProps {
  type: CategoryKey;
  children?: React.ReactNode;
  sx?: object;
  onClick?: () => void;
}

export default function Chip({ type, children, sx, onClick, ...props }: ChipProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const item = Category[type];
  const label = children ?? item.type;
  const hasIcon = 'src' in item;
  const border = 'borderColor' in item ? `1px solid ${item.borderColor}` : 'none';
  const boxShadow = 'shadow' in item ? item.shadow : 'none';
  const typoClass = isMobile && 'mobileClassName' in item ? item.mobileClassName : item.className;

  return (
    <MuiChip
      clickable
      onClick={onClick}
      {...props}
      label={
        <Stack direction="row" alignItems="center">
          {hasIcon && (
            <Image src={item.src} alt={item.alt ?? ''} width={isTablet ? 20 : 24} height={isTablet ? 20 : 24} />
          )}
          {hasIcon && isMobile ? null : typeof label === 'string' ? (
            <Typo className={typoClass} content={label} />
          ) : (
            label
          )}
        </Stack>
      }
      sx={{
        height: item.height,
        borderRadius: item.radius,
        backgroundColor: item.bgColor,
        border: border,
        color: item.color,
        boxShadow: boxShadow,
        padding: 0,
        '& .MuiChip-label': {
          padding: item.padding,
        },
        ...sx,
      }}
    />
  );
}
