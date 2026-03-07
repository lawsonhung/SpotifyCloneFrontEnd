import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const APIClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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