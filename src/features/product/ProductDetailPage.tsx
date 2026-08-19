import {
    Button,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    NumberInput,
    RadioCard,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import type { ProductVariant } from '../../types/product';

import { useFetchProductQuery, useFetchVariantsForProductQuery } from '../../api/product/api';
import { Price } from '../../components/common/Price';
import { useIdParams } from '../../utils/useIdParams';
import { ImageCarousel } from './components/ImageCarousel';
import { OptionsList } from './components/OptionsList';
import { StockIndicator } from './components/StockIndicator';

const ProductDetailPage = () => {
    const { productId } = useIdParams();
    const { data: product, isLoading: isProductLoading } = useFetchProductQuery({
        productId: productId,
    });
    const { data: variants, isLoading: isVariantsLoading } = useFetchVariantsForProductQuery({
        productId: productId,
    });

    const variantIdToVariantMap = useMemo(() => {
        return (
            variants?.reduce(
                (map, variant) => {
                    map[variant.variantId] = variant;
                    return map;
                },
                {} as Record<number, ProductVariant>,
            ) || ({} as Record<number, ProductVariant>)
        );
    }, [variants]);

    const [selectedVariant, setSelectedVariant] = useState(variants?.[0]);

    useEffect(() => {
        if (variants) {
            setSelectedVariant(variants[0]);
        }
    }, [variants]);

    const variantImages = useMemo(
        () =>
            selectedVariant?.images.map(({ link, altText }) => ({
                src: link,
                alt: altText,
            })) ?? [],
        [selectedVariant],
    );

    return isVariantsLoading || isProductLoading ? (
        'Loading...'
    ) : (
        <Grid templateColumns="1fr 1fr" gapX={8} gapY={4} px={8} maxW="7xl" w="100%">
            {/* Left section */}
            <GridItem colSpan={2}>
                <Heading as="h1">{product?.name}</Heading>
            </GridItem>
            <GridItem as={Stack} gap={8}>
                {variants && <ImageCarousel items={variantImages} showIndicator />}
                <Text textStyle="lg">{product?.description}</Text>
                <Text textStyle="sm">{selectedVariant?.sku}</Text>
                <OptionsList options={selectedVariant?.options} />
            </GridItem>

            {/* Right section */}
            <GridItem as={Stack} gap={4}>
                {variants && (
                    <VariantChooser
                        variants={variants}
                        value={String(selectedVariant?.variantId)}
                        onValueChange={(variantId) =>
                            setSelectedVariant(variantIdToVariantMap[Number(variantId)])
                        }
                    />
                )}

                <Price
                    amount={selectedVariant?.unitPrice}
                    size="lg"
                    discount={selectedVariant?.discount}
                />
                <StockIndicator quantityInStock={selectedVariant?.quantityInStock} />
                <HStack gap={4}>
                    <NumberInput.Root width="65px" defaultValue="1" min={1} max={50}>
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                    <Button colorPalette="blue">Add to cart</Button>
                </HStack>
            </GridItem>
        </Grid>
    );
};

export interface VariantChooserProps {
    variants: ProductVariant[];
    value: string | null | undefined;
    onValueChange: (value: string | null) => void;
}
export const VariantChooser = ({ variants, value, onValueChange }: VariantChooserProps) => {
    return (
        <RadioCard.Root value={value} onValueChange={(e) => onValueChange(e.value)}>
            <Heading as="h2">Available variants</Heading>

            <HStack>
                {variants.map((item, index) => {
                    var primaryImage = item.images.find((i) => i.isPrimary)!;
                    return (
                        <RadioCard.Item key={index} value={String(item.variantId)} flex="none">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl p={1}>
                                <RadioCard.ItemContent>
                                    <Image src={primaryImage.link} w="50px" />
                                    {/* <RadioCard.ItemIndicator as={HiCheck}></RadioCard.ItemIndicator> */}
                                </RadioCard.ItemContent>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    );
                })}
            </HStack>
        </RadioCard.Root>
    );
};

export default ProductDetailPage;
