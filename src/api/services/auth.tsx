import type { AxiosInstance, AxiosResponse } from "axios";
import APIClient from "../client";
import SpotifyAPIClient from "../spotifyClient";

const setTokenHeadersFor = (client: AxiosInstance, res: AxiosResponse) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
  client.defaults.params = {
    ...client.defaults.params,
    "refreshToken": res.data.refresh_token,
  }
}

export const getToken = async (): Promise<string> => {
  const response = await APIClient.get("/auth/token");
  // APIClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  // APIClient.defaults.params = {
  //   ...APIClient.defaults.params,
  //   "refreshToken": response.data.refresh_token,
  // }

  setTokenHeadersFor(APIClient, response);
  setTokenHeadersFor(SpotifyAPIClient, response);

  return response.data.access_token;
}

export const getRefreshToken = async (): Promise<string> => {
  const response = await APIClient.get("/auth/token");
  // APIClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  // APIClient.defaults.params = {
  //   ...APIClient.defaults.params,
  //   "refreshToken": response.data.refresh_token,
  // }
  setTokenHeadersFor(APIClient, response);
  setTokenHeadersFor(SpotifyAPIClient, response);
  console.log("refresh token", response.data.refresh_token)
  return response.data.refresh_token;
}

export const refreshToken = async (): Promise<{access_token: string, refresh_token: string}> => {
  const response = await APIClient.get("/auth/refreshToken");
  // APIClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  // APIClient.defaults.params = {
  //   ...APIClient.defaults.params,
  //   "refreshToken": response.data.refresh_token,
  // }
  setTokenHeadersFor(APIClient, response);
  setTokenHeadersFor(SpotifyAPIClient, response);
  return response.data;
}