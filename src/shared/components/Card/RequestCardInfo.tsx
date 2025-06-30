'use client';

import { Stack, useMediaQuery, Divider } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { SolidButton } from '../Button/SolidButton';
import { OutlinedButton } from '../Button/OutlinedButton';
import { PresetCardName, UserCardData } from './CardPresets';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import dayjs from 'dayjs';

interface Props {
  type: PresetCardName;
  data: UserCardData;
  onClickRequest?: (id: string) => void;
  onClickReject?: (id: string) => void;
  isModal?: boolean;
}

export default function RequestConfirmCardInfo({ type, data, onClickRequest, onClickReject, isModal }: Props) {
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const showButtons = type === 'request';
  const isConfirmRequest = type === 'confirmRequest' || type === 'rejectRequest';
  const isAssigned = !!data.isAssigned;
  const formatted = (date: string): string => {
    return dayjs(date).format('YYYY.MM.DD(dd)');
  };

  const InfoGroup = () => {
    if (isModal) {
      return (
        <>
          <Stack direction="column" gap="20px" sx={{ textWrap: 'nowrap' }}>
            <Typo className={isMdDown ? 'text_SB_16' : 'text_SB_20'}>{`${data.name} 고객님`}</Typo>
            <Stack direction="row" gap="6px" alignItems="center">
              <Typo
                className="text_R_16"
                style={{
                  backgroundColor: colorChips.background['f4f7fb'],
                  padding: '2px 6px',
                  borderRadius: '4px',
                  color: colorChips.grayScale[500],
                }}
              >
                이사일
              </Typo>
              <Typo
                className="text_M_16"
                style={{
                  color: colorChips.black[300],

                  paddingRight: '14px',
                }}
              >
                {formatted(data.moveDay ?? '')}
              </Typo>
            </Stack>
            <Stack direction="row" gap="16px" alignItems="center">
              <Stack direction="row" gap="6px" alignItems="center">
                <Typo
                  className="text_R_16"
                  style={{
                    backgroundColor: colorChips.background['f4f7fb'],
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: colorChips.grayScale[500],
                  }}
                >
                  출발
                </Typo>
                <Typo
                  className="text_M_16"
                  style={{
                    color: colorChips.black[300],
                    borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                    paddingRight: '14px',
                  }}
                >
                  {data.startPoint}
                </Typo>
              </Stack>
              <Stack direction="row" gap="6px" alignItems="center">
                <Typo
                  className="text_R_16"
                  style={{
                    backgroundColor: colorChips.background['f4f7fb'],
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: colorChips.grayScale[500],
                  }}
                >
                  도착
                </Typo>
                <Typo className="text_M_16" style={{ color: colorChips.black[300] }}>
                  {data.endPoint}
                </Typo>
              </Stack>
            </Stack>
          </Stack>
        </>
      );
    }

    if (isSm) {
      return (
        <>
          <Divider />
          <Stack direction="row" gap="6px" sx={{ textWrap: 'nowrap' }}>
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              출발
            </Typo>
            <Typo
              className="text_M_14"
              style={{
                color: colorChips.black[300],
                borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                paddingRight: '14px',
              }}
            >
              {data.startPoint}
            </Typo>
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',

                marginLeft: '14px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              도착
            </Typo>
            <Typo className="text_M_14" style={{ color: colorChips.black[300] }}>
              {data.endPoint}
            </Typo>
          </Stack>
        </>
      );
    }

    if (isMd || isConfirmRequest) {
      return (
        <>
          <Divider />
          <Stack direction="row" gap="20px" sx={{ textWrap: 'nowrap' }}>
            <Stack direction="row" gap="6px" alignItems="center">
              <Typo
                className="text_R_18"
                style={{
                  backgroundColor: colorChips.background['f4f7fb'],
                  padding: '4px 6px',
                  borderRadius: '4px',
                  color: colorChips.grayScale[500],
                }}
              >
                이사일
              </Typo>
              <Typo
                className="text_M_18"
                style={{
                  color: colorChips.black[300],
                  borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                  paddingRight: '16px',
                }}
              >
                {formatted(data.moveDay ?? '')}
              </Typo>
            </Stack>
            <Stack direction="row" gap="6px" alignItems="center">
              <Typo
                className="text_R_18"
                style={{
                  backgroundColor: colorChips.background['f4f7fb'],
                  padding: '4px 6px',
                  borderRadius: '4px',
                  color: colorChips.grayScale[500],
                }}
              >
                출발
              </Typo>
              <Typo
                className="text_M_18"
                style={{
                  color: colorChips.black[300],
                  borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                  paddingRight: '16px',
                }}
              >
                {data.startPoint}
              </Typo>
            </Stack>
            <Stack direction="row" gap="6px" alignItems="center">
              <Typo
                className="text_R_18"
                style={{
                  backgroundColor: colorChips.background['f4f7fb'],
                  padding: '4px 6px',
                  borderRadius: '4px',
                  color: colorChips.grayScale[500],
                }}
              >
                도착
              </Typo>
              <Typo className="text_M_18" style={{ color: colorChips.black[300] }}>
                {data.endPoint}
              </Typo>
            </Stack>
          </Stack>
        </>
      );
    }

    return (
      <>
        <Divider />
        <Stack direction="row" gap="20px" sx={{ textWrap: 'nowrap' }}>
          <Stack direction="row" gap="6px" alignItems="center">
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              출발
            </Typo>
            <Typo
              className="text_M_14"
              style={{
                color: colorChips.black[300],
                borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                paddingRight: '14px',
              }}
            >
              {data.startPoint}
            </Typo>
          </Stack>
          <Stack direction="row" gap="6px" alignItems="center">
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              도착
            </Typo>
            <Typo
              className="text_M_14"
              style={{
                color: colorChips.black[300],
                borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                paddingRight: '14px',
              }}
            >
              {data.endPoint}
            </Typo>
          </Stack>
          <Stack direction="row" gap="6px" alignItems="center">
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              이사일
            </Typo>
            <Typo className="text_M_14" style={{ color: colorChips.black[300] }}>
              {formatted(data.moveDay ?? '')}
            </Typo>
          </Stack>
        </Stack>
      </>
    );
  };

  return (
    <Stack
      gap={isSm ? '20px' : '16px'}
      border={isModal ? `1px solid ${colorChips.line['f2f2f2']}` : ''}
      padding={isModal ? '0 18px 24px' : ''}
      borderRadius={isMdDown ? '16px' : '24px'}
    >
      <Stack direction={isSm ? 'column' : 'row'} justifyContent="space-between" alignItems="flex-start">
        {!isModal && <Typo className={isSm ? 'text_SB_16' : 'text_SB_20'}>{`${data.name} 고객님`}</Typo>}

        {isSm && !isModal && (
          <Stack direction="row" alignItems="center" sx={{ textWrap: 'nowrap' }} gap="8px" paddingTop="16px">
            <Typo
              className="text_M_14"
              style={{
                backgroundColor: colorChips.background['f4f7fb'],
                padding: '2px 6px',
                borderRadius: '4px',
                color: colorChips.grayScale[500],
              }}
            >
              이사일
            </Typo>
            <Typo className="text_M_14" style={{ color: colorChips.black[300] }}>
              {formatted(data.moveDay ?? '')}
            </Typo>
          </Stack>
        )}
      </Stack>
      <InfoGroup />
      {isModal ? (
        ''
      ) : showButtons ? (
        <Stack direction={isSm ? 'column' : 'row'} gap={isMdDown ? '8px' : '11px'}>
          <SolidButton
            text="견적 보내기"
            width="100%"
            hasIcon
            onClick={() => {
              if (!data.id) {
                console.warn('id를 알 수 없습니다.');
                return;
              }
              onClickRequest?.(data.id);
            }}
          />

          <OutlinedButton
            text="반려"
            width="100%"
            buttonType={isAssigned ? 'default' : 'done'}
            disabled={isAssigned ? false : true}
            onClick={() => {
              if (!data.id) {
                console.warn('id를 알 수 없습니다.');
                return;
              }
              onClickReject?.(data.id);
            }}
          />
        </Stack>
      ) : isConfirmRequest ? (
        ''
      ) : (
        <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={isMdDown ? '8px' : '16px'}>
          <Typo className={isMdDown ? 'text_M_14' : 'text_M_18'} style={{ color: colorChips.black[400] }}>
            견적 금액
          </Typo>
          <Typo className={isMdDown ? 'text_B_18' : 'text_B_24'} style={{ color: colorChips.black[400] }}>
            {data.price?.toLocaleString()}원
          </Typo>
        </Stack>
      )}
    </Stack>
  );
}
