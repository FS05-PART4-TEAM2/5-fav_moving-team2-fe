import { useNotificationSocket } from '@/shared/hooks/useNotificationSocket';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import { NotificationItem } from '@/shared/types/types';
import { Collapse, Stack, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNotificationsQuery } from '@/shared/hooks/useNotificationsQuery';
import { formatNotiTime } from '@/shared/utils/dataFormatter';
import { patchNotificationsReadApi } from '@/shared/service/patchNotificationsReadApi';

interface HeaderAlarmProps {
  isDesktop: boolean;
  userMenuIconSize: number;
  openDropdown: boolean;
  onToggle: () => void;
}

export const HeaderAlarm = ({ isDesktop, userMenuIconSize, openDropdown, onToggle }: HeaderAlarmProps) => {
  const accessToken = localStorage.getItem('accessToken');
  const [realTimeNotifications, setRealTimeNotifications] = useState<NotificationItem[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px',
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNotificationsQuery();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 소켓 수신
  useNotificationSocket(accessToken ?? null, (newNoti) => {
    if (!accessToken) return;
    setRealTimeNotifications((prev) => [newNoti, ...prev]);
  });

  const handleClickAlarmCard = async (id: string) => {
    try {
      const result = await patchNotificationsReadApi(id);
      if (result) {
        console.log('각 타입과 id에 맞는 페이지로 이동');
      } else {
        alert('다시 시도해주세요');
      }
    } catch (error) {
      alert('다시 시도해주세요');
    }
  };

  const allNotifications = [...realTimeNotifications, ...(data?.pages?.flatMap((page) => page.data.data) || [])];

  return (
    <Stack position="relative">
      <Image
        src={'/assets/images/alarm-icon/alarm-36x36.svg'}
        alt="notifications"
        width={userMenuIconSize}
        height={userMenuIconSize}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
        priority
      />

      <Collapse in={openDropdown} sx={CollapseSx}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={isDesktop ? '14px 12px 14px 24px' : '14px 12px 14px 16px'}
        >
          <Typo className={isDesktop ? 'text_B_18' : 'text_B_16'} content={'알림'} color={colorChips.black[400]} />
          <Image
            src={'/assets/images/x-icon/x-24x24.svg'}
            alt="close"
            width={24}
            height={24}
            onClick={onToggle}
            style={{ cursor: 'pointer' }}
            priority
          />
        </Stack>

        {/* 알림 리스트 - 고정 높이와 스크롤 적용 */}
        <Stack
          direction="column"
          sx={{
            height: { xs: '254px', md: '280px' }, // 전체 높이에서 헤더 높이 뺀 값
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: colorChips.grayScale[100],
            },
            '&::-webkit-scrollbar-thumb': {
              background: colorChips.grayScale[300],
              borderRadius: '4px',
            },
          }}
        >
          {isLoading ? (
            <Stack flex={1} alignItems="center" justifyContent="center" padding="16px">
              <CircularProgress size={24} />
            </Stack>
          ) : allNotifications.length === 0 ? (
            <Stack flex={1} alignItems="center" justifyContent="center" padding="16px">
              <Typo className="text_M_14" content="알림이 없습니다." color={colorChips.grayScale[500]} />
            </Stack>
          ) : (
            <>
              {allNotifications.map((item, idx) => (
                <div key={item.id || idx} ref={idx === allNotifications.length - 1 ? ref : undefined} onClick={() => handleClickAlarmCard(item.id)}>
                  <AlarmCard
                    isDesktop={isDesktop}
                    content={item.segments}
                    createdAt={item.createdAt}
                    isLast={idx === allNotifications.length - 1}
                    isRead={item.isRead}
                  />
                </div>
              ))}
              {isFetchingNextPage && (
                <Stack alignItems="center" padding="16px">
                  <CircularProgress size={24} />
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface AlarmCardProps {
  isDesktop: boolean;
  content: {
    text: string;
    isHighlight: boolean;
  }[];
  createdAt: string;
  isLast: boolean;
  isRead: boolean;
}

// TODO: 클릭 이벤트 추가
const AlarmCard = ({ isDesktop, content, createdAt, isLast, isRead }: AlarmCardProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      padding={isDesktop ? '16px 24px' : '12px 16px'}
      gap="2px"
      sx={{
        cursor: 'pointer',
        borderBottom: isLast ? 'none' : `1px solid ${colorChips.line.e6e6e6}`,
      }}
    >
      <Stack direction="row" alignItems="center" gap="4px" flexWrap="wrap">
        {content.map((item, idx) => (
          <Typo className={isDesktop ? 'text_M_16' : 'text_M_14'} content={item.text} color={isRead? colorChips.black[200] : item.isHighlight ? colorChips.primary[300] : colorChips.black[400]} key={idx} customStyle={{ wordBreak: 'keep-all' }} />
        ))}
      </Stack>
      <Typo className={isDesktop ? 'text_M_14' : 'text_M_13'} content={formatNotiTime(createdAt)} color={colorChips.grayScale[500]} />
    </Stack>
  );
};

const CollapseSx = {
  position: 'absolute',
  width: { xs: '312px', md: '360px' },
  height: { xs: '314px', md: '352px' }, // 고정 높이
  top: { xs: '30px', md: '50px' },
  right: { xs: '-96px', md: '-10px' },
  zIndex: 1000,
  borderRadius: '24px',
  bgcolor: colorChips.grayScale[50],
  border: `1px solid ${colorChips.line.e6e6e6}`,
  boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
  padding: '10px 16px',
};
