import { useEffect } from 'react';

import api from '../api/auth/api';
import { clearAccessToken } from '../api/auth/authSlice';
import { useAppDispatch, type AppDispatch } from '../api/store';

let authInitialization: Promise<unknown> | null = null;

export const initializeAuth = (dispatch: AppDispatch) => {
    if (!authInitialization) {
        authInitialization = dispatch(api.endpoints.refresh.initiate())
            .unwrap()
            .catch(() => {
                dispatch(clearAccessToken());
            });
    }

    return authInitialization;
};

export const useInitAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        initializeAuth(dispatch);
    }, [dispatch]);
};
