import type { Cart, CartItemAdd, CartItemUpdate } from '../../types/cart';
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

        addCartItem: build.mutation<void, { cartId: UUID; body: CartItemAdd }>({
            query: ({ cartId, body }) => ({
                url: `/carts/${cartId}/items`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (_red, err, { cartId }) =>
                err ? [] : [{ type: Tag.CART, id: cartId }, { type: Tag.CART }],
        }),

        updateCart: build.mutation<void, { cartId: UUID; variantId: Id; body: CartItemUpdate }>({
            query: ({ cartId, variantId, body }) => ({
                url: `/carts/${cartId}/items/${variantId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_red, err, { cartId }) =>
                err ? [] : [{ type: Tag.CART, id: cartId }],
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
    useAddCartItemMutation,
    useUpdateCartMutation,
    useDeleteCartItemMutation,
    useClearCartMutation,
    useAssociateCartMutation,
} = cartApi;

export default cartApi;
