import { SearchAddressResponse } from '@/shared/types/types';
import $ from 'jquery';

declare global {
  interface Window {
    $: typeof $;
  }
}

const API_URL = 'https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do';
const API_KEY = process.env.NEXT_PUBLIC_OPEN_JUSO_API_KEY;

/**
 * 도로명주소 검색 오픈 API fetch (JSONP 방식)
 * json 방식은 브라우저 보안 정책으로 인해 사용 불가(CORS) -> 공식홈 jsonp 예제 코드 참고
 * @description https://business.juso.go.kr/addrlink/openApi/searchApi.do
 */
export const searchAddressOpenApi = async (address: string): Promise<SearchAddressResponse> => {
  return new Promise((resolve, reject) => {
    // 특수문자, SQL 예약어 체크
    const expText = /[%=><]/;
    if (expText.test(address)) {
      reject(new Error('특수문자를 입력할 수 없습니다.'));
      return;
    }

    const sqlArray = [
      'OR',
      'SELECT',
      'INSERT',
      'DELETE',
      'UPDATE',
      'CREATE',
      'DROP',
      'EXEC',
      'UNION',
      'FETCH',
      'DECLARE',
      'TRUNCATE',
    ];

    for (const sql of sqlArray) {
      const regex = new RegExp(sql, 'gi');
      if (regex.test(address)) {
        reject(new Error(`"${sql}"와(과) 같은 특정문자로 검색할 수 없습니다.`));
        return;
      }
    }

    // jQuery ajax 호출
    $.ajax({
      url: API_URL,
      type: 'post',
      data: {
        confmKey: API_KEY,
        currentPage: 1,
        countPerPage: 10,
        resultType: 'json',
        keyword: address,
      },
      dataType: 'jsonp',
      crossDomain: true,
      success: (jsonStr: SearchAddressResponse) => {
        const errCode = jsonStr.results.common.errorCode;
        const errDesc = jsonStr.results.common.errorMessage;

        if (errCode !== '0') {
          reject(new Error(`${errCode}=${errDesc}`));
        } else {
          resolve(jsonStr);
        }
      },
      error: () => {
        reject(new Error('주소 검색 중 오류가 발생했습니다.'));
      },
    });
  });
};
