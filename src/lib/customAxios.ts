import axios, { AxiosAdapter, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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
    method,
    headers: requestHeaders,
    body,
    credentials: 'include',
    ...fetchOptions,
  });

  const contentType = response.headers.get('Content-Type') || '';
  const responseData = contentType.includes('application/json') ? await response.json() : await response.text();

  return {
    data: responseData,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    config: internalConfig,
    request: null,
  };
};

const customAxios = axios.create({
  baseURL: process.env.API_URL || '',
  withCredentials: true,
  adapter: fetchAdapter,
});

customAxios.interceptors.request.use((config) => {
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
});

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

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(customAxios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        let res;
        if (process.env.NODE_ENV === 'development') {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token');

          res = await customAxios.get('/api/auth/refresh', {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
        } else {
          res = await customAxios.get('/api/auth/refresh');
        }

        const newAccessToken = res.data.accessToken;

        if (process.env.NODE_ENV === 'development') {
          localStorage.setItem('accessToken', newAccessToken);
        }

        customAxios.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        onTokenRefreshed(newAccessToken);

        return customAxios(originalRequest);
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

export default customAxios;
