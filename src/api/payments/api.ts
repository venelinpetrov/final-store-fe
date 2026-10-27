import type { CustomerPaymentMethod } from '../../types/payments';

import { finalStoreApi } from '../initApi';

const paymentApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        getPaymentMethods: build.query<CustomerPaymentMethod[], void>({
            query: () => ({
                url: '/customer-payment-methods',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetPaymentMethodsQuery } = paymentApi;

export default paymentApi;
