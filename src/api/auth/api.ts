import type { User } from '../../types/user';

import { Tag } from '../cacheTags';
import { finalStoreApi } from '../initApi';

export interface JwtResponse {
    accessToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

const authApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<JwtResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: [{ type: Tag.ME }],
        }),

        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        refresh: build.mutation<JwtResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),

        me: build.query<User, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
            providesTags: [{ type: Tag.ME }],
        }),

        // me/password
    }),
});

export const { useLoginMutation, useRefreshMutation, useMeQuery, useLazyMeQuery } = authApi;

export default authApi;
