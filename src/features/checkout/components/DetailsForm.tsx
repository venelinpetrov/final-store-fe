import type { Ref } from 'react';

import { HStack, RadioCard } from '@chakra-ui/react';

import type { CustomerAddress } from '../../../types/customer';

import { AddressForm, type AddressFormRef } from '../../../components/common/AddressForm';
import { addressToString } from '../../../utils/addressToString';

export interface DetailsFormProps {
    ref: Ref<AddressFormRef>;
    addresses: CustomerAddress[] | undefined;
    selectedAddress: string | null;
    onAddressSelect: (address: string | null) => void;
}
export const DetailsForm = ({
    ref,
    addresses,
    selectedAddress,
    onAddressSelect,
}: DetailsFormProps) => {
    return !addresses ? (
        <AddressForm ref={ref} />
    ) : (
        <RadioCard.Root value={selectedAddress} onValueChange={(e) => onAddressSelect(e.value)}>
            <RadioCard.Label>Select address</RadioCard.Label>
            <HStack align="stretch">
                {addresses.map((address) => (
                    <RadioCard.Item key={address.addressTypeName} value={String(address.addressId)}>
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                            <RadioCard.ItemContent>
                                <RadioCard.ItemText>{address.addressTypeName}</RadioCard.ItemText>
                                <RadioCard.ItemDescription>
                                    {addressToString(address)}
                                </RadioCard.ItemDescription>
                            </RadioCard.ItemContent>
                            <RadioCard.ItemIndicator />
                        </RadioCard.ItemControl>
                    </RadioCard.Item>
                ))}
            </HStack>
        </RadioCard.Root>
    );
};
