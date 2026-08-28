import { Box, Circle, Float, Heading, HStack, Image, Separator } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiShoppingCart, HiUser } from 'react-icons/hi';
import { Link as RouterLink } from 'react-router';

import { authTokenSelector } from '../../api/auth/selectors';
import { useGetMyCartQuery } from '../../api/cart/api';
import { useAppSelector } from '../../api/store';
import logo from '../../assets/icons/favicon.svg';
import { ColorModeButton } from '../common/ColorMode';
import { Nav } from './Nav';

export const SiteHeader = () => {
    const accessToken = useAppSelector(authTokenSelector);

    const { data } = useGetMyCartQuery(undefined, { skip: accessToken === undefined });
    return (
        <>
            <RouterLink to="/">
                <HStack>
                    <Image src={logo} alt="MySite" h="32px" />
                    <Heading as="h1">Final Store</Heading>
                </HStack>
            </RouterLink>

            <Nav />

            <HStack gap={8}>
                <RouterLink to="/cart">
                    <Box position="relative">
                        <Icon size="lg" _hover={{ color: 'fg.info' }}>
                            <HiShoppingCart />
                        </Icon>
                        <Float placement="top-end">
                            <Circle size="5" bg="red" color="white">
                                {data?.cartItems.length ?? 0}
                            </Circle>
                        </Float>
                    </Box>
                </RouterLink>
                <RouterLink to="/profile">
                    <Icon size="lg" _hover={{ color: 'fg.info' }}>
                        <HiUser />
                    </Icon>
                </RouterLink>
                <Separator h="4" size="md" orientation="vertical" />
                <ColorModeButton />
            </HStack>
        </>
    );
};
