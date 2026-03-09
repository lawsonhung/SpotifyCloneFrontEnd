import { createSlice } from "@reduxjs/toolkit"
import type { Playlist } from "@spotify/web-api-ts-sdk";

export interface LibraryState {
  nextPageOfPlaylistsUrl: string,
  playlists: Playlist[],
}

const initialState: LibraryState = {
  nextPageOfPlaylistsUrl: "",
  playlists: [],
}

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setNextPageOfPlaylistsUrl: (state, action) => {
      state.nextPageOfPlaylistsUrl = action.payload;
    },
    setPlaylists: (state, action) => {
      console.log("playlists", action.payload)
      state.playlists = action.payload;
    }
  }
})

export const { setNextPageOfPlaylistsUrl, setPlaylists } = librarySlice.actions;

export default librarySlice.reducer;