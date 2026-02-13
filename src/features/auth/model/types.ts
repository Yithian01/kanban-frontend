// src/features/auth/model/types.ts
import type { ApiResponse } from '@/shared';

export interface LoginRequest {
  email: string;
  password?: string; 
}

export interface LoginResponseData {
  accessToken: string;
  nickname: string;
  role: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface SignupRequest {
  email: string;
  password?: string;
  nickname: string;
}