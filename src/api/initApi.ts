import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import type { JwtResponse } from '../types/auth';
import type { RootState } from './store';

import { clearAccessToken, setAccessToken } from './auth/authSlice';
import { Tag } from './cacheTags';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api', // TODO: env var
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;

        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }

        return headers;
    },
    credentials: 'include',
});

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<any, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status !== 401) {
        return result;
    }

    if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
            const refreshResult = await baseQuery(
                {
                    url: '/auth/refresh',
                    method: 'POST',
                },
                api,
                extraOptions,
            );
            if (refreshResult.data) {
                const { accessToken } = refreshResult.data as JwtResponse;

                api.dispatch(setAccessToken({ accessToken }));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(clearAccessToken());
            }
        } finally {
            release();
        }
    } else {
        // Someone else is already refreshing.
        await mutex.waitForUnlock();

        // The other request should have updated the access token.
        // Retry using the new token.
        result = await baseQuery(args, api, extraOptions);
    }

    return result;
};

export const finalStoreApi = createApi({
    reducerPath: 'finalStoreApi',
    tagTypes: Object.values(Tag),
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}) as Record<string, any>,
});
