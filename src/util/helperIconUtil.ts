import type {Task} from "../types/domain.ts";

export function showHelperIcon(task: Task): boolean {
  return Boolean(task.description || task.subtasks?.length);
}
