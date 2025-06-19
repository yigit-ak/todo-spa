import type {CreateSubtaskDto} from "./subtask.ts";

export interface CreateRecurrenceDto {
  startDate: string;        // ISO yyyy-mm-dd
  endDate?: string;
  period: number;           // days
  taskTemplate: {
    title: string;
    description?: string;
    subtasks?: CreateSubtaskDto[];
  }
}

export interface UpdateRecurrenceDto {
  startDate?: string;        // ISO yyyy-mm-dd
  endDate?: string | null;
  period?: number;           // days
  taskTemplate?: {
    title?: string;
    description?: string;
    subtasks?: CreateSubtaskDto[];
  }
}
