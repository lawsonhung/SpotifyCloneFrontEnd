import { createSlice } from "@reduxjs/toolkit"
import type { Playlist } from "@spotify/web-api-ts-sdk";

export interface LibraryState {
  playlists: Playlist[],
}

const initialState: LibraryState = {
  playlists: [],
}

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    }
  }
})

export const { setPlaylists } = librarySlice.actions;

export default librarySlice.reducer;