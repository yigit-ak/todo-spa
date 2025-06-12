import axios from "axios";
import {userManager} from "../auth/AuthProvider";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const user = await userManager.getUser();
  if (user?.access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${user.access_token}`,
    };
  }
  return config;
});

export async function handleRequest<T>(fn: () => Promise<{ data: T }>): Promise<T> {
  try {
    const res = await fn();
    return res.data;
  } catch (err: any) {
    console.error("API call failed:", err);
    throw new Error(err.response?.data || err.message);
  }
}

export default axiosInstance;
