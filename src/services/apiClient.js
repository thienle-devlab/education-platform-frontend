import axios from "axios";

/**
 * Axios instance dùng chung — mọi request đi qua API Gateway.
 * Gateway định tuyến: /api/auth/**, /api/users/**, /api/courses/**.
 * Đổi địa chỉ bằng biến môi trường VITE_API_BASE_URL (xem .env.example nếu có).
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
