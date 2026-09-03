import type { AppThunk } from '../store';

import authApi from './api';
import { clearAccessToken, setAccessToken, setInitialized } from './authSlice';

export const logoutUser = (): AppThunk => async (dispatch) => {
    try {
        await dispatch(authApi.endpoints.logout.initiate()).unwrap();
    } finally {
        dispatch(clearAccessToken());
        dispatch(authApi.util.resetApiState());
    }
};

export const initializeAuth = (): AppThunk => async (dispatch) => {
    try {
        const result = await dispatch(authApi.endpoints.refresh.initiate()).unwrap();

        dispatch(
            setAccessToken({
                accessToken: result.accessToken,
            }),
        );
    } catch {
        dispatch(clearAccessToken());
    } finally {
        dispatch(setInitialized());
    }
};
