import axios from "axios";
import apiClient from "../client";

export const getToken = async (): Promise<string> => {
  const response = await apiClient.get("http://localhost:3000/api/auth/token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  console.log("new token is", response.data.access_token);
  return response.data.access_token;
}