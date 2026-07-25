import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import type { RootState } from './store';

import authApi from './auth/api';
import { clearAccessToken, setAccessToken } from './auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api', // TODO: env var
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
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
        if (typeof args === 'object' && 'url' in args && args.url?.includes('auth/refresh')) {
            return result;
        }
        try {
            const res = await api.dispatch(authApi.endpoints.refresh.initiate()).unwrap();
            api.dispatch(setAccessToken({ token: res.token }));

            result = await baseQuery(args, api, extraOptions);
        } catch {
            api.dispatch(clearAccessToken());
        }
    }

    return result;
};

export const finalStoreApi = createApi({
    reducerPath: 'finalStoreApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}) as Record<string, any>,
});
