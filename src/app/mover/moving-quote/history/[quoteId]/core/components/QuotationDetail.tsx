'use client';

import { useEffect, useState } from 'react';
import { ShareButtons } from '@/shared/components/Button/ShareButtons';
import Card from '@/shared/components/Card/Card';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';
import { CircularProgress, Divider, Stack, useMediaQuery } from '@mui/material';
import { getDetailQuotationDetailApi } from '../api/DetailQuotationApi';
import { mapSentQuotationToCardData } from '../../../core/hook/historyHooks';
import { useRouter } from 'next/navigation';
import { mapQuotationDetailDisplay } from '../hook/DetailQuotationHook';

interface QuotationDetailProps {
  quoteId: string;
}

export default function QuotationDetail({ quoteId }: QuotationDetailProps) {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState<any>(null);
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDetailQuotationDetailApi(quoteId);
        if (!response.success || !response.data) {
          router.push('/not-found');
          return;
        }

        const { data } = mapSentQuotationToCardData(response.data);

        setCardData(data);
        setRawData(response.data);
      } catch (e) {
        console.error('❌ 견적 상세 불러오기 실패:', e);
        router.push('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quoteId, router]);

  if (loading || !cardData || !rawData)
    return (
      <Stack
        py={isDesktop ? '200px' : '80px'}
        gap={isDesktop ? '32px' : '24px'}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={64} thickness={5} />
      </Stack>
    );

  const shareUrl = `/mover/moving-quote/history/${quoteId}`;
  const detail = mapQuotationDetailDisplay(rawData);

  return (
    <Stack width="100%" direction="row" height="100%" paddingX="24px" paddingTop="30px" gap="117px">
      <Stack width="100%" direction="column" gap={isDesktop ? '40px' : '24px'}>
        <Card type="moveQuotation" data={cardData} />

        {!isDesktop && (
          <>
            <Stack>
              <ShareButtons title="견적서 공유" shareUrl={shareUrl} isDesktop={false} />
            </Stack>
            <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />
          </>
        )}

        <Stack gap={isDesktop ? '32px' : '16px'}>
          <Typo className="text_SB_16to24" style={{ color: colorChips.black[400] }} content="견적가" />
          <Typo
            className="text_B_20to32"
            style={{ color: colorChips.black[400] }}
            content={`${rawData.price.toLocaleString()}원`}
          />
        </Stack>

        <Divider sx={{ borderColor: colorChips.line['f2f2f2'] }} />

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
                <Typo className="text_R_14to18" style={{ color: colorChips.black[400] }} content={detail.moveDay} />
                <Typo
                  className="text_R_14to18"
                  style={{ color: colorChips.black[400] }}
                  content={detail.moveTypeLabel}
                />
                <Typo
                  className="text_R_14to18"
                  style={{ color: colorChips.black[400] }}
                  content={detail.moveDayWithWeek}
                />
                <Typo
                  className="text_R_14to18"
                  style={{ color: colorChips.black[400] }}
                  content={rawData.startAddress}
                />
                <Typo className="text_R_14to18" style={{ color: colorChips.black[400] }} content={rawData.endAddress} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {isDesktop && (
        <Stack>
          <ShareButtons title="견적서 공유" shareUrl={shareUrl} isDesktop />
        </Stack>
      )}
    </Stack>
  );
}
