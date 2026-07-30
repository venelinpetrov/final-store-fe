import { Container, Grid, GridItem, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { SiteHeader } from './components/SiteHeader';

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
                <SiteHeader />
            </GridItem>
            <GridItem
                as={Container}
                py={4}
                overflow="auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Outlet />
            </GridItem>
        </Grid>
    );
};

export default Layout;
