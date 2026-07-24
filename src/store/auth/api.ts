import { finalStoreApi } from '../initApi';

export interface User {
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

        // me/password
    }),
});

export const { useLoginMutation, useRefreshMutation } = authApi;

export default authApi;
