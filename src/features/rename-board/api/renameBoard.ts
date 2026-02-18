// src/features/rename-board/api/renameBoard.ts
import { apiInstance } from '@/shared';

/**
 * 칸반 보드 이름 변경 (POST /api/kanban/boards/{boardId}/renmae) 
 */
export const renameBoard = async (boardId: number, title: string) => {
  return await apiInstance.post(`/kanban/boards/${boardId}/rename`, {title});
};