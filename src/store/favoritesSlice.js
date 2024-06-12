
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:9000';

// Async thunks
export const addToFavorite = createAsyncThunk(
  'favorites/addToFavorite',
  async ({ userId, bookId }, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/books/addFavoriteBook/${userId}/${bookId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const getFavorites = createAsyncThunk(
//   'favorites/getFavorites',
//   async (userId, thunkAPI) => {
//     try {
//       const response = await axios.get(`${baseUrl}/${userId}/favorites`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
        state.status = 'success';
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // .addCase(getFavorites.fulfilled, (state, action) => {
      //   state.favorites = action.payload;
      //   state.status = 'success';
      // })
      // .addCase(getFavorites.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // });
  },
});

export default favoritesSlice.reducer;