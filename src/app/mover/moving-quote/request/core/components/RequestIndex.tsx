'use client';

import { useState } from 'react';
import { Stack } from '@mui/material';
import Card from '@/shared/components/Card/Card';
import { mockData } from '../mockData';
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

export default function RequestIndex() {
  const [modalType, setModalType] = useState<'request' | 'reject' | 'filter' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSort, setSelectedSort] = useState('이사 빠른순');
  const [selected, setSelected] = useState<Record<string, boolean>>({
    소형이사: true,
    가정이사: true,
    사무실이사: true,
    '서비스 가능 지역': true,
    '지정 견적 요청': true,
  });

  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const userData = mockData;

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
  //TODO 리엑트 쿼리 연결 및 키 맵핑
  {
    /*const selectedMoveType = SERVICE_TYPES.filter(({ label }) => selected[label]).map(({ key }) => key);

  const selectedFilters = ['서비스 가능 지역', '지정 견적 요청'].filter((label) => selected[label]);

  const parsedQuery = {
    keyword: searchKeyword,
    moveTypes: selectedMoveType,
    filters: selectedFilters,
    sort: selectedSort,
  };

  console.log('🧩 파싱된 쿼리 객체:', parsedQuery); */
  }

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

          <Stack spacing={3} width="100%">
            <SearchBar onSearch={(text) => setSearchKeyword(text)} />
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
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
            {userData.map((card) => (
              <Card
                key={card.id}
                type="request"
                data={card}
                onRequestClick={(id) => handleOpenModal('request', id)}
                onRejectClick={(id) => handleOpenModal('reject', id)}
              />
            ))}
          </Stack>
        </Stack>

        {/* 모달 - 견적 보내기 */}
        {modalType === 'request' && selectedId && (
          <ResponsiveModal modalTitle="견적 보내기" isOpen handleClickClose={handleCloseModal}>
            <RequestModal
              mode="request"
              onClose={handleCloseModal}
              requestCardData={userData.find((card) => card.id === selectedId)!}
            />
          </ResponsiveModal>
        )}

        {/* 모달 - 반려 */}
        {modalType === 'reject' && selectedId && (
          <ResponsiveModal modalTitle="반려 사유 작성" isOpen handleClickClose={handleCloseModal}>
            <RequestModal
              mode="reject"
              onClose={handleCloseModal}
              requestCardData={userData.find((card) => card.id === selectedId)!}
            />
          </ResponsiveModal>
        )}

        {/* 모달 - 필터 체크박스 */}
        {modalType === 'filter' && isMd && (
          <ResponsiveModal modalTitle="" isOpen handleClickClose={handleCloseModal}>
            <FilterModal
              moveTypeItems={CheckboxMoveType}
              filterItems={CheckboxFilterType}
              onChange={handleFilterChange}
              onCheckAll={handleCheckAll}
              onClose={handleCloseModal}
            />
          </ResponsiveModal>
        )}
      </Stack>
    </>
  );
}
