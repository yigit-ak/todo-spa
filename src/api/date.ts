import axiosInstance, {handleRequest} from "./client";
import type {Task} from "../types/domain.ts";

export function getTasksByDate(date: string) {
  return handleRequest<Task[]>(() =>
      axiosInstance.get(`/tasks?date=${date}`)
  );
}