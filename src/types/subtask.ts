export interface CreateSubtaskDto {
  title: string;
  description?: string;
}

export interface UpdateSubtaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}