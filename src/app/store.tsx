import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import currentTrackReducer from "../features/currentTrack/currentTrackSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currentTrack: currentTrackReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch