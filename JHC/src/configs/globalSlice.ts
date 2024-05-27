import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interface";

interface IInitialState {
  isAuthenticated : boolean;
  user:IUser | null
}
const initialState: IInitialState = {
    isAuthenticated: true,
    user: null
}

export const userSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginUser:(state,action) => {
            state.user = action.payload
            state.isAuthenticated = true
        }
    }
})


export const { loginUser } = userSlice.actions;
export default userSlice.reducer;