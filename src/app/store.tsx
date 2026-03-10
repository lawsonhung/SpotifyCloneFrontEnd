import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import currentTrackReducer from "../features/currentTrack/currentTrackSlice";
import mainDisplayItemReducer from "../features/mainDisplayItem/mainDisplayItem";
import userDataReducer from "../features/userData/userDataSlice";
import libraryReducer from "../features/library/library";
import snackbarReducer from "../features/snackbar/snackbar";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currentTrack: currentTrackReducer,
    mainDisplayItem: mainDisplayItemReducer,
    userData: userDataReducer,
    library: libraryReducer,
    snackbar: snackbarReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch