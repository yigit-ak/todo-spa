import axiosInstance, { handleRequest } from "./client";
import type { Recurrence } from "../types/domain";
import type {CreateRecurrenceDto, UpdateRecurrenceDto} from "../types/recurrence.ts";

export function createRecurrence(r: CreateRecurrenceDto) {
  return handleRequest<Recurrence>(() =>
      axiosInstance.post("/recurrences", r)
  );
}

export function updateRecurrence(id: string, updated: Partial<UpdateRecurrenceDto>) {
  return handleRequest<Recurrence>(() =>
      axiosInstance.patch(`/recurrences/${id}`, updated)
  );
}
