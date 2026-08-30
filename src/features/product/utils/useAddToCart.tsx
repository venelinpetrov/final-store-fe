import { useCallback } from 'react';

import type { Id } from '../../../types/common/identifier';

import { useAddCartItemMutation, useCreateCartMutation } from '../../../api/cart/api';

export const useAddToCart = () => {
    const [getOrCreateCart, { isLoading: isGetOrCreateCartLoading }] = useCreateCartMutation();
    const [addCartItem, { isLoading: isAddCartItemLoading }] = useAddCartItemMutation();

    const handleAddToCart = useCallback(
        async ({ quantity, variantId }: { quantity: number; variantId?: Id }) => {
            const cart = await getOrCreateCart().unwrap();

            if (!variantId) {
                console.error('Invalid purchase state');
                throw new Error('Invalid purchase state');
            }

            await addCartItem({
                cartId: cart.cartId,
                body: {
                    variantId: variantId,
                    quantity: quantity,
                },
            });
        },
        [getOrCreateCart, addCartItem],
    );

    return {
        handleAddToCart,
        isLoading: isGetOrCreateCartLoading || isAddCartItemLoading,
    };
};
