import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from './store';

export const finalStoreApi = createApi({
    reducerPath: 'finalStoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }), // TODO: env var
    endpoints: () => ({}) as Record<string, any>,
});
