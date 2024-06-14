/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interface";
import Cookies from "js-cookie";

interface IInitialState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const token = Cookies.get("token"); // Adjust the key name as needed
const user = localStorage.getItem("@JHC");
const initialState: IInitialState = {
  isAuthenticated: token ? true : false,
  user: user ? JSON.parse(user!) : null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ data: IUser; access_token: string }>
    ) => {
      state.user = action.payload.data;
      state.isAuthenticated = !!action.payload.access_token;

      Cookies.set("token", action.payload.access_token, { expires: 3 });
      localStorage.setItem("@JHC", JSON.stringify(state.user));
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
