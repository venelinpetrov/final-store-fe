export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE', // Percentage off (e.g., 10% off)
    FIXED = 'FIXED', // Fixed amount off (e.g., $5 off)
    BUY_X_GET_Y = 'BUY_X_GET_Y', // Buy X get Y discount (e.g., Buy 2 get 10% off)
}

export interface Discount {
    discountType: DiscountType;
    value: number; // Percentage (0-100) or Fixed amount depending on discountType
    validUntil: string;
}
