import { Card, HStack, Image, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { CartItem } from '../../types/cart';
import type { Product, ProductVariant } from '../../types/product';

import { authTokenSelector } from '../../api/auth/selectors';
import { useGetMyCartQuery, useUpdateCartMutation } from '../../api/cart/api';
import { useAppSelector } from '../../api/store';
import { NumberInput } from '../../components/common/NumberInput';
import { Price } from '../../components/common/Price';

const QUANTITY_INPUT_DEBOUNCE_TIME = 500;

interface CartItemProps {
    product: Product;
    variant: ProductVariant;
    quantity: number;
}
const CartItem = ({ product, variant, quantity }: CartItemProps) => {
    // TODO add some sort of fallback to a generic image if for some reason a primary image connot be found
    const primaryImage = variant.images.find(({ isPrimary }) => isPrimary);

    const [localQuantity, setLocalQuantity] = useState(String(quantity));

    const [updateCart, { isLoading: isUpdateCartLoading }] = useUpdateCartMutation();

    useEffect(() => {
        setLocalQuantity(String(quantity));
    }, [quantity]);

    useEffect(() => {
        if (localQuantity === String(quantity)) {
            return;
        }

        const timeout = setTimeout(() => {
            updateCart({
                variantId: variant.variantId,
                body: {
                    quantity: Number.parseInt(localQuantity),
                },
            });
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
                    <Stack>
                        <Card.Title mb="2">The perfect latte</Card.Title>
                        <Card.Description>{product.description}</Card.Description>
                    </Stack>
                    <HStack gap={4}>
                        <Price amount={variant.unitPrice} discount={variant.discount} size="lg" />
                        <NumberInput
                            name="quantity"
                            value={String(localQuantity)}
                            disabled={isUpdateCartLoading}
                            onChange={setLocalQuantity}
                        />
                    </HStack>
                </HStack>
            </Card.Body>
        </Card.Root>
    );
};

const CartPage = () => {
    const accessToken = useAppSelector(authTokenSelector);

    const { data: cart, isLoading } = useGetMyCartQuery(undefined, {
        skip: accessToken === undefined,
    });

    return (
        <Stack gap={4}>
            {isLoading
                ? 'Loading...'
                : (cart?.cartItems.map((item, idx) => (
                      <CartItem
                          key={idx}
                          product={item.product}
                          variant={item.variant}
                          quantity={item.quantity}
                      />
                  )) ?? 'Cart is empty')}
        </Stack>
    );
};

export default CartPage;
