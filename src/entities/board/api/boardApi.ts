// src/entities/board/api/boardApi.ts
import { apiInstance } from '@/shared';
import type { 
  BoardSummary, 
  BoardDetail, 
  BoardListResponse, 
  BoardDetailResponse 
} from '@/entities/board';

/**
 * 내 보드 목록 조회
 */
export const fetchMyBoards = async (): Promise<BoardSummary[]> => {
  const { data } = await apiInstance.get<BoardListResponse>('/kanban/boards');
  return data.data; 
};

/**
 * 보드 상세 조회
 */
export const fetchBoardDetail = async (boardId: number): Promise<BoardDetail> => {
  const { data } = await apiInstance.get<BoardDetailResponse>(`/kanban/boards/${boardId}`);
  return data.data; 
};