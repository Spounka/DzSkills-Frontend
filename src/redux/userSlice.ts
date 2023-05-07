import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../stores/store";
import {User} from "../types/user";

export interface LoginUser {
    access_token?: string;
    refresh_token?: string;
    user: User;
}

const initialState = {
    access_token: "",
    refresh_token: "",
    user: {
        pk: 1,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        profile_image: "",
        date_joined: "",
        description: "",
        speciality: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<LoginUser>) => {
            return {
                ...state,
                access_token:
                    action.payload.access_token || state.access_token,
                refresh_token:
                    action.payload.refresh_token || state.refresh_token,
                user: {...action.payload.user},
            };
        },
    },
});

export const {updateUser} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
