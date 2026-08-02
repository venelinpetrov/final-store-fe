import { Card, Image, Text, Button } from '@chakra-ui/react';

import type { ProductImage } from '../../../types/product';

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    images: ProductImage[];
}

export const ProductCard = ({ name, description, price, images }: ProductCardProps) => {
    const firstImage = images[0];
    return (
        <Card.Root maxW="sm" overflow="hidden" flexShrink={0}>
            <Image src={firstImage.link} alt={firstImage.altText} />
            <Card.Body gap="2">
                <Card.Title>{name}</Card.Title>
                <Card.Description>{description}</Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    {/* TODO: format currency */}
                    {price}
                </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button variant="solid">Buy now</Button>
                <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
        </Card.Root>
    );
};
