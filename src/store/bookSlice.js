
// // bookSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch all books
// export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
//   const response = await axios.get('http://localhost:9000/books');
//   return response.data.Data;
// });

// // Fetch book by ID
// export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`http://localhost:9000/books/single/${id}`);
//     console.log('API Response:', response.data); // Log the API response
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch book by ID:', error);
//     return rejectWithValue('Failed to fetch book by ID');
//   }
// });
// const bookSlice = createSlice({
//   name: 'book',
//   initialState: {
//     books: [],
//     bookDetails: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBooks.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBooks.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.books = action.payload;
//       })
//       .addCase(fetchBooks.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchBookById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBookById.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.bookDetails = action.payload;
//       })
//       .addCase(fetchBookById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default bookSlice.reducer;


// bookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const response = await axios.get("http://localhost:9000/books");
    return response.data.Data;
  }
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9000/books/single/${id}`);
      console.log('API Response:', response.data); // Log the API response
      return response.data;
    } catch (error) {
      console.error('Failed to fetch book by ID:', error);
      return rejectWithValue('Failed to fetch book by ID');
    }
  }
);

const initialState = {
  books: [],
  bookDetails: null,
  status: "idle",
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookDetails = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;













