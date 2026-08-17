import { DataList } from '@chakra-ui/react';

import type { ProductVariantOption } from '../../../types/product';

export const OptionsList = ({ options }: { options: ProductVariantOption[] | undefined }) => (
    <DataList.Root orientation="horizontal" size="sm" variant="subtle">
        {options?.map(({ optionId, optionName, value }) => (
            <DataList.Item key={optionId}>
                <DataList.ItemLabel>{optionName}</DataList.ItemLabel>
                <DataList.ItemValue>{value}</DataList.ItemValue>
            </DataList.Item>
        )) || null}
    </DataList.Root>
);
