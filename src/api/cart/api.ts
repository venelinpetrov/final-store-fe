import type { Cart, CartUpdate } from '../../types/cart';
import type { Id, UUID } from '../../types/common/identifier';

import { Tag } from '../cacheTags';
import { finalStoreApi } from '../initApi';

const cartApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        getMyCart: build.query<Cart, void>({
            query: () => ({
                url: '/carts/my-cart',
                method: 'GET',
            }),
            providesTags: [Tag.CART],
        }),

        createCart: build.mutation<Cart, void>({
            query: () => ({
                url: '/carts',
                method: 'POST',
            }),
            invalidatesTags: (_red, err) => (err ? [] : [{ type: Tag.CART }]),
        }),

        updateCart: build.mutation<void, { variantId: Id; body: CartUpdate }>({
            query: ({ variantId, body }) => ({
                url: `/carts/items/${variantId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_red, err) => (err ? [] : [{ type: Tag.CART }]),
        }),

        deleteCartItem: build.mutation<void, { cartId: UUID; variantId: Id }>({
            query: ({ cartId, variantId }) => ({
                url: `/carts/${cartId}/items/${variantId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_red, err, { cartId }) =>
                err ? [] : [{ type: Tag.CART, id: cartId }],
        }),

        clearCart: build.mutation<void, { cartId: UUID }>({
            query: ({ cartId }) => ({
                url: `/carts/${cartId}/items`,
                method: 'DELETE',
            }),
            invalidatesTags: (_red, err, { cartId }) =>
                err ? [] : [{ type: Tag.CART, id: cartId }],
        }),

        associateCart: build.mutation<void, void>({
            query: () => ({
                url: `/carts/associate`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetMyCartQuery,
    useGetCartByIdQuery,
    useGetCartBySessionIdQuery,
    useCreateCartMutation,
    useUpdateCartMutation,
    useDeleteCartItemMutation,
    useClearCartMutation,
    useAssociateCartMutation,
} = cartApi;

export default cartApi;
