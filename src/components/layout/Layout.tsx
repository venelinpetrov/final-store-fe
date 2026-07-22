import { Outlet, Link as RouterLink } from 'react-router';
import { ColorModeButton } from '../ui/color-mode';
import { Container, Grid, GridItem, HStack, Image } from '@chakra-ui/react';
import { Nav } from './components/Navigation/Nav';
import logo from '../../../public/favicon.svg';

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

                <ColorModeButton />
            </GridItem>
            <GridItem as={Container} py={4} overflow="auto">
                <Outlet />
            </GridItem>
        </Grid>
    );
};

export default Layout;
