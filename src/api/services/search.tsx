import axios from "axios";
import apiClient from "../client";

export const search = async (searchTerm: string) => {
  const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=album,artist,playlist,track,show,episode,audiobook`;
  console.log("searching with token", axios.defaults.headers.common["Authorization"])
  const res = await apiClient.get(url);
  console.log("Search response", res.data)
}