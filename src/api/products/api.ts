import type { Pageable } from '../../types/common/pageable';
import type { ProductSummary } from '../../types/product';

import { finalStoreApi } from '../initApi';

const productsApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        fetchProducts: build.query<
            Pageable<ProductSummary>,
            { brandId?: number; page?: number; size?: number }
        >({
            query: (params) => ({
                url: '/products',
                method: 'GET',
                params,
            }),
            providesTags: ['products'],
        }),
    }),
});

export const { useFetchProductsQuery, useLazyFetchProductsQuery } = productsApi;

export default productsApi;
