// src/features/auth/api/authApi.ts
import { apiInstance } from '@/shared';
import type { ApiResponse } from '@/shared';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/features/auth';

// 로그인 요청
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiInstance.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

// 회원가입 요청
export const signupApi = async (data: SignupRequest): Promise<ApiResponse<String>> => {
  const response = await apiInstance.post<ApiResponse<String>>('/auth/signup', data);
  return response.data;
};

// 이메일 중복 체크 (중복이면 true)
export const checkEmailApi = async (email: string): Promise<ApiResponse<boolean>> => {
  const response = await apiInstance.get<ApiResponse<boolean>>(`/auth/check-email`, {
    params: { email }
  });
  return response.data;
};

// 닉네임 중복 체크 (중복이면 true)
export const checkNicknameApi = async (nickname: string): Promise<ApiResponse<boolean>> => {
  const response = await apiInstance.get<ApiResponse<boolean>>(`/auth/check-nickname`, {
    params: { nickname }
  });
  return response.data;
};