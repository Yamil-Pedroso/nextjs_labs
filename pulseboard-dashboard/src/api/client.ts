import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3010/api/v1"
    : undefined);

if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL");
}

export const apiClient = axios.create({
  baseURL: API_URL,
});
