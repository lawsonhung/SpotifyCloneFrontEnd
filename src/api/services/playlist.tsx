import SpotifyAPIClient from "../spotifyClient";

export const getPlaylists = async () => {
  const url = "/me/playlists?limit=10";
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}

export const getPlaylistItems = async (playlistId: string) => {
  const url = `/playlists/${playlistId}/items?limit=20`;
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}