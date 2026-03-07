import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://api.spotify.com/v1";

const SpotifyAPIClient = axios.create({
  baseURL: API_BASE_URL,
  headers:{
    "Content-Type": "application/json",
  },
});

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
        console.error(`Error ${error.response.status} - Retry-after ${error.response?.headers["Retry-After"]} seconds`)
        break;
    
      default:
        break;
    }
    
    return Promise.reject(error.response?.data || error.message);
  }
)

export default SpotifyAPIClient;