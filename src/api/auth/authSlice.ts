import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import authApi from './api';

type AuthState = {
    accessToken: string | null;
    initialized: boolean;
};

const initialState: AuthState = {
    accessToken: null,
    initialized: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (
            state,
            { payload: { accessToken } }: PayloadAction<{ accessToken: string }>,
        ) => {
            state.accessToken = accessToken;
        },

        clearAccessToken: (state) => {
            state.accessToken = null;
        },

        setInitialized: (state) => {
            state.initialized = true;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
        });
    },
});

export const { setAccessToken, clearAccessToken, setInitialized } = slice.actions;

export default slice.reducer;
