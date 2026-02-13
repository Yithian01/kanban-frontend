// src/entities/board/model/types.ts
import type { ApiResponse } from "@/shared";

export interface BoardSummary {
  boardId: number;
  title: string;
  creatorEmail: string; 
  createdAt: string; 
  updateAt: string; 
}

export interface Task {
  taskId: number;
  title: string;
  content: string;
  position: number;
}

export interface Section {
  sectionId: number;
  name: string;
  position: number;
  tasks: Task[];
}

export interface BoardDetail {
  boardId: number;
  title: string;
  sections: Section[];
}

export type BoardListResponse = ApiResponse<BoardSummary[]>; 
export type BoardDetailResponse = ApiResponse<BoardDetail>;
export type BoardCeateResponse = ApiResponse<number>;