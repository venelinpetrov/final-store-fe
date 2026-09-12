import { Card, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';

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
        <Grid templateColumns="4fr 1fr" templateRows="1fr" gap={8} flex={1}>
            <GridItem as={Stack} gap={4}>
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
                        <Heading size="2xl">
                            Total: <Price amount={34233} size="lg" />
                        </Heading>
                    </Card.Header>
                    <Card.Body color="fg.muted">
                        This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                    </Card.Body>
                </Card.Root>
            </GridItem>
        </Grid>
    );
};

export default CartPage;
