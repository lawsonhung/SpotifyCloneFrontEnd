import apiClient from "../client";

export const getToken = async (): Promise<string> => {
  const response = await apiClient.get("http://localhost:3000/api/auth/token");
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  apiClient.defaults.params = {
    ...apiClient.defaults.params,
    "refreshToken": response.data.refresh_token,
  }
  return response.data.access_token;
}

export const getRefreshToken = async (): Promise<string> => {
  const response = await apiClient.get("http://localhost:3000/api/auth/token");
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  apiClient.defaults.params = {
    ...apiClient.defaults.params,
    "refreshToken": response.data.refresh_token,
  }
  console.log("refresh token", response.data.refresh_token)
  return response.data.refresh_token;
}

export const refreshToken = async (): Promise<Object> => {
  const response = await apiClient.get("http://localhost:3000/api/auth/refreshToken");
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  apiClient.defaults.params = {
    ...apiClient.defaults.params,
    "refreshToken": response.data.refresh_token,
  }
  return response.data;
}