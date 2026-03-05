import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(config => {
  return config;
});

apiClient.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401) {
      console.log("apiClient error 401");
      // Remove token
      // Redirect to login page
    }
    return Promise.reject(error.response?.data || error.message);
  }
)

export default apiClient;