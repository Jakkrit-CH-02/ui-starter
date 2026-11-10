import axios from "axios";
import env from "./env";

/**
 * API client. Every request goes through this instance.
 * Add auth headers or shared error handling with `http.interceptors`.
 */
export const http = axios.create({
  baseURL: env.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
