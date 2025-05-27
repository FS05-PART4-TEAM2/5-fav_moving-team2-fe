import { Stack } from '@mui/material';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { CommonModal } from '@/shared/components/Modal/CommonModal';
import { useState } from 'react';
import SearchBar from '@/shared/components/Input/SearchBar';
import { searchAddressOpenApi } from '../service/searchAddressOpenApi';
import { SearchAddressResponseJuso } from '@/shared/types/types';
import { colorChips } from '@/shared/styles/colorChips';
import { AddressCard } from './AddressCard';
import { Typo } from '@/shared/styles/Typo/Typo';

interface SelectAddressModalProps {
  optionType: 'start' | 'end';
  isOpen: boolean;
  onChange: (address: string) => void;
  onClose: () => void;
}

// XXX: 일단 시도,시군구명 데이터까지 같이 담아놓고 api에는 도로명주소만 담음. 나중에 필요하다하면 여기서 바로 꺼내서 보낼수있음
interface SelectedAddressData {
  roadAddr: string; // 도로명주소
  siNm: string; // 시도명
  sggNm: string; // 시군구명
}

/**
 * 주소 선택 모달 컴포넌트
 */
export const SelectAddressModal = ({ optionType, isOpen, onChange, onClose }: SelectAddressModalProps) => {
  const [selectedOption, setSelectedOption] = useState<SelectedAddressData>({
    roadAddr: '',
    siNm: '',
    sggNm: '',
  });
  const [searchResult, setSearchResult] = useState<SearchAddressResponseJuso[]>([]);

  const modalTitle = optionType === 'start' ? '출발지를 선택해주세요' : '도착지를 선택해주세요';

  const handleSearch = async (text: string) => {
    try {
    const data = await searchAddressOpenApi(text);
    setSearchResult(data.results.juso);
    } catch (error) {
      // console.error('주소 검색 중 오류:', error);
      setSearchResult([]);
    }
  };

  // 옵션 클릭 시에는 selectedOption만 변경
  const handleClickOption = (value: SelectedAddressData) => {
    setSelectedOption({ ...value });
  };

  // 선택완료 버튼 클릭 시에 params 업데이트(도로명주소), 모달닫기
  const handleClickComplete = () => {
    if (selectedOption.roadAddr) {
      onChange(selectedOption.roadAddr);
      onClose();
    }
  };

  return (
    <CommonModal modalTitle={modalTitle} isOpen={isOpen} handleClickClose={onClose}>
      <Stack sx={modalContentSx}>
        <Stack sx={searchWrapperSx}>
          <SearchBar isModal={true} onSearch={handleSearch} />
          <Stack sx={resultWrapperSx}>
            {searchResult.length > 0 ? (
              searchResult.map((item, index) => (
                <AddressCard
                  key={index}
                  isSelected={selectedOption.roadAddr === item.roadAddr}
                  code={item.zipNo}
                  roadAddr={item.roadAddr}
                  jibunAddr={item.jibunAddr}
                  onClick={() =>
                    handleClickOption({
                      roadAddr: item.roadAddr,
                      siNm: item.siNm,
                      sggNm: item.sggNm,
                    })
                  }
                />
              ))
            ) : (
              <Stack
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                border={`1px solid ${colorChips.line.f2f2f2}`}
                borderRadius="16px"
                p="16px"
              >
                <Typo content="검색 결과가 없습니다." className="text_R_14to16" color={colorChips.grayScale[400]} />
              </Stack>
            )}
          </Stack>
        </Stack>
        <SolidButton text="선택완료" onClick={handleClickComplete} disabled={!selectedOption.roadAddr} />
      </Stack>
    </CommonModal>
  );
};

const modalContentSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '24px', md: '40px' },
  pt: { xs: '30px', md: '40px' },
};

const searchWrapperSx = {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: { xs: '16px', md: '24px' },
};

const resultWrapperSx = {
  width: '100%',
  maxHeight: { xs: '300px', md: '400px' },
  overflowY: 'auto',
  gap: '12px',
};
