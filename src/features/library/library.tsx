import { createSlice } from "@reduxjs/toolkit"

export interface LibraryState {
  nextPageOfPlaylistsUrl: string,
}

const initialState: LibraryState = {
  nextPageOfPlaylistsUrl: "",
}

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setNextPageOfPlaylistsUrl: (state, action) => {
      state.nextPageOfPlaylistsUrl = action.payload;
    }
  }
})

export const { setNextPageOfPlaylistsUrl } = librarySlice.actions;

export default librarySlice.reducer;