import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../store/slices/JobSlice";
import companiesReducer from "../store/slices/CompanySlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
