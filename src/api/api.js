import axios from "axios";

const API_URL = "http://localhost:3000/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data) => api.post("/register", data),
  login: (data) => api.post("/login", data),
  logout: () => api.get("/logout"),
  me: () => api.get("/me"),
};
