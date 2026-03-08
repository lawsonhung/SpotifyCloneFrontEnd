import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import currentTrackReducer from "../features/currentTrack/currentTrackSlice";
import mainDisplayItemReducer from "../features/mainDisplayItem/mainDisplayItem";
import userDataReducer from "../features/userData/userDataSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currentTrack: currentTrackReducer,
    mainDisplayItem: mainDisplayItemReducer,
    userData: userDataReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch