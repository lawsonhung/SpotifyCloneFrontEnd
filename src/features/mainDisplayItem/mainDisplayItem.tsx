import { createSlice } from "@reduxjs/toolkit";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";

interface MainDisplayItemInterface {
  value: {},
  albumName: string,
  tracks: Track[],
  nextPageOfTracksUrl: string,
  albums: Album[],
  nextPageOfAlbumsUrl: string,
}

export type MainDisplayItemState = Track | Album | Artist | Playlist | Show | Episode | Audiobook | MainDisplayItemInterface;

const initialState: MainDisplayItemState = {
  value: {},
  albumName: "",
  tracks: [],
  nextPageOfTracksUrl: "",
  albums: [],
  nextPageOfAlbumsUrl: "",
};

export const mainDisplayItemSlice = createSlice({
  name: "mainDisplayItem",
  initialState,
  reducers: {
    setMainDisplayItem: (state, action) => {
      state.value = action.payload;
      console.log("mainDisplayItem changed", state.value);
    },
    setAlbumName: (state, action) => {
      state.albumName = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setNextPageOfTracksUrl: (state, action) => {
      state.nextPageOfTracksUrl = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setNextPageOfAlbumsUrl: (state, action) => {
      state.nextPageOfAlbumsUrl = action.payload;
    },
  }
})

export const { setMainDisplayItem, setAlbumName, setTracks, setNextPageOfTracksUrl, setAlbums, setNextPageOfAlbumsUrl } = mainDisplayItemSlice.actions;

export default mainDisplayItemSlice.reducer;