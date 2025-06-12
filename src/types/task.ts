export interface CreateTaskDto {
  title: string;
  description?: string;
  dateAssigned?: string;
  dateDue?: string;
  recurrenceId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dateAssigned?: string;
  dateDue?: string;
  completed?: boolean;
  recurrenceId?: string;
}
