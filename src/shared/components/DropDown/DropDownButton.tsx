import Image from 'next/image';
import { useTheme, useMediaQuery, Button } from '@mui/material';
import { dropdownButtonPresets } from './DropDownButtonPresete';

interface DropDownButtonProps {
  category: 'region' | 'service' | 'sort' | 'profile' | 'alarm';
  label: string;
  selected?: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export default function DropDownButton({ category, label, selected = false, isOpen, onClick }: DropDownButtonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const preset = dropdownButtonPresets[category][selected ? 'selected' : 'default'];
  const padding = isMobile ? preset.padding.sm : preset.padding.md;
  const className = isMobile ? preset.mobileClassName : preset.className;

  const iconSrc = isOpen
    ? '/assets/images/direction-icon/up-20x20.svg'
    : '/assets/images/direction-icon/down-20x20.svg';

  //나중에 데이터에 이미가 있으면 그것으로 변경
  const profileIcon = '/assets/images/profile-icon/login-default-24x24.svg';
  const alarmIcon = '/assets/images/alarm-icon/alarm-24x24.svg';

  const isOnlyIcon = category === 'profile' || category === 'alarm';

  return (
    <Button
      onClick={onClick}
      sx={{
        ...(isOnlyIcon
          ? {
              padding: 0,
              minWidth: 0,
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }
          : {
              backgroundColor: preset.bgColor,
              color: preset.color,
              padding,
              borderRadius: preset.radius,
              border: `1px solid ${preset.borderColor}`,
              boxShadow: preset.shadow,
              gap: '6px',
            }),
      }}
    >
      {isOnlyIcon ? (
        <Image
          src={category === 'profile' ? profileIcon : alarmIcon}
          alt={`${category} 아이콘`}
          width={20}
          height={20}
        />
      ) : (
        <>
          <span className={className}>{label}</span>
          <Image src={iconSrc} alt="드롭다운 아이콘" width={20} height={20} />
        </>
      )}
    </Button>
  );
}
