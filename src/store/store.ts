import { configureStore } from "@reduxjs/toolkit";
import { finalStoreApi } from "./initApi";

export const store = configureStore({
    reducer: {
        [finalStoreApi.reducerPath]: finalStoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(finalStoreApi.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
