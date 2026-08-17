import { DataList } from '@chakra-ui/react';

import type { ProductVariantOption } from '../../../types/product';

export interface OptionsListProps {
    options: ProductVariantOption[] | undefined;
    size?: 'sm' | 'md' | 'lg';
}

export const OptionsList = ({ options, size = 'md' }: OptionsListProps) => (
    <DataList.Root orientation="horizontal" size={size} variant="subtle">
        {options?.map(({ optionId, optionName, value }) => (
            <DataList.Item key={optionId}>
                <DataList.ItemLabel>{optionName}</DataList.ItemLabel>
                <DataList.ItemValue>{value}</DataList.ItemValue>
            </DataList.Item>
        )) || null}
    </DataList.Root>
);
