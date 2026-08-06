import { Grid, Heading } from '@chakra-ui/react';

import { useFetchProductsQuery } from '../../api/products/api';
import { ProductCard } from './components/ProductCard';

const HomePage = () => {
    const { data } = useFetchProductsQuery();

    return (
        <>
            <Heading>Products</Heading>
            <Grid
                gap={4}
                xl={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
                lg={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
                md={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
                sm={{ gridTemplateColumns: 'repeat(1, 1fr)' }}
            >
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
