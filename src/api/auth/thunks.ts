import type { AppThunk } from '../store';

import api from './api';
import { clearAccessToken } from './authSlice';

export const logoutUser = (): AppThunk => async (dispatch) => {
    try {
        await dispatch(api.endpoints.logout.initiate()).unwrap();
    } finally {
        dispatch(clearAccessToken());
        dispatch(api.util.resetApiState());
    }
};
