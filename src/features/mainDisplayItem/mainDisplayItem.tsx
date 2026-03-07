import { createSlice } from "@reduxjs/toolkit";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";

interface MainDisplayItemInterface {
  value: {},
  nextPageUrl: string,
  tracks: Track[],
}

export type MainDisplayItemState = Track | Album | Artist | Playlist | Show | Episode | Audiobook | MainDisplayItemInterface;

const initialState: MainDisplayItemState = {
  value: {},
  nextPageUrl: "",
  tracks: [],
};

export const mainDisplayItemSlice = createSlice({
  name: "mainDisplayItem",
  initialState,
  reducers: {
    setMainDisplayItem: (state, action) => {
      state.value = action.payload;
    },
    setNextPageUrl: (state, action) => {
      state.nextPageUrl = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    }
  }
})

export const { setMainDisplayItem, setNextPageUrl, setTracks } = mainDisplayItemSlice.actions;

export default mainDisplayItemSlice.reducer;