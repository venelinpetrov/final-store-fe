import { HStack, RadioCard } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import type { Id } from '../../../types/common/identifier';
import type { CustomerPaymentMethod } from '../../../types/payments';

import { useGetPaymentMethodsQuery } from '../../../api/payments/api';

export interface PaymentFormProps {
    onPaymentMethodChange: (value: CustomerPaymentMethod) => void;
}

export const PaymentForm = ({ onPaymentMethodChange }: PaymentFormProps) => {
    const { data: paymentMethods, isLoading } = useGetPaymentMethodsQuery();

    const paymentMethodsMap = useMemo(() => {
        return (paymentMethods ?? []).reduce<Record<Id, CustomerPaymentMethod>>(
            (acc, paymentMethod) => {
                acc[paymentMethod.methodId] = paymentMethod;
                return acc;
            },
            {},
        );
    }, [paymentMethods]);

    const [paymentMethod, setPaymentMethod] = useState<CustomerPaymentMethod | null>(null);

    useEffect(() => {
        if (paymentMethods) {
            setPaymentMethod(paymentMethods[0]);
            onPaymentMethodChange(paymentMethods[0]);
        }
    }, [paymentMethods, onPaymentMethodChange]);

    return isLoading ? (
        <>Loading...</>
    ) : !paymentMethods?.length ? (
        <>TODO: Payment form</>
    ) : (
        <RadioCard.Root
            value={String(paymentMethod?.methodId)}
            onValueChange={(e) => {
                const paymentMethod = paymentMethodsMap[Number(e.value)];
                setPaymentMethod(paymentMethod);
                onPaymentMethodChange(paymentMethod);
            }}
        >
            <RadioCard.Label>Select shipping method</RadioCard.Label>
            <HStack align="stretch">
                {paymentMethods?.map((paymentMethod) => (
                    <RadioCard.Item
                        key={paymentMethod.methodId}
                        value={String(paymentMethod.methodId)}
                    >
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                            <RadioCard.ItemContent>
                                <RadioCard.ItemText>{paymentMethod.cardBrand}</RadioCard.ItemText>
                                <RadioCard.ItemDescription>
                                    ****{paymentMethod.last4}, Exp: {paymentMethod.expMonth} /{' '}
                                    {paymentMethod.expYear}
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
