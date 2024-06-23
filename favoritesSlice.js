// store/favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFavoriteBooks = createAsyncThunk(
  'favorites/fetchFavoriteBooks',
  async (userId) => {
    const response = await axios.get(`http://localhost:9000/books/${userId}`);
    return response.data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoriteBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchFavoriteBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default favoritesSlice.reducer;
