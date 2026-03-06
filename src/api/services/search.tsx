import apiClient from "../client";

export const search = async (searchTerm: string) => {
  // const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=album,artist,playlist,track,show,episode,audiobook`;
  const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=album,artist,playlist,track`;
  const res = await apiClient.get(url);
  return res.data;
}

export const getAlbumsBy = async (artistId: string) => {
  console.log("getting albums by artist")
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=5`;
  const res = await apiClient.get(url);
  return res.data;
}

export const getTracksInAlbum = async (albumId: string) => {
  console.log("getting tracks in album")
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=5`;
  const res = await apiClient.get(url);
  return res.data;
}

export const getNextPageOfItems = async (url: string) => {
  const res = await apiClient.get(url);
  return res.data;
}