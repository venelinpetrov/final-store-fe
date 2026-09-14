import { Button, Card, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi';

import { authTokenSelector } from '../../api/auth/selectors';
import { useGetMyCartQuery } from '../../api/cart/api';
import { useAppSelector } from '../../api/store';
import { Price } from '../../components/common/Price';
import { CartItem } from './components/CartItem';

const CartPage = () => {
    const accessToken = useAppSelector(authTokenSelector);

    const { data: cart, isLoading } = useGetMyCartQuery(undefined, {
        skip: accessToken === undefined,
    });

    return (
        <Grid
            gap={4}
            flex={1}
            height="100%"
            xl={{
                gridTemplateColumns: '4fr 1fr',
                gridTemplateRows: '1fr',
            }}
            md={{
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr auto',
            }}
        >
            <GridItem as={Stack} gap={4} overflow="auto">
                {isLoading
                    ? 'Loading...'
                    : (cart?.cartItems
                          .filter((item) => Boolean(item.quantity))
                          .map((item, idx) => (
                              <CartItem
                                  key={idx}
                                  product={item.product}
                                  variant={item.variant}
                                  quantity={item.quantity}
                              />
                          )) ?? 'Cart is empty')}
            </GridItem>
            <GridItem as={Stack}>
                <Card.Root size="sm" flex={1}>
                    <Card.Header>
                        <Heading size="2xl" as={HStack}>
                            Total: <Price amount={34233} size="2xl" />
                        </Heading>
                        <Text color="gray.500">All prices include VAT.</Text>
                    </Card.Header>
                    <Card.Body color="fg.muted" as={Stack} gap={4}>
                        <Button type="submit" colorPalette="green">
                            Proceed to Checkout
                            <HiArrowRight />
                        </Button>
                    </Card.Body>
                </Card.Root>
            </GridItem>
        </Grid>
    );
};

export default CartPage;
