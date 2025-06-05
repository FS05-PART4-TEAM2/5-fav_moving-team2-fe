import { Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { PresetCardName, UserCardData } from './CardPresets';
import theme from '@/shared/theme';
import RequestConfirmCardInfo from './RequestCardInfo';
import { SolidButton } from '../Button/SolidButton';
import { OutlinedButton } from '../Button/OutlinedButton';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import dayjs from 'dayjs';
import ReviewSection from './ReviewSection';

interface CommonCardInfoProps {
  type: PresetCardName;
  data: UserCardData;
  onRequestClick?: (id: string) => void;
  onRejectClick?: (id: string) => void;
  isModal?: boolean;
}

export default function CommonCardInfo({ type, data, onRequestClick, onRejectClick, isModal }: CommonCardInfoProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const isProfile = type === 'profile';
  const isQuotation = type === 'quotation';
  const isWaitRequest = type === 'waitRequest';
  const isWriteReview = type === 'writeReview';
  const isFinishReview = type === 'finishReview';
  const isConfirmRequest = type === 'confirmRequest';
  const ExcludeLike = !isProfile && !isWriteReview && !isFinishReview;
  const isRequestConfirm =
    type === 'request' ||
    type === 'confirmRequest' ||
    type === 'rejectRequest' ||
    type === 'finishRequest' ||
    type === 'refuse';

  const formatted = (date: string): string => {
    if (isWriteReview) dayjs(date).format('YYYY.MM.DD');
    return dayjs(date).format('YYYY.MM.DD(dd)');
  };

  if (isRequestConfirm) {
    return (
      <RequestConfirmCardInfo
        type={type}
        data={data}
        onClickRequest={onRequestClick}
        onClickReject={onRejectClick}
        isModal={isModal}
      />
    );
  }

  if (type === 'review') {
    return <ReviewSection data={data} />;
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          backgroundColor: 'white',
          border: `1px solid ${colorChips.line['f2f2f2']}`,
          borderRadius: '6px',
          px: { xs: '14px', md: '16px' },
          py: { xs: '16px', md: '20px' },
        }}
      >
        <Stack direction="row" width="100%" sx={{ gap: { xs: '12px', lg: '24px' } }}>
          {!isProfile || !isMdDown ? (
            <Stack
              sx={{
                width: {
                  xs: 46,
                  lg: 56,
                },
                height: {
                  xs: 46,
                  lg: 56,
                },
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid black`,
                position: 'relative',
              }}
            >
              <Image
                src={data.userProfileImage || '/assets/images/profile-icon/login-default-36x36.svg'}
                alt="user profile Image"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Stack>
          ) : null}
          <Stack direction="column">
            {!isProfile && (
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typo className={isMdDown ? 'text_SB_14' : 'text_SB_18'}>{data.name} 기사님</Typo>
              </Stack>
            )}

            {!isWriteReview && !isFinishReview ? (
              <>
                <Stack direction="row">
                  <Stack direction="row" gap="4px">
                    <Stack
                      position="relative"
                      sx={{
                        width: {
                          xs: '20px',
                          md: '24px',
                        },
                      }}
                    >
                      <Image
                        src="/assets/images/start-icon/star-yellow-24x24.svg"
                        alt="like icon"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </Stack>
                    <Typo className={isMdDown ? 'text_M_13' : 'text_M_16'} style={{ color: colorChips.black[300] }}>
                      {data.review?.averageScore?.toFixed(1) ?? '0.0'}
                    </Typo>
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_M_16'}
                      style={{
                        color: colorChips.grayScale[300],
                        borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                        paddingRight: isMdDown ? '8px' : '16px',
                      }}
                    >
                      {`(${data.review?.reviewer})`}
                    </Typo>
                  </Stack>
                  <Stack direction="row" gap="6px" sx={{ textWrap: 'nowrap' }}>
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_M_16'}
                      style={{ color: colorChips.grayScale[300], paddingLeft: isMdDown ? '8px' : '16px' }}
                    >
                      경력
                    </Typo>
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_M_16'}
                      style={{
                        color: colorChips.black[300],
                        borderRight: `1px solid ${colorChips.line['e6e6e6']}`,
                        paddingRight: isMdDown ? '8px' : '16px',
                      }}
                    >
                      {data.career}년
                    </Typo>
                  </Stack>
                  <Stack direction="row" gap="6px" sx={{ textWrap: 'nowrap' }}>
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_M_16'}
                      style={{ color: colorChips.black[300], paddingLeft: isMdDown ? '8px' : '16px' }}
                    >
                      {data.confirmation}건
                    </Typo>
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_M_16'}
                      style={{
                        color: colorChips.grayScale[300],
                      }}
                    >
                      확정
                    </Typo>
                  </Stack>
                </Stack>
              </>
            ) : (
              <>
                <Stack direction="row" gap="20px" sx={{ textWrap: 'nowrap', pt: isMdDown ? '6px' : '16px' }}>
                  <Stack
                    direction="row"
                    gap="6px"
                    alignItems="center"
                    sx={{
                      borderRight: isMobile ? '' : `1px solid ${colorChips.line['e6e6e6']}`,
                      pr: isMobile ? '' : '16px',
                    }}
                  >
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_R_20'}
                      style={{
                        color: colorChips.grayScale[500],
                      }}
                    >
                      이사일
                    </Typo>
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_M_20'}
                      style={{
                        color: colorChips.black[300],
                      }}
                    >
                      {formatted(data.moveDay ?? '')}
                    </Typo>
                  </Stack>
                  <Stack direction="row" gap="6px" alignItems="center">
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_R_20'}
                      style={{
                        color: colorChips.grayScale[500],
                      }}
                    >
                      견적가
                    </Typo>
                    <Typo
                      className={isMdDown ? 'text_M_13' : 'text_M_20'}
                      style={{
                        color: colorChips.black[300],
                      }}
                    >
                      {data.quoteAmount}원
                    </Typo>
                  </Stack>
                </Stack>
              </>
            )}

            {isProfile && (
              <>
                <Stack
                  direction={isMobile ? 'column' : 'row'}
                  gap="20px"
                  sx={{ textWrap: 'nowrap', pt: isMdDown ? '14px' : '24px' }}
                >
                  <Stack
                    direction="row"
                    gap="6px"
                    alignItems="center"
                    sx={{
                      borderRight: isMobile ? '' : `1px solid ${colorChips.line['e6e6e6']}`,
                      pr: isMobile ? '' : '16px',
                    }}
                  >
                    <Typo
                      className="text_M_14"
                      style={{
                        backgroundColor: colorChips.background['f4f7fb'],
                        padding: '2px 6px',
                        borderRadius: '4px',
                        color: colorChips.grayScale[500],
                      }}
                    >
                      제공 서비스
                    </Typo>
                    <Typo
                      className="text_M_14"
                      style={{
                        color: colorChips.black[300],
                      }}
                    >
                      {data.service}
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
                      지역
                    </Typo>
                    <Typo
                      className="text_M_14"
                      style={{
                        color: colorChips.black[300],
                      }}
                    >
                      {data.region}
                    </Typo>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
        {ExcludeLike && (
          <Stack direction="row">
            <Image src="/assets/images/like-icon/like-24x24-black.svg" alt="like icon" width={24} height={24} />
            <Typo className={isMdDown ? 'text_M_13' : 'text_M_18'}>{data.likeCount}</Typo>
          </Stack>
        )}
      </Stack>

      {isWaitRequest && (
        <>
          <Stack
            direction={isMdDown ? 'column' : 'row'}
            gap="20px"
            sx={{ textWrap: 'nowrap', pt: isMdDown ? '14px' : '24px' }}
          >
            <Stack
              direction="row"
              gap="6px"
              alignItems="center"
              sx={{ borderRight: isMdDown ? '' : `1px solid ${colorChips.line['e6e6e6']}`, pr: isMdDown ? '' : '16px' }}
            >
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
            <Stack direction="row">
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
              <Stack direction="row" gap="6px" alignItems="center" sx={{ pl: isMdDown ? '14px' : '16px' }}>
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
                  }}
                >
                  {data.endPoint}
                </Typo>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}

      {isFinishReview && (
        <>
          <Stack>
            <Typo
              className={isMdDown ? 'text_R_14' : 'text_R_20'}
              style={{ color: colorChips.grayScale[500], paddingTop: isMdDown ? '10px' : '32px' }}
            >
              {data.review?.content || '작성된 리뷰가 없습니다.'}
            </Typo>
          </Stack>
        </>
      )}
      {!isConfirmRequest && (isWaitRequest || isQuotation) && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          gap={isMdDown ? '8px' : '16px'}
          paddingTop={isMdDown ? '14px' : '16px'}
        >
          <Typo className={isMdDown ? 'text_M_14' : 'text_M_18'} style={{ color: colorChips.black[400] }}>
            견적 금액
          </Typo>
          <Typo className={isMdDown ? 'text_B_18' : 'text_B_24'} style={{ color: colorChips.black[400] }}>
            180,000원
          </Typo>
        </Stack>
      )}

      {isWriteReview && (
        <Stack direction={isMobile ? 'column' : 'row'} gap="8px" sx={{ paddingTop: '26px' }}>
          <SolidButton text="리뷰 작성하기" width="100%" onClick={() => router.push(PATH.mover.movingQuoteRequest)} />
        </Stack>
      )}

      {isProfile && isMdDown && (
        <Stack direction={isMobile ? 'column' : 'row'} gap="8px" sx={{ paddingTop: '26px' }}>
          <SolidButton text="내 프로필 수정" width="100%" hasIcon onClick={() => router.push(PATH.mover.profile)} />
          <OutlinedButton
            text="기본 정보 수정"
            buttonType="done"
            width="100%"
            hasIcon
            onClick={() => router.push(PATH.mover.profile)}
          />
        </Stack>
      )}
    </>
  );
}
