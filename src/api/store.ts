import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './auth/authSlice';
import { finalStoreApi } from './initApi';
import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
    reducer: {
        [finalStoreApi.reducerPath]: finalStoreApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(finalStoreApi.middleware, errorMiddleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = (
    dispatch: AppDispatch,
    getState: () => RootState,
) => ReturnType;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
