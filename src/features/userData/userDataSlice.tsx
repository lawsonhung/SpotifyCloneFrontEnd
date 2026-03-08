import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@spotify/web-api-ts-sdk";

export interface UserDataState {
  value: User | null,
}

const initialState: UserDataState = {
  value: null,
}

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;