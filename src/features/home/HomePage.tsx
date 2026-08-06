import { Grid, Heading } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { useFetchProductsQuery } from '../../api/products/api';
import { Pager } from '../../components/common/Pager';
import { ProductCard } from './components/ProductCard';

const DEFAULT_PAGE_SIZE = 0;

const HomePage = () => {
    const [page, setPage] = useState(0);
    const { data, isFetching } = useFetchProductsQuery({ page, size: DEFAULT_PAGE_SIZE });

    const products = useMemo(
        () =>
            isFetching
                ? 'loading...'
                : data?.content.map(({ name, description, images, productId }) => (
                      <ProductCard
                          key={productId}
                          name={name}
                          description={description}
                          images={images}
                          price={100} // TODO
                      />
                  )),
        [isFetching, data?.content],
    );

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
                {products}
            </Grid>
            <Pager
                count={data?.totalElements}
                page={page}
                pageSize={DEFAULT_PAGE_SIZE}
                onPageChange={(page) => setPage(page)}
            />
        </>
    );
};

export default HomePage;
