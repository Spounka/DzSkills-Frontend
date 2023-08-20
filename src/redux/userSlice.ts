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
    ...defaultUser
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<LoginUser>) => {
            return {
                ...state,
                access: action.payload.access || state.access,
                refresh: action.payload.refresh || state.refresh,
                user: { ...action.payload.user },
            };
        },
        removeUser: () => {
            return { ...defaultUser };
        },
    },
});

export const { updateUser, removeUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
