import SpotifyAPIClient from "../spotifyClient";

export const getMyInfo = async () => {
  const url = "/me";
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}

export const getMyTopArtists = async () => {
  const url = "/me/top/artists?limit=10";
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}