import type { Discount } from './discount';

export interface ProductImage {
    imageId: number;
    link: string;
    altText: string;
    isPrimary: boolean;
}

export interface ProductVariantSummary {
    variantId: number;
    unitPrice: number;
    images: ProductImage[];
    discount: Discount;
}

export interface ProductSummary {
    productId: number;
    name: string;
    description: string;
    variants: ProductVariantSummary[];
}
