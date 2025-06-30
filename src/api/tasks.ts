import axiosInstance, { handleRequest } from "./client";
import type { Task } from "../types/domain";
import type {CreateTaskDto, UpdateTaskDto} from "../types/task.ts";

export function getTasksForToday() {
  return handleRequest<Task[]>(() =>
      axiosInstance.get("/tasks/today")
  );
}

export function getTask(id: string) {
  return handleRequest<Task>(() =>
      axiosInstance.get(`/tasks/${id}`)
  );
}

export function createTask(task: CreateTaskDto) {
  return handleRequest<>(() =>
      axiosInstance.post("/tasks", task)
  );
}

export function updateTask(id: string, task: Partial<UpdateTaskDto>) {
  return handleRequest<Task>(() =>
      axiosInstance.patch(`/tasks/${id}`, task)
  );
}

export function deleteTask(id: string) {
  return handleRequest<void>(() =>
      axiosInstance.delete(`/tasks/${id}`)
  );
}

export function toggleTaskCompleted(id: string) {
  return handleRequest<Task>(() =>
      axiosInstance.post(`/tasks/${id}/toggle-completed`)
  );
}
