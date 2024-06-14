import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userSlice } from "./globalSlice";
import { authApi } from "../api/auth.api";

export const store = configureStore({
  reducer: {
    // add any feature reducer here]
    [authApi.reducerPath]: authApi.reducer,
    auth: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
