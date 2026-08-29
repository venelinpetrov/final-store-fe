import { Box, Circle, Float, Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
import { HiShoppingCart } from 'react-icons/hi';

import { authTokenSelector } from '../../api/auth/selectors';
import { useGetMyCartQuery } from '../../api/cart/api';
import { useAppSelector } from '../../api/store';

export interface CartIcon {}

export const CartIcon = () => {
    const accessToken = useAppSelector(authTokenSelector);

    const { data } = useGetMyCartQuery(undefined, { skip: accessToken === undefined });

    const itemsCount = useMemo(() => {
        return (
            data?.cartItems.reduce((sum, { quantity }) => {
                return sum + quantity;
            }, 0) ?? 0
        );
    }, [data]);

    return (
        <Box position="relative">
            <Icon size="lg" _hover={{ color: 'fg.info' }}>
                <HiShoppingCart />
            </Icon>
            <Float placement="top-end">
                <Circle size="5" bg="red" color="white">
                    {itemsCount}
                </Circle>
            </Float>
        </Box>
    );
};
