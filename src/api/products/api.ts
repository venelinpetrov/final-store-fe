import type { Pageable } from '../../types/common/pageable';
import type { ProductSummary, ProductVariant } from '../../types/product';

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
        fetchVariantsForProduct: build.query<ProductVariant[], { productId: number }>({
            query: ({ productId }) => ({
                url: `/products/${productId}/variants`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useFetchProductsQuery, useLazyFetchProductsQuery, useFetchVariantsForProductQuery } =
    productsApi;

export default productsApi;
