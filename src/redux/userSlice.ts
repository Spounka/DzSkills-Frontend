import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

export interface User {
    access_token: string;
    profile_picture: string;
    user: {
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        description: string;
        speciality: string;
    };
}

const initialState = {
    access_token: "",
    profile_picture: "",
    user: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        description: "",
        speciality: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                profile_picture: action.payload.profile_picture,
                access_token: action.payload.access_token,
                user: { ...action.payload.user },
            };
        },
    },
});

export const { updateUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
