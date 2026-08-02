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
