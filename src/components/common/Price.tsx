import { Stack, HStack, Tag, Text } from '@chakra-ui/react';

import { DiscountType, type Discount } from '../../types/discount';

interface PriceProps {
    amount: number | undefined;
    discount: Discount | undefined;
    size: 'sm' | 'md' | 'lg';
}

export const Price = ({ amount, discount, size }: PriceProps) => {
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
