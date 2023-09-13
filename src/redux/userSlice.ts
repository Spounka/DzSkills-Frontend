import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultUser } from '../globals/default-values';
import { RootState } from '../stores/store';
import { User } from '../types/user';

export interface LoginUser {
    access?: string;
    refresh?: string;
    user: User;
}

const initialState = {
    ...defaultUser,
} as LoginUser;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<LoginUser>) => {
            return {
                ...state,
                user: action.payload.user,
            };
        },
        removeUser: (state) => {
            return { ...state, ...defaultUser };
        },
    },
});

export const { updateUser, removeUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
