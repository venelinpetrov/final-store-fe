export interface ProductImage {
    imageId: number;
    link: string;
    altText: string;
    isPrimary: boolean;
}

export interface Product {
    productId: number;
    name: string;
    description: string;
    images: ProductImage[];
}
