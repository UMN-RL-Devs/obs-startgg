import axios from "axios";
import { config } from "dotenv";

config();

export const axiosService = axios;

// Ensure that all requests going out have the API key included
axiosService.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${process.env.STARTGG_KEY}`;
  }
  return config;
});
