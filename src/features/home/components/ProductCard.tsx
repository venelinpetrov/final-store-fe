import { Card, Image, Text, Button } from '@chakra-ui/react';
import { AspectRatio, Box, Carousel, IconButton } from '@chakra-ui/react';
import { forwardRef, useMemo } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

import type { ProductVariantSummary } from '../../../types/product';
interface ProductCardProps {
    name: string;
    description: string;
    variants: ProductVariantSummary[];
}

export const ProductCard = ({ name, description, variants }: ProductCardProps) => {
    const carouselImages = useMemo(
        () =>
            variants.flatMap(({ images }) =>
                images.map(({ link, altText }) => ({ src: link, alt: altText })),
            ),
        [variants],
    );

    const minPrice = variants.reduce((acc, curr) => {
        if (curr.unitPrice < acc) {
            return acc;
        }
        acc = curr.unitPrice;
        return acc;
    }, 0);

    return (
        <Card.Root maxW="sm" overflow="hidden" flexShrink={0}>
            <ImageCarousel images={carouselImages} />
            <Card.Body gap="2">
                <Card.Title>{name}</Card.Title>
                <Card.Description>{description}</Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    {/* TODO: format currency */}
                    From €{minPrice}
                </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button variant="solid">Buy now</Button>
                <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
        </Card.Root>
    );
};

import type { IconButtonProps } from '@chakra-ui/react';

interface ImageCarouselProps {
    images: Array<{ src: string; alt: string }>;
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    return (
        <Carousel.Root
            slideCount={images.length}
            maxW="2xl"
            position="relative"
            colorPalette="white"
            allowMouseDrag
        >
            <Carousel.Control width="full" position="relative">
                <Carousel.PrevTrigger asChild>
                    <ActionButton insetStart="4">
                        <LuArrowLeft />
                    </ActionButton>
                </Carousel.PrevTrigger>

                <Carousel.ItemGroup width="full">
                    {images.map(({ src, alt }, index) => (
                        <Carousel.Item key={index} index={index}>
                            <AspectRatio ratio={16 / 9} maxH="72vh" w="full">
                                <Image src={src} alt={alt} objectFit="contain" />
                            </AspectRatio>
                        </Carousel.Item>
                    ))}
                </Carousel.ItemGroup>

                <Carousel.NextTrigger asChild>
                    <ActionButton insetEnd="4">
                        <LuArrowRight />
                    </ActionButton>
                </Carousel.NextTrigger>

                <Box position="absolute" bottom="6" width="full">
                    <Carousel.Indicators
                        transition="width 0.2s ease-in-out"
                        transformOrigin="center"
                        opacity="0.5"
                        boxSize="2"
                        _current={{ width: '10', bg: 'colorPalette.subtle', opacity: 1 }}
                    />
                </Box>
            </Carousel.Control>
        </Carousel.Root>
    );
};

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    function ActionButton(props, ref) {
        return (
            <IconButton
                {...props}
                ref={ref}
                size="xs"
                variant="outline"
                rounded="full"
                position="absolute"
                zIndex="1"
                bg="bg"
            />
        );
    },
);
