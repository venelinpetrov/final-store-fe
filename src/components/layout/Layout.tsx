import { Outlet } from 'react-router';
import './Layout.css';
import { ColorModeButton } from '../ui/color-mode';
import { Container, Grid, GridItem, HStack } from '@chakra-ui/react';
import { Nav } from './components/Navigation/Nav';

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
                <Nav />
                <ColorModeButton />
            </GridItem>
            <GridItem as={Container} py={4}>
                <Outlet />
            </GridItem>
        </Grid>
    );
};

export default Layout;
