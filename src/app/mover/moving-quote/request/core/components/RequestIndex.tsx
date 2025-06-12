'use client';

import { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import Card from '@/shared/components/Card/Card';
import RequestModal from './RequestModal';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import SearchBar from '@/shared/components/Input/SearchBar';
import FilterCheckList from '@/shared/components/DropDown/FilterCheckList';
import DropDown from '@/shared/components/DropDown/DropDown';
import { ResponsiveModal } from '@/shared/components/Modal/ResponsiveModal';
import FilterModal from './FilterModal';
import FilterButton from './FilterButton';
import { SERVICE_TYPES } from '@/shared/constants';
import { TabBar } from '@/shared/components/Tab/TabBar';
import { useMoverQuotations } from '../hook/requestHooks';
import useUserStore from '@/shared/store/useUserStore';
import Image from 'next/image';
import RequestCardSkeleton from './RequestCardSkeleton';
import { UserCardData } from '@/shared/components/Card/CardPresets';
import { InfiniteData } from '@tanstack/react-query';
import { CursorInfo, InfiniteQuotationPage } from '@/shared/types/types';
import { mapToUserCardData } from '../hook/mapToUserCardData';

export default function RequestIndex() {
  const [modalType, setModalType] = useState<'request' | 'reject' | 'filter' | null>(null);
  const [currentTab, setCurrentTab] = useState<'move' | 'filter'>('move');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSort, setSelectedSort] = useState('이사 빠른순');
  const [selected, setSelected] = useState<Record<string, boolean>>({
    소형이사: false,
    가정이사: false,
    사무실이사: false,
    '서비스 가능 지역': false,
    '지정 견적 요청': false,
  });
  const moverData = useUserStore((state) => state.moverData);

  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  // TODO count개수 내려오는 값으로 수정
  const CheckboxMoveType = [
    { label: '소형이사', count: 10, checked: selected['소형이사'] },
    { label: '가정이사', count: 2, checked: selected['가정이사'] },
    { label: '사무실이사', count: 8, checked: selected['사무실이사'] },
  ];

  const CheckboxFilterType = [
    { label: '서비스 가능 지역', count: 10, checked: selected['서비스 가능 지역'] },
    { label: '지정 견적 요청', count: 2, checked: selected['지정 견적 요청'] },
  ];
  const isAnySelected = [...CheckboxMoveType, ...CheckboxFilterType].some((item) => item.checked);
  const handleFilterChange = (label: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [label]: checked }));
  };

  const handleCheckAll = (group: '이사유형' | '필터') => (checked: boolean) => {
    const labels =
      group === '이사유형' ? ['소형이사', '가정이사', '사무실이사'] : ['서비스 가능 지역', '지정 견적 요청'];
    const updated = labels.reduce((acc, label) => {
      acc[label] = checked;
      return acc;
    }, {} as Record<string, boolean>);

    setSelected((prev) => ({ ...prev, ...updated }));
  };

  const handleOpenModal = (type: 'request' | 'reject', id: string) => {
    setModalType(type);
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedId(null);
  };

  const selectedMoveType = SERVICE_TYPES.filter(({ label }) => selected[label]).map(({ key }) => key);
  const selectedRegion =
    selected['서비스 가능 지역'] && moverData?.serviceArea?.length ? moverData.serviceArea : undefined;
  const SORT_MAP = {
    '이사 빠른순': 'MOVE_DATE_ASC',
    '요청일 빠른순': 'REQUEST_DATE_ASC',
  } as const;

  type SortLabel = keyof typeof SORT_MAP;
  type SortValue = (typeof SORT_MAP)[SortLabel];

  const sortedValue: SortValue | undefined = SORT_MAP[selectedSort as SortLabel];
  const queryParams = {
    type: selectedMoveType.length ? selectedMoveType : undefined,
    region: selectedRegion,
    isAssigned: selected['지정 견적 요청'] ? true : false,
    username: searchKeyword || undefined,
    sorted: sortedValue,
  };

  const {
    data: quotationsResponse,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isPending,
    refetch,
  } = useMoverQuotations(queryParams);
  const rawQuotations =
    (quotationsResponse as unknown as InfiniteData<InfiniteQuotationPage, CursorInfo>)?.pages.flatMap(
      (page) => page.data,
    ) ?? [];

  const quotations: UserCardData[] = rawQuotations.map(mapToUserCardData);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [bottomRef.current, hasNextPage, fetchNextPage]);

  return (
    <>
      <Stack width="100%" pt={isMd ? '14px' : '32px'}>
        <Typo
          className={isMd ? 'text_SB_18' : 'text_SB_24'}
          style={{ color: colorChips.black[400], paddingBottom: isMd ? '38px' : '56px' }}
          content="받은 요청"
        />
        <Stack direction="row" width="100%" gap={isMd ? '' : '107px'}>
          {!isMd && (
            <Stack direction="column" gap="24px">
              <FilterCheckList
                title="이사유형"
                items={CheckboxMoveType}
                onChange={handleFilterChange}
                onCheckAll={handleCheckAll('이사유형')}
                checkAll={CheckboxMoveType.every((item) => item.checked)}
              />
              <FilterCheckList
                title="필터"
                items={CheckboxFilterType}
                onChange={handleFilterChange}
                onCheckAll={handleCheckAll('필터')}
                checkAll={CheckboxFilterType.every((item) => item.checked)}
              />
            </Stack>
          )}

          <Stack width="100%">
            <SearchBar onSearch={(text) => setSearchKeyword(text)} />
            <Stack
              direction="row"
              mt={isMd ? '4px' : '24px'}
              py={isMd ? '5px' : '7px'}
              justifyContent="space-between"
              alignItems="center"
            >
              {/* TODO 총 개수 내려오는 값으로 수정*/}
              <Typo
                className={isMd ? 'text_M_13' : 'text_M_16'}
                style={{ color: colorChips.black[400] }}
                content="전체 10건"
              />
              <Stack direction="row" spacing={1}>
                <DropDown category="moveSort" selected={selectedSort} onChange={setSelectedSort} />
                {isMd && (
                  <Stack alignItems="flex-end">
                    <FilterButton selected={isAnySelected} onClick={() => setModalType('filter')} />
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Stack gap={isMd ? '32px' : '48px'}>
              {isPending ? (
                <>
                  {[...Array(2)].map((_, i) => (
                    <RequestCardSkeleton key={i} />
                  ))}
                </>
              ) : quotations.length === 0 ? (
                <Stack
                  py={isMd ? '80px' : '120px'}
                  gap={isMd ? '24px' : '32px'}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    src="/assets/images/empty-images/review-blue-02.svg"
                    alt="request Icon"
                    width={isMd ? 110 : 184}
                    height={isMd ? 82 : 136}
                  />
                  <Typo
                    className="text_R_14to20"
                    style={{ color: colorChips.grayScale[400] }}
                    content="아직 받은 요청이 없어요!"
                  />
                </Stack>
              ) : (
                <>
                  {quotations.map((card: UserCardData) => (
                    <Card
                      key={card.id}
                      type="request"
                      data={card}
                      onRequestClick={(id) => handleOpenModal('request', id)}
                      onRejectClick={(id) => handleOpenModal('reject', id)}
                    />
                  ))}
                  <div ref={bottomRef} />
                  {isFetchingNextPage && <RequestCardSkeleton />}
                </>
              )}
            </Stack>
          </Stack>
        </Stack>

        {/* 모달 - 견적 보내기 */}
        {modalType === 'request' && selectedId && (
          <ResponsiveModal modalTitle="견적 보내기" isOpen handleClickClose={handleCloseModal}>
            <RequestModal
              mode="request"
              onClose={handleCloseModal}
              onSuccess={() => {
                refetch();
                handleCloseModal();
              }}
              requestCardData={quotations.find((card: UserCardData) => card.id === selectedId)!}
            />
          </ResponsiveModal>
        )}

        {/* 모달 - 반려 */}
        {modalType === 'reject' && selectedId && (
          <ResponsiveModal modalTitle="반려 사유 작성" isOpen handleClickClose={handleCloseModal}>
            <RequestModal
              mode="reject"
              onClose={handleCloseModal}
              onSuccess={() => {
                refetch();
                handleCloseModal();
              }}
              requestCardData={quotations.find((card: UserCardData) => card.id === selectedId)!}
            />
          </ResponsiveModal>
        )}

        {/* 모달 - 필터 체크박스 */}
        {modalType === 'filter' && isMd && (
          <ResponsiveModal
            modalTitle=""
            customModalTitle={
              <TabBar
                currentVal={currentTab}
                firstVal="move"
                firstLabel="이사유형"
                secondVal="filter"
                secondLabel="필터"
                handleChange={(val) => setCurrentTab(val as 'move' | 'filter')}
              />
            }
            isOpen
            handleClickClose={handleCloseModal}
          >
            <FilterModal
              moveTypeItems={CheckboxMoveType}
              filterItems={CheckboxFilterType}
              onChange={handleFilterChange}
              onCheckAll={handleCheckAll}
              onClose={handleCloseModal}
              currentTab={currentTab}
            />
          </ResponsiveModal>
        )}
      </Stack>
    </>
  );
}
