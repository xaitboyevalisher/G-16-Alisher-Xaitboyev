import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../store/slices/KinoSlice";
import genreReducer from "../store/slices/JanrSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genre: genreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
