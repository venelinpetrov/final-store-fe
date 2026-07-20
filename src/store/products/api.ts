import { finalStoreApi } from "../initApi";

export interface Pageable<T> {
    totalElements: number;
    totalPages: number;
    pageable: {
        paged: boolean;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
        offset: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
    };
    size: number;
    content: T[];
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface Product {
    id: number;
    name: string;
}
const productsApi = finalStoreApi.injectEndpoints({
    endpoints: (build) => ({
        fetchProducts: build.query<Pageable<Product>, void>({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
        }),
    }),
});

export const { useFetchProductsQuery } = productsApi;

export default productsApi;
