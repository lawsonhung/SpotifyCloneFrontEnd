import axios from "axios";
import axiosThrottle from "axios-request-throttle";

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const APIClient = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosThrottle.use(APIClient, { requestsPerSecond: 1 });

APIClient.interceptors.request.use(config => {
  return config;
});

APIClient.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401) {
      console.log("APIClient error 401");
      // Remove token
      // Redirect to login page
    }
    return Promise.reject(error.response?.data || error.message);
  }
)

export default APIClient;