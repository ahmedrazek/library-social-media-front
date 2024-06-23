// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchFavoriteBooks = createAsyncThunk(
//   'favorites/fetchFavoriteBooks',
//   async (userId, thunkAPI) => {
//     try {
//       const response = await axios.get(`http://localhost:9000/users/${userId}/favoriteBooks`);
//       return response.data.favouriteBooks; // Assuming response contains favouriteBooks array
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );
// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState: {
//     books: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFavoriteBooks.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchFavoriteBooks.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.books = action.payload;
//       })
//       .addCase(fetchFavoriteBooks.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default favoritesSlice.reducer;
