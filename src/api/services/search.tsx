import apiClient from "../client";

export const search = async (searchTerm: string) => {
  const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=album,artist,playlist,track,show,episode,audiobook`;
  const res = await apiClient.get(url);
  return res.data;
}