import { createSlice } from "@reduxjs/toolkit";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";

interface MainDisplayItemInterface {
  value: {},
  albumName: string,
  tracks: Track[],
  nextPageUrl: string,
  albums: Album[],
}

export type MainDisplayItemState = Track | Album | Artist | Playlist | Show | Episode | Audiobook | MainDisplayItemInterface;

const initialState: MainDisplayItemState = {
  value: {},
  albumName: "",
  tracks: [],
  nextPageUrl: "",
  albums: [],
};

export const mainDisplayItemSlice = createSlice({
  name: "mainDisplayItem",
  initialState,
  reducers: {
    setMainDisplayItem: (state, action) => {
      state.value = action.payload;
    },
    setAlbumName: (state, action) => {
      state.albumName = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setNextPageUrl: (state, action) => {
      state.nextPageUrl = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
  }
})

export const { setMainDisplayItem, setAlbumName, setTracks, setNextPageUrl, setAlbums } = mainDisplayItemSlice.actions;

export default mainDisplayItemSlice.reducer;