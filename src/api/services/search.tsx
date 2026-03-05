import apiClient from "../client";

export const search = async (searchTerm: string) => {
  const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=album,artist,playlist,track,show,episode,audiobook`;
  const res = await apiClient.get(url);
  return res.data;
}

export const getAlbumsBy = async (artistId: string) => {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
  const res = await apiClient.get(url);
  return res.data;
}

export const getTracksInAlbum = async (albumId: string) => {
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
  const res = await apiClient.get(url);
  return res.data;
}