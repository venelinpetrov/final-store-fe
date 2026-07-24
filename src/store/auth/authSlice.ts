import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import type { RootState } from '../store';
import type { User, JwtResponse } from './api';

type AuthState = {
    token: string | null;
    user: User | null;
};

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
        setCredentials: (state, { payload: { token } }: PayloadAction<JwtResponse>) => {
            state.token = token;
            console.log(jwtDecode(token));
        },
    },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
