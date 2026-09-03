import { useCallback } from 'react';

import type { Id } from '../../../types/common/identifier';

import { useUpdateCartMutation, useCreateCartMutation } from '../../../api/cart/api';

export const useAddToCart = () => {
    const [getOrCreateCart, { isLoading: isGetOrCreateCartLoading }] = useCreateCartMutation();
    const [updateCart, { isLoading: isUpdateCartLoading }] = useUpdateCartMutation();

    const handleAddToCart = useCallback(
        async ({ quantity, variantId }: { quantity: number; variantId?: Id }) => {
            if (!variantId) {
                console.error('Invalid purchase state');
                throw new Error('Invalid purchase state');
            }

            await getOrCreateCart().unwrap();

            await updateCart({
                variantId: variantId,
                body: {
                    quantity,
                },
            });
        },
        [getOrCreateCart, updateCart],
    );

    return {
        handleAddToCart,
        isLoading: isGetOrCreateCartLoading || isUpdateCartLoading,
    };
};
