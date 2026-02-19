// src/entities/task/api/taskApi.ts
import { apiInstance } from '@/shared/api';

export const createTask = async (boardId: number, sectionId: number, title: string, content: string): Promise<void> => {
  await apiInstance.post(`/kanban/boards/${boardId}/sections/${sectionId}/tasks`, { title, content });
};

export const deleteTask = async (boardId: number, sectionId: number, taskId: number): Promise<void> => {
  await apiInstance.delete(`/kanban/boards/${boardId}/sections/${sectionId}/tasks/${taskId}`);
};

export const updateTask = async (boardId: number, sectionId: number, taskId: number, title: string, content: string): Promise<void> => {
  await apiInstance.post(`/kanban/boards/${boardId}/sections/${sectionId}/tasks/${taskId}/update`, { title, content });
};

export const moveTask = async (boardId: number, taskId: number, targetSectionId: number, targetIndex: number): Promise<void> => {
  await apiInstance.post(`/kanban/boards/${boardId}/tasks/${taskId}/move`, { targetSectionId, targetIndex });
};