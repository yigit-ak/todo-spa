export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export interface Recurrence {
  id: string;
  startDate: string;        // ISO yyyy-mm-dd
  endDate?: string | null;
  period: number;           // days
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dateAssigned?: string;
  dateDue?: string;
  completed: boolean;
  subtasks: Subtask[];
  recurrence?: Recurrence;
}
