import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean,
  message: string | null,
}

const initialState: SnackbarState = {
  open: false,
  message: null,
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setSnackbarMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
  }
})

export const {setSnackbarOpen, setSnackbarMessage} = snackbarSlice.actions;

export default snackbarSlice.reducer;