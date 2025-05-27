const API_URL = 'https://business.juso.go.kr/addrlink/addrLinkApi.do';
const API_KEY = process.env.NEXT_PUBLIC_OPEN_JUSO_API_KEY;

/**
 * 도로명주소 검색 오픈 API fetch
 * @description https://business.juso.go.kr/addrlink/openApi/searchApi.do
 */
export const searchAddressOpenApi = async (address: string) => {
  const response = await fetch(
    `${API_URL}?confmKey=${API_KEY}&currentPage=1&countPerPage=10&resultType=json&keyword=${address}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();
  return data;
};
