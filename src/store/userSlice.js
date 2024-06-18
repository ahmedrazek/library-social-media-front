import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const res = await axios.get("/users/profile");
    console.log(res.data)
    return res.data;
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
