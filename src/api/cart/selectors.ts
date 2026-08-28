import type { Cart } from '../../types/cart';

export const selectCartItemCount = (cart: Cart | undefined) => cart?.cartItems.length ?? 0;
