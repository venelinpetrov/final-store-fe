import { finalStoreApi } from '../initApi';

export interface User {
    name: string;
    email: string;
    roles: string[]; // TODO Role enum
}

export interface UserResponse {
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

const authApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;

export default authApi;
