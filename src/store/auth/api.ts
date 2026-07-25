import { finalStoreApi } from '../initApi';

export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[]; // TODO Role enum
}

export interface JwtResponse {
    token: string;
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
        }),

        // refresh
        refresh: build.mutation<JwtResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),

        // me
        me: build.query<User, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
        }),

        // me/password
    }),
});

export const { useLoginMutation, useRefreshMutation, useLazyMeQuery } = authApi;

export default authApi;
