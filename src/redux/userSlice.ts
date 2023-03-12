import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

export interface User {
    access_token?: string;
    user: {
        pk: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        description: string;
        speciality: string;
        profile_image: string;
    };
}

const initialState = {
    access_token: "",
    user: {
        pk: 1,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        description: "",
        speciality: "",
        profile_image: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                access_token:
                    action.payload.access_token || state.access_token,
                user: { ...action.payload.user },
            };
        },
    },
});

export const { updateUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
