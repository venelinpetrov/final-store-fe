import type { Instant } from './common/datetime';
import type { UUID } from './common/identifier';
import type { ProductVariant } from './product';

export interface Cart {
    cartId: UUID;
    sessionId: UUID;
    cartItems: CartItem[];
    createdAt: Instant;
    updatedAt: Instant;
}

export interface CartItem {
    variant: ProductVariant;
    quantity: number;
    createdAt: Instant;
    updatedAt: Instant;
}

export interface CartItemAdd {
    variantId: number;
}

export interface CartItemUpdate {
    quantity: number;
}
