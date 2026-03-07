import APIClient from "../client";

export const getToken = async (): Promise<string> => {
  const response = await APIClient.get("http://localhost:3000/api/auth/token");
  APIClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  APIClient.defaults.params = {
    ...APIClient.defaults.params,
    "refreshToken": response.data.refresh_token,
  }
  return response.data.access_token;
}

export const getRefreshToken = async (): Promise<string> => {
  const response = await APIClient.get("http://localhost:3000/api/auth/token");
  APIClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  APIClient.defaults.params = {
    ...APIClient.defaults.params,
    "refreshToken": response.data.refresh_token,
  }
  console.log("refresh token", response.data.refresh_token)
  return response.data.refresh_token;
}

export const refreshToken = async (): Promise<{access_token: string, refresh_token: string}> => {
  const response = await APIClient.get("http://localhost:3000/api/auth/refreshToken");
  APIClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  APIClient.defaults.params = {
    ...APIClient.defaults.params,
    "refreshToken": response.data.refresh_token,
  }
  return response.data;
}