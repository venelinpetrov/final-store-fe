import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import type { RootState } from './store';

import authApi from './auth/api';
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

const baseQueryWithReauth: BaseQueryFn<any, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const url = typeof args === 'string' ? args : args.url;

        if (url?.includes('auth/refresh')) {
            return result;
        }

        try {
            const res = await api.dispatch(authApi.endpoints.refresh.initiate()).unwrap();
            api.dispatch(setAccessToken({ accessToken: res.accessToken }));

            result = await baseQuery(args, api, extraOptions);
        } catch {
            api.dispatch(clearAccessToken());
        }
    }

    return result;
};

export const finalStoreApi = createApi({
    reducerPath: 'finalStoreApi',
    tagTypes: Object.values(Tag),
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}) as Record<string, any>,
});
