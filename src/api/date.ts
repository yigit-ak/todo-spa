import axiosInstance, { handleRequest } from "./client";

export function getTasksByDate (date: string) {
  return handleRequest(()=>
      axiosInstance.get(`/date/${date}`)
  );
}