import type { Discount } from './discount';

export interface Product {
    productId: number;
    name: string;
    description: string;
    categoryIds: number[];
    brandId: number;
    tags: TagSummary[];
    // images ?
    // taxCode ?
}

export interface TagSummary {
    tagId: number;
    name: string;
}

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
    variants: ProductVariant[];
}

export interface ProductVariantOption {
    optionId: number;
    optionName: string;
    value: string;
    valueId: number;
}

export interface ProductVariant {
    variantId: number;
    sku: string;
    unitPrice: number;
    quantityInStock: number;
    images: ProductImage[];
    options: ProductVariantOption[] | undefined;
    discount: Discount | undefined;
}
