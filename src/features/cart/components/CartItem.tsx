import { Card, HStack, Image, Stack, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

import type { Product, ProductVariant } from '../../../types/product';

import { useDeleteCartItemMutation, useUpdateCartMutation } from '../../../api/cart/api';
import { NumberInput } from '../../../components/common/NumberInput';
import { Price } from '../../../components/common/Price';
import { StockIndicator } from '../../product/components/StockIndicator';

const QUANTITY_INPUT_DEBOUNCE_TIME = 500;

interface CartItemProps {
    product: Product;
    variant: ProductVariant;
    quantity: number;
}
export const CartItem = ({ product, variant, quantity }: CartItemProps) => {
    // TODO add some sort of fallback to a generic image if for some reason a primary image connot be found
    const primaryImage = variant.images.find(({ isPrimary }) => isPrimary);

    const [localQuantity, setLocalQuantity] = useState(String(quantity));

    const [updateCart, { isLoading: isUpdateCartLoading }] = useUpdateCartMutation();

    const [deleteCartItem, { isLoading: isDeleteCartItemLoading }] = useDeleteCartItemMutation();

    useEffect(() => {
        setLocalQuantity(String(quantity));
    }, [quantity]);

    useEffect(() => {
        if (localQuantity === String(quantity)) {
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                await updateCart({
                    variantId: variant.variantId,
                    body: {
                        // Send the delta, i.e. how much the quantity increased / decreased
                        quantity: Number.parseInt(localQuantity) - quantity,
                    },
                }).unwrap();
            } catch {
                setLocalQuantity(String(quantity));
            }
        }, QUANTITY_INPUT_DEBOUNCE_TIME);

        return () => clearTimeout(timeout);
    }, [localQuantity, quantity, variant.variantId, updateCart]);

    return (
        <Card.Root flexDirection="row" overflow="hidden" size="sm">
            <Image
                objectFit="cover"
                maxW="100px"
                m={4}
                mr={0}
                src={primaryImage?.link}
                alt="Caffe Latte"
            />
            <Card.Body justifyContent="center">
                <HStack justifyContent="space-between">
                    <Stack maxW="50%">
                        <Card.Title mb="2">{product.name}</Card.Title>
                        <Card.Description>{product.description}</Card.Description>
                        <StockIndicator quantityInStock={variant.quantityInStock} />
                    </Stack>
                    <Price
                        amount={quantity * variant.unitPrice}
                        discount={variant.discount}
                        size="lg"
                    />
                    <HStack>
                        <NumberInput
                            name="quantity"
                            min={1}
                            max={1000}
                            width="100px"
                            value={String(localQuantity)}
                            disabled={isUpdateCartLoading}
                            onChange={setLocalQuantity}
                        />
                        <IconButton
                            variant="outline"
                            disabled={isDeleteCartItemLoading}
                            onClick={() => deleteCartItem({ variantId: variant.variantId })}
                        >
                            <HiOutlineTrash />
                        </IconButton>
                    </HStack>
                </HStack>
            </Card.Body>
        </Card.Root>
    );
};
