export function showHelperIcon(task): boolean {
  return Boolean(task.description || task.subtasks?.length);
}
