import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { SiteHeader } from './SiteHeader';

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
                as={VStack}
                px={8}
                py={4}
                overflow="auto"
                display="flex"
                flexDirection="column"
            >
                <Outlet />
            </GridItem>
        </Grid>
    );
};

export default Layout;
