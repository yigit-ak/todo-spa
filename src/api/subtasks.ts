import axiosInstance, { handleRequest } from "./client";
import type { Subtask } from "../types/domain";
import type {CreateSubtaskDto, UpdateSubtaskDto} from "../types/subtask.ts";

export function getSubtasks(taskId: string) {
  return handleRequest<Subtask[]>(() =>
      axiosInstance.get(`/tasks/${taskId}/subtasks`)
  );
}

export function createSubtask(taskId: string, subtask: CreateSubtaskDto) {
  return handleRequest<Subtask>(() =>
      axiosInstance.post(`/tasks/${taskId}/subtasks`, subtask)
  );
}

export function updateSubtask(taskId: string, subtaskId: string, updated: Partial<UpdateSubtaskDto>) {
  return handleRequest<Subtask>(() =>
      axiosInstance.patch(`/tasks/${taskId}/subtasks/${subtaskId}`, updated)
  );
}

export function deleteSubtask(taskId: string, subtaskId: string) {
  return handleRequest<void>(() =>
      axiosInstance.delete(`/tasks/${taskId}/subtasks/${subtaskId}`)
  );
}

export function toggleSubtaskCompleted(taskId: string, subtaskId: string) {
  return handleRequest<Subtask>(() =>
      axiosInstance.post(`/tasks/${taskId}/subtasks/${subtaskId}/toggle-completed`)
  );
}
