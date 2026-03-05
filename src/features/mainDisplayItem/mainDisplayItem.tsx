import { createSlice } from "@reduxjs/toolkit";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";

export type MainDisplayItemState = Track | Album | Artist | Playlist | Show | Episode | Audiobook | {value: {}};

const initialState: MainDisplayItemState = {
  value: {}
};

export const mainDisplayItemSlice = createSlice({
  name: "mainDisplayItem",
  initialState,
  reducers: {
    setMainDisplayItem: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { setMainDisplayItem } = mainDisplayItemSlice.actions;

export default mainDisplayItemSlice.reducer;