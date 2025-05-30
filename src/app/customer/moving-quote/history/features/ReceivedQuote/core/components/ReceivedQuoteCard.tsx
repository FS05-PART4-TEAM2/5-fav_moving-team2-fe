import { Stack } from '@mui/material';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import { CustomerQuoteHistoryData } from '@/shared/types/types';
import { OfferCard } from './OfferCard';
import { formatToFullDateWithTime, formatToYYMMDD } from '@/shared/utils/dataFormatter';
import { OfferFilter } from './OfferFilter';
import { useState } from 'react';

type FilterType = 'all' | 'confirmed';

export const ReceivedQuoteCard = ({ data }: { data: CustomerQuoteHistoryData }) => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  const confirmedOffer = data.offers.find((offer) => offer.isConfirmedMover === true); // 확정한 견적서
  const offers = data.offers; // 전체 견적서

  // 필터에 따라 표시할 견적서 결정
  const displayOffers = currentFilter === 'confirmed' ? (confirmedOffer ? [confirmedOffer] : []) : offers;

  const moveType =
    data.moveType === 'SMALL_MOVE' ? '소형이사' : data.moveType === 'FAMILY_MOVE' ? '가정이사' : '사무실이사';

  const quoteData = [
    { label: '견적 요청일', value: formatToYYMMDD(data.requestedAt) },
    { label: '서비스', value: moveType },
    { label: '이용일', value: formatToFullDateWithTime(data.moveDate) },
    { label: '출발지', value: data.startAddress },
    { label: '도착지', value: data.endAddress },
  ];

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  return (
    <Stack sx={cardContainerSx}>
      <Stack sx={dataWrapperSx}>
        <Typo content="견적 정보" className="text_SB_16to24" color={colorChips.black[400]} />
        <Stack sx={dataBoxSx}>
          {quoteData.map((item) => (
            <Stack key={item.label} direction="row" alignItems="center">
              <Typo
                content={item.label}
                className="text_R_14to20"
                color={colorChips.grayScale[300]}
                customStyle={{ width: '110px' }}
              />
              <Typo content={item.value} className="text_R_14to20" color={colorChips.black[400]} />
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack sx={dataWrapperSx}>
        <Typo content="견적서 목록" className="text_SB_16to24" color={colorChips.black[400]} />
        <Stack direction="column" width="100%" gap={{ xs: '16px', md: '32px' }}>
          <OfferFilter onFilterChange={handleFilterChange} />
          <Stack sx={offersWrapperSx}>
            {displayOffers.map((offer) => (
              <OfferCard key={offer.offerId} data={offer} moveType={data.moveType} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const cardContainerSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '32px', md: '48px' },
  backgroundColor: colorChips.grayScale[50],
  border: { xs: 'none', sm: `0.5px solid ${colorChips.line.f2f2f2}` },
  borderRadius: { xs: '0px', sm: '24px', md: '40px' },
  padding: { xs: '40px 24px', sm: '16px 32px', md: '48px 40px' },
  boxShadow: { xs: 'none', sm: '0px 0px 4px 0px rgba(0, 0, 0, 0.08)' },
};

const dataWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '24px', md: '40px' },
};

const dataBoxSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: '8px',
  borderRadius: '16px',
  padding: { xs: '16px', sm: '32px 40px' },
  backgroundColor: colorChips.background.f7f7f7,
  border: { xs: 'none', sm: `1px solid ${colorChips.line.f2f2f2}` },
};

const offersWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '24px', sm: '32px', md: '56px' },
};
