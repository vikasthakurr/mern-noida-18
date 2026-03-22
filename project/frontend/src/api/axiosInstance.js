import axios from "axios";

// single axios instance shared across all API calls
// change baseURL here and it updates everywhere
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
});

// attach token from localStorage to every request if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
