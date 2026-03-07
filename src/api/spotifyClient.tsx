import axios, { AxiosError } from "axios";
import axiosThrottle from "axios-request-throttle";

const API_BASE_URL = "https://api.spotify.com/v1";

const SpotifyAPIClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosThrottle.use(SpotifyAPIClient, { requestsPerSecond: 2 });

SpotifyAPIClient.interceptors.request.use(config => {
  return config;
})

SpotifyAPIClient.interceptors.response.use(
  res => res,
  (error: AxiosError) => {

    switch (error.response?.status) {
      case 401:
        // Remove token
        // Redirect to login page
        break;

      case 429:
        console.error(`Error ${error.response.status} - Retry-After ${error.response?.headers["Retry-After"]} seconds`)
        break;

      default:
        break;
    }

    return Promise.reject(error.response?.data || error.message);
  }
)

export default SpotifyAPIClient;