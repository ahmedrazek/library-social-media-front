import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import bookSlice from "./bookSlice";
// import favoritesSlice from "./favoritesSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    category:categorySlice,
    book: bookSlice,
    // favorites:favoritesSlice,
  },
});
 