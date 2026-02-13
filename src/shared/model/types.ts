// src/shared/model/types.ts
import type {InternalAxiosRequestConfig } from 'axios';

// 확장된 요청 타입 정의
export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Spring 응답 형식 정의
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}