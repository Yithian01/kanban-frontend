// src/shared/api/index.ts
import axios from 'axios';
import type { AxiosError} from 'axios';
import type { CustomRequestConfig } from '@/shared';


export const apiInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomRequestConfig;

    // 401 Unauthorized이고 아직 재시도하지 않았다면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 순수 axios로 reissue 호출 (apiInstance 사용 시 인터셉터 중복 발생 주의)
        const res = await axios.post('/api/auth/reissue', {}, { withCredentials: true });
        
        // 백엔드와 약속한 성공 여부 확인
        if (res.data.success) {
          const newAccessToken = res.data.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return apiInstance(originalRequest); // 기존 요청 재실행
        }
      } catch (reissueError) {
        // 재발급 실패 시(리프레시 토큰 만료 등) 완전히 로그아웃 처리
        localStorage.removeItem('accessToken');
        window.location.href = '/login?expired=true';
        return Promise.reject(reissueError);
      }
    }

    // 권한 부족 (관리자 페이지 접근 등)
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
    }

    return Promise.reject(error);
  }
);

