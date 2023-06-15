import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';
import { User } from '../types/user';

export interface LoginUser {
    access?: string;
    refresh?: string;
    user: User;
}

const initialState = {
    access: '',
    refresh: '',
    user: {
        pk: 1,
        username: '',
        email: '',
        email_valid: false,
        first_name: '',
        last_name: '',
        profile_image: '',
        date_joined: '',
        description: '',
        speciality: '',
        nationality: '',
        average_rating: 0,
    },
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
    },
});

export const { updateUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
