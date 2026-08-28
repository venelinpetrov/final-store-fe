import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import authReducer from './auth/authSlice';
import { finalStoreApi } from './initApi';
import { errorMiddleware } from './middleware/errorMiddleware';
import { listenerMiddleware } from './middleware/listenerMiddleware';

export const store = configureStore({
    reducer: {
        [finalStoreApi.reducerPath]: finalStoreApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            finalStoreApi.middleware,
            listenerMiddleware.middleware,
            errorMiddleware,
        );
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = (
    dispatch: AppDispatch,
    getState: () => RootState,
) => ReturnType;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
