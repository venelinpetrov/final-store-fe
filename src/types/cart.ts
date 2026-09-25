import type { Instant } from './common/datetime';
import type { UUID } from './common/identifier';
import type { Product, ProductVariant } from './product';

/**
 * Shopping cart with cart items, pricing details and estimated tax
 */
export interface Cart {
    cartId: UUID;
    sessionId: UUID;
    cartItems: CartItem[];
    createdAt: Instant;
    updatedAt: Instant;
    priceSummary: {
        subtotal: number;
        discountAmount: number;
        shippingCost: number;
        taxResult: TaxResult | null;
        total: number;
    };
}

/**
 * Result of a tax calculation operation
 * Contains both the total tax amount and detailed breakdown
 */
export interface TaxResult {
    taxAmount: number;
    breakdown: TaxBreakdown;
}

/**
 * Represents the complete tax breakdown for an order
 * Matches the structure returned by Stripe Tax API
 */
export interface TaxBreakdown {
    /**
     * Total tax amount across all jurisdictions
     */
    total: number;
    /**
     * List of individual tax components (state, local, etc.)
     */
    breakdown: TaxComponent[];
}

/**
 * Represents a single tax component (e.g., state tax, local tax, VAT)
 * from a specific jurisdiction
 */
export interface TaxComponent {
    /**
     * Type of tax (e.g., "state_sales_tax", "local_sales_tax", "vat", "gst")
     */
    type: string;

    /**
     * Jurisdiction name (e.g., "California", "Los Angeles", "United Kingdom")
     */
    jurisdiction: string;

    /**
     * Tax rate as decimal (e.g., 0.0725 for 7.25%)
     */
    rate: number;

    /**
     * Amount this tax applies to (taxable amount)
     */
    taxableAmount: number;

    /**
     * Calculated tax amount for this component
     */
    amount: number;
}

/**
 * A single cart item
 */
export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
    createdAt: Instant;
    updatedAt: Instant;
}

/**
 * Cart update
 */
export interface CartUpdate {
    quantity: number;
}
