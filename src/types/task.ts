import type {CreateSubtaskDto} from "./subtask.ts";

export interface CreateTaskDto {
  title: string;
  description?: string;
  dateAssigned?: string;
  dateDue?: string;
  subtasks?: CreateSubtaskDto[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dateAssigned?: string;
  dateDue?: string;
  completed?: boolean;
  // recurrenceId?: string; todo not sure
}
