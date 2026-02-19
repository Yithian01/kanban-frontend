// src/entities/section/api/sectionApi.ts 
import { apiInstance } from '@/shared/api';

export const createSection = async (boardId: number, name: string): Promise<void> => {
  await apiInstance.post(`/kanban/boards/${boardId}/sections`, { name });
};

export const deleteSection = async (boardId: number, sectionId: number): Promise<void> => {
  await apiInstance.delete(`/kanban/boards/${boardId}/sections/${sectionId}`);
};

export const renameSection = async (boardId: number, sectionId: number, name: string): Promise<void> => {
  await apiInstance.post(`/kanban/boards/${boardId}/sections/${sectionId}`, {name});
};

export const updatePositionSection = async (boardId: number, sectionId: number, targetIndex: number): Promise<void> => {
  await apiInstance.post(`/kanban/boards/${boardId}/sections/${sectionId}/position`, {targetIndex});
};