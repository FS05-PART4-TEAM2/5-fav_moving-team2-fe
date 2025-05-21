import { Stack } from '@mui/material';
import Image from 'next/image';

interface HeaderAlarmProps {
  userMenuIconSize: number;
  onToggle: () => void;
}

// TODO: 드롭다운 추가
export const HeaderAlarm = ({ userMenuIconSize, onToggle }: HeaderAlarmProps) => {
  return (
    <Stack>
      <Image
        src={'/assets/images/alarm-icon/alarm-36x36.svg'}
        alt="close"
        width={userMenuIconSize}
        height={userMenuIconSize}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
        priority
      />
    </Stack>
  );
};
