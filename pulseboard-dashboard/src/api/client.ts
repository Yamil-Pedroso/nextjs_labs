import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
