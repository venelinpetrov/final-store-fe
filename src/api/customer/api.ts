import type { Id } from '../../types/common/identifier';
import type { CustomerAddress } from '../../types/customer';

import { Tag } from '../cacheTags';
import { finalStoreApi } from '../initApi';

const customerApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        getAddresses: build.query<CustomerAddress[], { customerId: Id }>({
            query: ({ customerId }) => ({
                url: `/customers/${customerId}/addresses`,
                method: 'GET',
            }),
            providesTags: [{ type: Tag.ME }],
        }),

        // me/password
    }),
});

export const { useGetAddressesQuery } = customerApi;

export default customerApi;
