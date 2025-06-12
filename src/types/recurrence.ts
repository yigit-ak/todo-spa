export interface CreateRecurrenceDto {
  startDate: string;        // ISO yyyy-mm-dd
  endDate?: string;
  period: number;           // days
}

export interface UpdateRecurrenceDto {
  startDate?: string;        // ISO yyyy-mm-dd
  endDate?: string | null;
  period?: number;           // days
}