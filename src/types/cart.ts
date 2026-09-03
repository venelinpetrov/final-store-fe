import type { Instant } from './common/datetime';
import type { UUID } from './common/identifier';
import type { Product, ProductVariant } from './product';

export interface Cart {
    cartId: UUID;
    sessionId: UUID;
    cartItems: CartItem[];
    createdAt: Instant;
    updatedAt: Instant;
}

export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
    createdAt: Instant;
    updatedAt: Instant;
}

export interface CartUpdate {
    quantity: number;
}
