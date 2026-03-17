import SpotifyAPIClient from "../spotifyClient";

export const getPlaylists = async () => {
  const url = "/me/playlists?limit=10";
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}

export const getPlaylistItems = async (playlistId: string) => {
  const url = `/playlists/${playlistId}/items?limit=10`;
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
  const payload = { "uris": uriArray };
  const res = await SpotifyAPIClient.post(url, payload);
  return res.data;
}

export const deleteItemFromPlaylist = async (playlistId: string, uriString: string) => {
  const url = `/playlists/${playlistId}/items`;
  const payload = {
    data: {
      "items": [
        {
          "uri": uriString,
        }
      ],
    }
  };
  const res = await SpotifyAPIClient.delete(url, payload);
  return res.data;
}

export const deletePlaylist = async (uri: string) => {
  const url = `/me/library?uris=${uri}`;
  const res = await SpotifyAPIClient.delete(url);
  return res.data;
}