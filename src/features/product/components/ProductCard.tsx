import type { IconButtonProps } from '@chakra-ui/react';

import {
    Card,
    Image,
    Text,
    Button,
    AspectRatio,
    Box,
    Carousel,
    IconButton,
    DataList,
    Stack,
    Tag,
    HStack,
} from '@chakra-ui/react';
import { forwardRef, useMemo, useState } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

import type { ProductVariant, ProductVariantOption } from '../../../types/product';

import { DiscountType, type Discount } from '../../../types/discount';

interface ProductCardProps {
    name: string;
    description: string;
    variants: ProductVariant[];
}

export const ProductCard = ({ name, description, variants }: ProductCardProps) => {
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
                <Card.Title>{name}</Card.Title>
                <Card.Description>{description}</Card.Description>
                <OptionsList options={currentVariant.options} />
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    {/* TODO: format currency */}
                    <Price
                        amount={currentVariant.unitPrice}
                        discount={currentVariant.discount}
                        size="lg"
                    />
                </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button variant="solid">Buy now</Button>
                <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
        </Card.Root>
    );
};

interface ImageCarouselProps {
    items: Array<{ src: string; alt: string }>;
    page?: number;
    onPageChange?: ((page: number) => void) | undefined;
}

const ImageCarousel = ({ items, page, onPageChange }: ImageCarouselProps) => {
    return (
        <Carousel.Root
            page={page}
            onPageChange={(e) => onPageChange?.(e.page)}
            slideCount={items.length}
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
                    {items.map(({ src, alt }, index) => (
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

const OptionsList = ({ options }: { options: ProductVariantOption[] | undefined }) => (
    <DataList.Root orientation="horizontal" size="sm" variant="subtle">
        {options?.map(({ optionId, optionName, value }) => (
            <DataList.Item key={optionId}>
                <DataList.ItemLabel>{optionName}</DataList.ItemLabel>
                <DataList.ItemValue>{value}</DataList.ItemValue>
            </DataList.Item>
        )) || null}
    </DataList.Root>
);

interface PriceProps {
    amount: number | undefined;
    discount: Discount | undefined;
    size: 'sm' | 'md' | 'lg';
}

const Price = ({ amount, discount, size }: PriceProps) => {
    if (typeof amount === 'undefined') {
        return '';
    }
    // TODO currency support. Should come from e.g. "currency provider"
    const formattedAmount = `€${amount}`;
    let formattedDiscount = '';

    switch (discount?.discountType) {
        case DiscountType.FIXED:
            formattedDiscount = `-€${discount?.value}`;
            break;
        case DiscountType.PERCENTAGE:
            formattedDiscount = `-${discount?.value}%`;
            break;
        default:
            break;
    }

    return (
        <Stack>
            <Text textStyle={size}>{formattedAmount}</Text>
            {!discount?.value ? (
                ''
            ) : (
                <HStack>
                    <Tag.Root colorPalette="red">
                        <Tag.Label>{formattedDiscount}</Tag.Label>
                    </Tag.Root>
                    <Text textStyle="xs">Valid until: {discount.validUntil}</Text>
                </HStack>
            )}
        </Stack>
    );
};
