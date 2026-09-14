import { Stack, HStack, Tag, Text } from '@chakra-ui/react';

import { DiscountType, type Discount } from '../../types/discount';

interface PriceProps {
    amount: number | undefined;
    discount?: Discount | undefined;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    hideValidUntil?: boolean;
}

export const Price = ({ amount, discount, size = 'md', hideValidUntil = false }: PriceProps) => {
    if (typeof amount === 'undefined') {
        return '';
    }
    // TODO currency support. Should come from e.g. "currency provider"
    let formattedDiscount = '';

    switch (discount?.discountType) {
        case DiscountType.FIXED:
            formattedDiscount = `-${formatCurrency(discount?.value)}`;
            break;
        case DiscountType.PERCENTAGE:
            formattedDiscount = `-${discount?.value}%`;
            break;
        default:
            break;
    }

    return (
        <Stack>
            {!discount?.value ? (
                <Text textStyle={size}>{formatCurrency(amount)}</Text>
            ) : (
                <>
                    <Text textStyle={size}>{getDiscountedPrice(amount, discount.value)}</Text>
                    <HStack>
                        <Text textStyle={size} textDecoration="line-through" color="gray.600">
                            {formatCurrency(amount)}
                        </Text>

                        <Tag.Root colorPalette="red">
                            <Tag.Label>{formattedDiscount}</Tag.Label>
                        </Tag.Root>

                        {!hideValidUntil && (
                            <Text textStyle="xs">Valid until: {discount.validUntil}</Text>
                        )}
                    </HStack>
                </>
            )}
        </Stack>
    );
};

// TODO: This is just for illustration now. Return it from BE
const getDiscountedPrice = (amount: number, discount: number) =>
    formatCurrency((amount * (100 - discount)) / 100);

function formatCurrency(value: number, currency: 'EUR' | 'USD' = 'EUR', locale: string = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value);
}
