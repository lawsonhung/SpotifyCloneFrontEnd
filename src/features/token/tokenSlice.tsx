import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  value: string | null,
}

const initialState: TokenState = {
  value: null,
}

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      console.log("token in redux", state.value)
    }
  }
})

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;