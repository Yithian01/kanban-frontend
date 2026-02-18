// src/entities/board/api/boardApi.ts
import { apiInstance } from '@/shared';
import type { 
  BoardSummary, 
  BoardDetail, 
  BoardListResponse, 
  BoardDetailResponse,
  BoardCeateResponse,
} from '@/entities/board';

/**
 * 내 보드 목록 조회 보드 상세 조회 (GET /api/kanban/boards) 
 */
export const fetchMyBoards = async (): Promise<BoardSummary[]> => {
  const { data } = await apiInstance.get<BoardListResponse>('/kanban/boards');
  return data.data; 
};

/**
 * 보드 상세 조회 (GET /api/kanban/boards/{boardId}) 
 */
export const fetchBoardDetail = async (boardId: number): Promise<BoardDetail> => {
  const { data } = await apiInstance.get<BoardDetailResponse>(`/kanban/boards/${boardId}`);
  return data.data; 
};

/**
 * 새 칸반 보드 생성 (POST /api/kanban)
 */
export const createBoard = async (title: string): Promise<number> => {
  const { data } = await apiInstance.post<BoardCeateResponse>('/kanban', { title });
  return data.data; // 생성된 보드 ID 반환
};

/**
 * 칸반 보드 삭제 (DELETE /api/kanban/boards/{boardId}) 
 */
export const deleteBoard = async (boardId: number) => {
  return await apiInstance.delete(`/kanban/boards/${boardId}`);
};

/**
 * 칸반 보드 이름 변경 (POST /api/kanban/boards/{boardId}/renmae) 
 */
export const renameBoard = async (boardId: number, title: string) => {
  return await apiInstance.post(`/kanban/boards/${boardId}/rename`, {title});
};