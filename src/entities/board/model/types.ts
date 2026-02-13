// src/entities/board/model/types.ts
import type { ApiResponse } from "@/shared";
import type { Section } from "@/entities/section";

export interface BoardSummary {
  boardId: number;
  title: string;
  creatorEmail: string; 
  createdAt: string; 
  updateAt: string; 
}

export interface BoardDetail {
  boardId: number;
  title: string;
  sections: Section[];
}

export type BoardListResponse = ApiResponse<BoardSummary[]>; 
export type BoardDetailResponse = ApiResponse<BoardDetail>;
export type BoardCeateResponse = ApiResponse<number>;