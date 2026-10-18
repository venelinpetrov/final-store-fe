import { Button, ButtonGroup, Container, Heading, Steps } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { AddressFormRef } from '../../components/common/AddressForm';

import { useMeQuery } from '../../api/auth/api';
import { useGetAddressesQuery } from '../../api/customer/api';
import { DetailsForm } from './components/DetailsForm';

const DeliveryForm = () => <div>Delivery form</div>;
const PaymentForm = () => <div>Payment form</div>;
const CheckoutSummary = () => <div>Summary</div>;

const CheckoutPage = () => {
    const { data: user } = useMeQuery();
    const addressFormRef = useRef<AddressFormRef>(null);

    const { data: addresses } = useGetAddressesQuery(
        user?.userId != null ? { customerId: user.userId } : skipToken,
    );

    const [step, setStep] = useState(0);
    const handleNext = async () => {
        if (step === 0 && !selectedAddress) {
            const isValid = await addressFormRef.current?.validate();

            if (!isValid) {
                return;
            }
        }

        setStep((prev) => prev + 1);
        console.log(addressFormRef.current?.getValues());
    };
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    const steps = useMemo(
        () => [
            {
                title: 'Your details',
                content: (
                    <DetailsForm
                        ref={addressFormRef}
                        addresses={addresses}
                        selectedAddress={selectedAddress}
                        onAddressSelect={setSelectedAddress}
                    />
                ),
            },
            {
                title: 'Delivery',
                content: DeliveryForm(),
            },
            {
                title: 'Payment',
                content: PaymentForm(),
            },
            {
                title: 'Summary',
                content: CheckoutSummary(),
            },
        ],
        [addresses, selectedAddress, setSelectedAddress],
    );

    useEffect(() => {
        if (!addresses) {
            return;
        }
        setSelectedAddress(addresses[0]?.addressId.toString());
    }, [addresses]);

    return (
        <Container gap={8} centerContent>
            <Heading as="h2">What is your address?</Heading>
            <Steps.Root
                step={step}
                count={steps.length}
                colorPalette="green"
                onStepChange={(e) => setStep(e.step)}
            >
                <Steps.List>
                    {steps.map((step, index) => (
                        <Steps.Item key={index} index={index} title={step.title}>
                            <Steps.Trigger>
                                <Steps.Indicator />
                                <Steps.Title>{step.title}</Steps.Title>
                            </Steps.Trigger>
                            <Steps.Separator />
                        </Steps.Item>
                    ))}
                </Steps.List>

                {steps.map((step, index) => (
                    <Steps.Content key={index} index={index}>
                        {step.content}
                    </Steps.Content>
                ))}
                <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
                <ButtonGroup size="sm" variant="outline">
                    <Steps.PrevTrigger asChild>
                        <Button>Prev</Button>
                    </Steps.PrevTrigger>
                    <Button onClick={handleNext}>Next</Button>
                </ButtonGroup>
            </Steps.Root>
        </Container>
    );
};

export default CheckoutPage;
