import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import currentTrackReducer from "../features/currentTrack/currentTrackSlice";
import mainDisplayItemReducer from "../features/mainDisplayItem/mainDisplayItem";
import displayTracksReducer from "../features/displayTracks/displayTracks";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currentTrack: currentTrackReducer,
    mainDisplayItem: mainDisplayItemReducer,
    displayTracks: displayTracksReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch