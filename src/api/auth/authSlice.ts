import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import authApi from './api';

/**
 * Auth state
 *
 * string - authenticated
 *
 * null - annonymous
 *
 * undefined - not determined yet (initial state)
 */
type AuthState = {
    accessToken: string | null | undefined;
};

const slice = createSlice({
    name: 'auth',
    initialState: { accessToken: undefined } as AuthState,
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
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
        });
        builder.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken;
        });
    },
});

export const { setAccessToken, clearAccessToken } = slice.actions;

export default slice.reducer;
