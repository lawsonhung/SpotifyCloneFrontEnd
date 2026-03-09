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

export const createPlaylist = async (name: string) => {
  const url = `/me/playlists`;
  const payload = { "name": name };
  const res = await SpotifyAPIClient.post(url, payload);
  return res.data;
}

export const addItemsToPlaylist = async (playlistId: string, uriArray: string[]) => {
  const url = `/playlists/${playlistId}/items`;
  const payload = {"uris": uriArray};
  const res = await SpotifyAPIClient.post(url, payload);
  return res.data;
}