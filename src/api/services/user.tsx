import SpotifyAPIClient from "../spotifyClient";

export const getMyInfo = async () => {
  const url = "/me";
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}