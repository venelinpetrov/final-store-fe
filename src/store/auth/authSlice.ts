import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import type { RootState } from '../store';
import type { User } from './api';

type AuthState = {
    token: string | null;
    user: User | null;
};

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
        setAccessToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
            state.token = token;
            console.log(jwtDecode(token));
        },
        clearAccessToken: (state) => {
            state.token = null;
        },
    },
});

export const { setAccessToken, clearAccessToken } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
