import {
    Button,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    RadioCard,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import type { ProductVariant } from '../../types/product';

import { useFetchProductQuery, useFetchVariantsForProductQuery } from '../../api/product/api';
import { NumberInput } from '../../components/common/NumberInput';
import { Price } from '../../components/common/Price';
import { useForm } from '../../utils/form';
import { useIdParams } from '../../utils/useIdParams';
import { ImageCarousel } from './components/ImageCarousel';
import { OptionsList } from './components/OptionsList';
import { StockIndicator } from './components/StockIndicator';
import { useAddToCart } from './utils/useAddToCart';

const ProductDetailPage = () => {
    const { productId } = useIdParams();

    const { data: product, isLoading: isProductLoading } = useFetchProductQuery({
        productId: productId,
    });

    const { data: variants, isLoading: isVariantsLoading } = useFetchVariantsForProductQuery({
        productId: productId,
    });
    const [selectedVariant, setSelectedVariant] = useState(variants?.[0]);

    const { handleAddToCart, isLoading: isAddToCartLoading } = useAddToCart();

    const { values, setFieldValue, handleSubmit } = useForm({
        initialValues: {
            quantity: '1',
        },
        onSubmit: async ({ quantity }) => {
            handleAddToCart({
                quantity: Number.parseInt(quantity),
                variantId: selectedVariant?.variantId,
            });
        },
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
                <form onSubmit={handleSubmit} noValidate>
                    <HStack gap={4}>
                        <NumberInput
                            name="quantity"
                            min={1}
                            max={99}
                            width="70px"
                            value={values.quantity}
                            onChange={(value) => setFieldValue('quantity', value)}
                        />
                        <Button type="submit" colorPalette="blue" loading={isAddToCartLoading}>
                            Add to cart
                        </Button>
                    </HStack>
                </form>
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
