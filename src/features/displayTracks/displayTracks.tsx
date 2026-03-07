import { createSlice } from "@reduxjs/toolkit";
import type { Track } from "@spotify/web-api-ts-sdk";

const initialState = {
  value: [],
};

export const displayTracksSlice = createSlice({
  name: "displayTracks",
  initialState,
  reducers: {
    setDisplayTracks: (state, action) => {
      state.value = action.payload;
      console.log("setDisplayTracks redux state", state)
    }
  }
})

export const {setDisplayTracks} = displayTracksSlice.actions;

export default displayTracksSlice.reducer;