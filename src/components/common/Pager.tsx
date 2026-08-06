import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export interface PagerProps {
    count: number | undefined;
    pageSize: number;
    page: number;
    onPageChange: (page: number) => void;
}
export const Pager = ({ count, pageSize, page, onPageChange }: PagerProps) => {
    return (
        <Pagination.Root
            page={page + 1}
            count={count}
            pageSize={pageSize}
            onPageChange={(e) => onPageChange(e.page - 1)}
        >
            <ButtonGroup variant="ghost" size="sm">
                <Pagination.PrevTrigger asChild>
                    <IconButton>
                        <HiChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                            {page.value}
                        </IconButton>
                    )}
                />

                <Pagination.NextTrigger asChild>
                    <IconButton>
                        <HiChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    );
};
