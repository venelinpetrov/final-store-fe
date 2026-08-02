import { Grid, Heading } from '@chakra-ui/react';

import { useFetchProductsQuery } from '../../api/products/api';
import { ProductCard } from './components/ProductCard';

const HomePage = () => {
    const { data } = useFetchProductsQuery();

    return (
        <>
            <Heading>Products</Heading>
            <Grid gridTemplateColumns="repeat(5, 1fr)" gap={4}>
                {data?.content.map(({ name, description, images, productId }) => (
                    <ProductCard
                        key={productId}
                        name={name}
                        description={description}
                        images={images}
                        price={100} // TODO
                    />
                ))}
            </Grid>
        </>
    );
};

export default HomePage;
