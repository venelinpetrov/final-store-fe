import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import { finalStoreApi } from './initApi';

export const store = configureStore({
    reducer: {
        [finalStoreApi.reducerPath]: finalStoreApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(finalStoreApi.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
