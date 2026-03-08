import SpotifyAPIClient from "../spotifyClient";

export const search = async (searchTerm: string) => {
  // const url = `/search?q=${searchTerm}&type=album,artist,playlist,track,show,episode,audiobook`;
  const url = `/search?q=${searchTerm}&type=album,artist,playlist,track`;
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}

export const getAlbumsBy = async (artistId: string) => {
  console.log("⏳⏳ getting albums by artist");
  const url = `/artists/${artistId}/albums?limit=5`;
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}

export const getTracksInAlbum = async (albumId: string) => {
  console.log("⏳⏳ getting tracks in album");
  const url = `/albums/${albumId}/tracks?limit=5`;
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}

export const getTrack = async (trackId: string) => {
  const url = `/tracks/${trackId}`;
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}

export const getNextPageOfItems = async (url: string) => {
  const res = await SpotifyAPIClient.get(url);
  return res.data;
}