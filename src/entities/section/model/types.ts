// src/entities/section/model/types.ts
import type { Task } from "@/entities/task";

export interface Section {
  sectionId: number;
  name: string;
  position: number;
  tasks: Task[];
}