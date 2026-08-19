import type { Cart, CartItemAdd, CartItemUpdate } from '../../types/cart';
import type { Id, UUID } from '../../types/common/identifier';

import { Tag } from '../cacheTags';
import { finalStoreApi } from '../initApi';

const cartApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        getCartById: build.query<Cart, { cartId: UUID }>({
            query: ({ cartId }) => ({
                url: `/carts/${cartId}`,
                method: 'GET',
            }),
            providesTags: (_res, _err, { cartId }) => [{ type: Tag.CART, id: cartId }],
        }),

        getCartBySessionId: build.query<Cart, { sessionId: UUID }>({
            query: ({ sessionId }) => ({
                url: `/carts/session/${sessionId}`,
                method: 'GET',
            }),
            providesTags: (_res, _err, { sessionId: cartId }) => [{ type: Tag.CART, id: cartId }],
        }),

        createCart: build.mutation<Cart, void>({
            query: () => ({
                url: '/carts',
                method: 'POST',
            }),
        }),

        addCartItem: build.mutation<void, { cartId: UUID; data: CartItemAdd }>({
            query: ({ cartId, data }) => ({
                url: `/carts/${cartId}`,
                method: 'POST',
                data,
            }),
            invalidatesTags: (_red, err, { cartId }) =>
                err ? [] : [{ type: Tag.CART, id: cartId }],
        }),

        updateCart: build.mutation<void, { cartId: UUID; variantId: Id; data: CartItemUpdate }>({
            query: ({ cartId, variantId, data }) => ({
                url: `/carts/${cartId}/items/${variantId}`,
                method: 'PUT',
                data,
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

        associateCart: build.mutation<void, { sessionId: UUID }>({
            query: ({ sessionId }) => ({
                url: `/carts/associate`,
                method: 'POST',
                params: { sessionId },
            }),
        }),
    }),
});

export const {
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
