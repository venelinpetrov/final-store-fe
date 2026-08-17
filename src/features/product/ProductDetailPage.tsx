import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useFetchProductQuery, useFetchVariantsForProductQuery } from '../../api/products/api';

export const useIdParams = () => {
    const params = useParams();

    return Object.entries(params).reduce<Record<string, number>>((acc, [key, value]) => {
        return { ...acc, [key]: Number(value) };
    }, {});
};

const ProductDetailPage = () => {
    const { productId } = useIdParams();
    const { data: product } = useFetchProductQuery({ productId: productId });
    const { data: variants, isLoading } = useFetchVariantsForProductQuery({ productId: productId });

    return isLoading ? (
        'Loading...'
    ) : (
        <Grid templateColumns="1fr 1fr" gap={8} px={8}>
            <GridItem>
                <Heading as="h1">
                    {product?.productId}: {product?.name}
                    {variants?.map((v) => v.sku)}
                </Heading>
            </GridItem>
            <GridItem>sdf</GridItem>
        </Grid>
    );
};

export default ProductDetailPage;
