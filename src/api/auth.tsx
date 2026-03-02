import axios from "axios"

export const refreshAccessToken = async (): Promise<string> => {
  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    grant_type: "client_credentials",
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
  }
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  }
  const response = await axios.post(url, payload, { headers });

  return response.data
}