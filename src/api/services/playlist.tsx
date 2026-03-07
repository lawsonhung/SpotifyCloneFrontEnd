import SpotifyAPIClient from "../spotifyClient";

export const getPlaylists = async () => {
  const url = "/me/playlists?limit=10";
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}