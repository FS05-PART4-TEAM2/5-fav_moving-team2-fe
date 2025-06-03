/**
 * 최소 로딩 시간을 보장하는 유틸리티 함수
 * @param promise 실행할 비동기 함수
 * @param minTime 최소 지속 시간 (밀리초, 기본값: 2000ms)
 * @returns Promise<T>
 */
export const withMinLoadingTime = async <T>(promise: Promise<T>, minTime: number = 2000): Promise<T> => {
  const [result] = await Promise.all([promise, new Promise((resolve) => setTimeout(resolve, minTime))]);
  return result;
};
