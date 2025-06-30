import axios, {
  AxiosAdapter,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// url 타입 보강
type URLQueryParams = Record<string, string | number | boolean>;

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  useMultipart?: boolean;
  fetchOptions?: RequestInit & {
    next?: {
      revalidate?: number;
      tags?: string[];
    };
  };
}

// Error 타입 확장
interface CustomError extends Error {
  config?: ExtendedAxiosRequestConfig;
  response?: {
    data: any;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: ExtendedAxiosRequestConfig;
  };
}

const fetchAdapter: AxiosAdapter = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  // 내부 요청 처리 타입 보강
  const internalConfig = config as ExtendedAxiosRequestConfig;

  const { url, method = 'GET', headers, data, params, fetchOptions, useMultipart } = internalConfig;

  // url쿼리 문자열 붙이기
  const buildURLWithParams = (url: string, params?: URLQueryParams): string => {
    if (!params) return url;
    const search = new URLSearchParams();
    for (const key in params) {
      search.set(key, String(params[key]));
    }
    return `${url}?${search.toString()}`;
  };

  //전체 url
  const fullUrl = buildURLWithParams((internalConfig.baseURL ?? '') + url!, params);

  let requestHeaders: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      requestHeaders[key] = value;
    });
  } else if (headers && typeof headers === 'object') {
    requestHeaders = { ...(headers as Record<string, string>) };
  }

  //  Content-Type이 Multipart 경우 Content-Type를 지워 브라우저가 유추하게 유도
  if (useMultipart) {
    delete requestHeaders['Content-Type'];
  } else if (method !== 'GET' && method !== 'HEAD') {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const body = ['GET', 'HEAD'].includes(method.toUpperCase())
    ? undefined
    : data instanceof FormData
    ? data
    : typeof data === 'string'
    ? data
    : JSON.stringify(data);

  const response = await fetch(fullUrl, {
    method: method.toUpperCase(),
    headers: requestHeaders,
    body,
    credentials: 'include',
    ...fetchOptions,
  });

  const contentType = response.headers.get('Content-Type') || '';
  const responseData = contentType.includes('application/json') ? await response.json() : await response.text();

  // 401 응답을 error로 처리
  if (response.status === 401) {
    const error = new Error('Unauthorized') as CustomError;

    error.config = internalConfig;

    error.response = {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      config: internalConfig,
    };

    // error.message를 넘겨 alert를 띄우기 위해 넘김
    if (typeof responseData === 'object' && responseData !== null && 'message' in responseData) {
      error.message = responseData.message;
    }

    throw error;
  }

  return {
    data: responseData,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    config: internalConfig,
    request: null,
  };
};

const requestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    function (config) {
      if (process.env.NODE_ENV === 'development') {
        const token = localStorage.getItem('accessToken');

        if (token) {
          if (config.headers && typeof config.headers.set === 'function') {
            config.headers.set('Authorization', `Bearer ${token}`);
          } else {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            } as typeof config.headers;
          }
        }
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

// 응답 인터셉터
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    function (response) {
      // 401 상태 코드 체크
      if (response.status === 401) {
        return Promise.reject(response);
      }
      return response;
    },
    async function (error) {
      const status = error.response?.status;
      const originalRequest = error.config || error.response?.config;

      if (status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            addRefreshSubscriber((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          let res;
          if (process.env.NODE_ENV === 'development') {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              return Promise.reject(error);
            }

            res = await axiosInstance.post(
              '/api/auth/refresh',
              {},
              {
                headers: {
                  Authorization: `refresh-token ${refreshToken}`,
                },
              },
            );
          } else {
            // 배포 환경에서는 쿠키 기반으로 refresh
            res = await axiosInstance.post('/api/auth/refresh');
          }
          const newAccessToken = res.data.data.accessToken;
          if (!newAccessToken) {
            return Promise.reject(new Error('No access token received'));
          }
          // 개발/배포 환경 모두에서 로컬스토리지 업데이트
          localStorage.setItem('accessToken', newAccessToken);

          // axios 인스턴스의 기본 헤더 업데이트
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
          onTokenRefreshed(newAccessToken);

          // 원래 요청의 헤더도 업데이트
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshErr) {
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      const data = error.response?.data;
      const message =
        typeof data === 'string' ? data : typeof data?.message === 'string' ? data.message : '요청에 실패했습니다.';

      return Promise.reject(new Error(message));
    },
  );
  return axiosInstance;
};

const AxiosDefault = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL || '',
    withCredentials: true,
    adapter: fetchAdapter,
  });

  requestInterceptor(axiosInstance);
  responseInterceptor(axiosInstance);

  return axiosInstance;
};

const customAxios = AxiosDefault(); // 인스턴스 생성

export default customAxios;
