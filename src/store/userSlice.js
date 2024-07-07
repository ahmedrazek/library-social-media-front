import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const res = await axios.get("users/profile");
    return res.data;
  }
);
const initialState = {
  user: null,
  userId: null,
  status: "idle",
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload._id;
    },
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.status = "idle";
    },
    setNewFollowing: (state, action) => {
      state.user.following.push(action.payload);
      console.log(action.payload, "is followed");
    },
    setUnFollow: (state, action) => {
      state.user.following = state.user.following.filter(
        (follower) => follower._id !== action.payload._id
      );
    },
    addSavePost: (state, action) => {
      state.user.savedPosts.push(action.payload);
    },
    removeSavedPost: (state, action) => {
      state.user.savedPosts = state.user.savedPosts.filter(
        (post) => post !== action.payload
      );
    },
    addFavBook: (state, action) => {
      state.user.favouriteBooks.push(action.payload);
    },
    removeFavBook: (state, action) => {
      state.user.favouriteBooks = state.user.favouriteBooks.filter(
        (book) => book._id !== action.payload
      );
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
export const {
  setUser,
  logout,
  setNewFollowing,
  setUnFollow,
  addSavePost,
  removeSavedPost,
  addFavBook,
  removeFavBook,
} = userSlice.actions;
export default userSlice.reducer;
