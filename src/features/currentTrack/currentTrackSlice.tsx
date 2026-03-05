import { createSlice } from "@reduxjs/toolkit";
import type { Track } from "@spotify/web-api-ts-sdk";

export interface CurrentTrackState {
  value: Track | {},
}

const initialState: CurrentTrackState = {
  value: {},
};

export const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
        state.value = action.payload;
    }
  }
})

export const { setCurrentTrack } = currentTrackSlice.actions;

export default currentTrackSlice.reducer;