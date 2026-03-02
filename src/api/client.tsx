import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(config => {
  let token = null;

  // Attempting to access redux state outside of React component
  createAsyncThunk(
    "user/fetchToken",
    async (_, { getState }: any) => {
      token = getState().token.value;
    })

  if (token)
    config.headers.Authorization = `Bearer ${token}`;
  console.log("apiClient token", token)
  return config;
});

apiClient.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401) {
      // Remove token
      // Redirect to login page
    }
    return Promise.reject(error.response?.data || error.message);
  }
)

export default apiClient;