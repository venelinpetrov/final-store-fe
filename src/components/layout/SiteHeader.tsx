import { Heading, HStack, Image, Separator } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiUser } from 'react-icons/hi';
import { Link as RouterLink } from 'react-router';

import logo from '../../assets/icons/favicon.svg';
import { CartIcon } from '../cart/CartIcon';
import { ColorModeButton } from '../common/ColorMode';
import { Nav } from './Nav';

export const SiteHeader = () => {
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
                    <CartIcon />
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
