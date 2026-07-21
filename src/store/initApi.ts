import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const finalStoreApi = createApi({
    reducerPath: 'finalStoreApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }), // TODO: env var
    endpoints: () => ({}) as Record<string, any>,
});
