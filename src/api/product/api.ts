import type { Pageable } from '../../types/common/pageable';
import type { Product, ProductSummary, ProductVariant } from '../../types/product';

import { LIST, Tag } from '../cacheTags';
import { finalStoreApi } from '../initApi';

const productsApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        fetchProduct: build.query<Product, { productId: number }>({
            query: ({ productId }) => ({
                url: `/products/${productId}`,
                method: 'GET',
            }),
            providesTags: (_res, _err, { productId }) => [{ type: Tag.PRODUCT, id: productId }],
        }),
        fetchProducts: build.query<
            Pageable<ProductSummary>,
            { brandId?: number; page?: number; size?: number }
        >({
            query: (params) => ({
                url: '/products',
                method: 'GET',
                params,
            }),
            providesTags: () => [{ type: Tag.PRODUCT, id: LIST }],
        }),
        fetchVariantsForProduct: build.query<ProductVariant[], { productId: number }>({
            query: ({ productId }) => ({
                url: `/products/${productId}/variants`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useFetchProductQuery,
    useFetchProductsQuery,
    useLazyFetchProductsQuery,
    useFetchVariantsForProductQuery,
} = productsApi;

export default productsApi;
