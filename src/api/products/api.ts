import type { Pageable } from '../../types/common/pageable';
import type { Product } from '../../types/product';

import { finalStoreApi } from '../initApi';

const productsApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        fetchProducts: build.query<Pageable<Product>, void>({
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
        }),
    }),
});

export const { useFetchProductsQuery, useLazyFetchProductsQuery } = productsApi;

export default productsApi;
