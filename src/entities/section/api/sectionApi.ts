// src/entities/section/api/sectionApi.ts 
import { apiInstance } from '@/shared/api';

export const createSection = async (boardId: number, name: string): Promise<void> => {
  await apiInstance.post(`/kanban/boards/${boardId}/sections`, { name });
};