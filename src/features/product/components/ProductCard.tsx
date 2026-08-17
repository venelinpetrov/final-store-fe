import { Card, Button, Link } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router';

import type { ProductVariant } from '../../../types/product';

import { Price } from '../../../components/common/Price';
import { ImageCarousel } from './ImageCarousel';

interface ProductCardProps {
    productId: number;
    name: string;
    description: string;
    variants: ProductVariant[];
}

export const ProductCard = ({ productId, name, description, variants }: ProductCardProps) => {
    const [page, setPage] = useState(0);

    const carouselImages = useMemo(
        () =>
            variants.flatMap(({ images }) =>
                images
                    .filter((image) => image.isPrimary)
                    .map(({ link, altText }) => ({ src: link, alt: altText })),
            ) ?? [],
        [variants],
    );

    const currentVariant = variants[page];

    return (
        <Card.Root maxW="sm" overflow="hidden" flexShrink={0}>
            <ImageCarousel items={carouselImages} page={page} onPageChange={setPage} />
            <Card.Body gap="2">
                <Card.Title>
                    <Link asChild>
                        <NavLink to={`/products/${productId}`}>{name}</NavLink>
                    </Link>{' '}
                </Card.Title>
                <Card.Description>{description}</Card.Description>
                <Price
                    amount={currentVariant.unitPrice}
                    discount={currentVariant.discount}
                    size="lg"
                />
            </Card.Body>
            <Card.Footer gap="2">
                <Button variant="solid" asChild>
                    <NavLink to={`/products/${productId}`}>See options</NavLink>
                </Button>
                <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
        </Card.Root>
    );
};
