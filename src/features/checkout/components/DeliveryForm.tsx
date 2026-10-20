import { HStack, RadioCard } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import type { Carrier } from '../../../types/carrier';
import type { Id } from '../../../types/common/identifier';

import { useFetchCarriersQuery } from '../../../api/shipment/api';

export interface DeliveryFormProps {
    onCarrierChange: (value: Carrier) => void;
}

export const DeliveryForm = ({ onCarrierChange }: DeliveryFormProps) => {
    const { data: carriers, isLoading } = useFetchCarriersQuery();

    const carriersMap = useMemo(() => {
        return (carriers ?? []).reduce<Record<Id, Carrier>>((acc, carrier) => {
            acc[carrier.carrierId] = carrier;
            return acc;
        }, {});
    }, [carriers]);

    const [carrier, setCarrier] = useState<Carrier | null>(null);

    useEffect(() => {
        if (carriers) {
            setCarrier(carriers[0]);
            onCarrierChange(carriers[0]);
        }
    }, [carriers, onCarrierChange]);

    return isLoading ? (
        <>Loading...</>
    ) : (
        <RadioCard.Root
            value={String(carrier?.carrierId)}
            onValueChange={(e) => {
                const carrier = carriersMap[Number(e.value)];
                setCarrier(carrier);
                onCarrierChange(carrier);
            }}
        >
            <RadioCard.Label>Select shipping method</RadioCard.Label>
            <HStack align="stretch">
                {carriers?.map((carrier) => (
                    <RadioCard.Item key={carrier.carrierId} value={String(carrier.carrierId)}>
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                            <RadioCard.ItemContent>
                                <RadioCard.ItemText>{carrier.code}</RadioCard.ItemText>
                                <RadioCard.ItemDescription>
                                    {carrier.name}
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
