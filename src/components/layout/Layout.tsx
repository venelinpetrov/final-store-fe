import { Outlet, Link as RouterLink } from 'react-router';
import { ColorModeButton } from '../ui/color-mode';
import { Container, Grid, GridItem, HStack, Image, Separator } from '@chakra-ui/react';
import { Nav } from './components/Navigation/Nav';
import logo from '../../assets/icons/favicon.svg';
import { Icon } from '@chakra-ui/react';
import { HiShoppingCart, HiUser } from 'react-icons/hi';

const Layout = () => {
    return (
        <Grid h="100vh" templateRows="auto 1fr">
            <GridItem
                as={HStack}
                borderBottomColor="border.emphasized"
                borderBottomWidth={1}
                justifyContent="space-between"
                alignItems="center"
                px={8}
                py={4}
            >
                <RouterLink to="/">
                    <Image src={logo} alt="MySite" h="32px" />
                </RouterLink>

                <Nav />

                <HStack gap={8}>
                    <RouterLink to="/cart">
                        <Icon size="lg" _hover={{ color: 'fg.info' }}>
                            <HiShoppingCart />
                        </Icon>
                    </RouterLink>
                    <RouterLink to="/profile">
                        <Icon size="lg" _hover={{ color: 'fg.info' }}>
                            <HiUser />
                        </Icon>
                    </RouterLink>
                    <Separator h="4" size="md" orientation="vertical" />
                    <ColorModeButton />
                </HStack>
            </GridItem>
            <GridItem as={Container} py={4} overflow="auto">
                <Outlet />
            </GridItem>
        </Grid>
    );
};

export default Layout;
