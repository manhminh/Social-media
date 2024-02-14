import axios from "axios";

export const API_BASE_URL = "http://localhost:8081";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to dynamically set the Authorization header
api.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem("jwt");
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
});

export default api;
