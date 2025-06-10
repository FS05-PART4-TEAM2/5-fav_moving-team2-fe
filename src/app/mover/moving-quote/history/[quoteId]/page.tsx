'use client';
import { ShareButtons } from '@/shared/components/Button/ShareButtons';
import Card from '@/shared/components/Card/Card';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';
import { Divider, Stack, useMediaQuery } from '@mui/material';

import { mockQuotation } from '../core/mock';

// 최상위 stack에 paddingX="24px" 넣기
export default function Page() {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const shareUrl = `/mover/moving-quote/history/id`;
  const data = mockQuotation[0];

  return (
    <Stack width="100%" direction="row" height="100%" paddingX="24px" paddingTop="30px" gap="117px">
      <Stack width="100%" direction="column" gap={isDesktop ? '40px' : '24px'}>
        <Card type="confirmRequest" data={data.data} />

        {!isDesktop && (
          <>
            <Stack>
              <ShareButtons title="견적서 공유" shareUrl={shareUrl} isDesktop={isDesktop} />
            </Stack>
            <Divider
              sx={{
                borderColor: colorChips.line['f2f2f2'],
              }}
            />
          </>
        )}

        <Stack gap={isDesktop ? '32px' : '16px'}>
          <Typo className="text_SB_16to24" style={{ color: colorChips.black[400] }} content="견적가" />
          <Typo className="text_B_20to32" style={{ color: colorChips.black[400] }} content={`${data.data.price}원`} />
        </Stack>
        <Divider
          sx={{
            borderColor: colorChips.line['f2f2f2'],
          }}
        />
        <Stack gap={isDesktop ? '40px' : '24px'}>
          <Typo className="text_SB_16to24" style={{ color: colorChips.black[400] }} content="견적 정보" />
          <Stack
            bgcolor={colorChips.background.fafafa}
            border={`1px solid ${colorChips.line.f2f2f2}`}
            borderRadius="16px"
            padding={isDesktop ? '32px 40px' : '24px 32px'}
          >
            <Stack direction="row" gap={isDesktop ? '32px' : '40px'}>
              <Stack>
                <Typo className="text_R_14to18" style={{ color: colorChips.grayScale[300] }} content="견적 요청일" />
                <Typo className="text_R_14to18" style={{ color: colorChips.grayScale[300] }} content="서비스" />
                <Typo className="text_R_14to18" style={{ color: colorChips.grayScale[300] }} content="이용일" />
                <Typo className="text_R_14to18" style={{ color: colorChips.grayScale[300] }} content="출발지" />
                <Typo className="text_R_14to18" style={{ color: colorChips.grayScale[300] }} content="도착지" />
              </Stack>

              <Stack>
                <Typo className="text_R_14to18" style={{ color: colorChips.black[400] }} content="견적 요청일" />
                <Typo className="text_R_14to18" style={{ color: colorChips.black[400] }} content="서비스" />
                <Typo className="text_R_14to18" style={{ color: colorChips.black[400] }} content="이용일" />
                <Typo className="text_R_14to18" style={{ color: colorChips.black[400] }} content="출발지" />
                <Typo className="text_R_14to18" style={{ color: colorChips.black[400] }} content="도착지" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isDesktop && (
        <Stack>
          <ShareButtons title="견적서 공유" shareUrl={shareUrl} isDesktop={isDesktop} />
        </Stack>
      )}
    </Stack>
  );
}
