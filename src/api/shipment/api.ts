import type { Carrier } from '../../types/carrier';

import { finalStoreApi } from '../initApi';

const authApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        fetchCarriers: build.query<Carrier[], void>({
            query: () => ({
                url: '/carriers',
                method: 'GET',
            }),
        }),
    }),
});

export const { useFetchCarriersQuery } = authApi;

export default authApi;
