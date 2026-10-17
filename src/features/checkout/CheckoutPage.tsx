import {
    Button,
    ButtonGroup,
    Container,
    Heading,
    HStack,
    RadioCard,
    Steps,
} from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

import { useMeQuery } from '../../api/auth/api';
import { useGetAddressesQuery } from '../../api/customer/api';
import { addressToString } from '../../utils/addressToString';
const DetailsForm = () => <div>Details form</div>;
const DeliveryForm = () => <div>Delivery form</div>;
const PaymentForm = () => <div>Payment form</div>;
const CheckoutSummary = () => <div>Summary</div>;

const steps = [
    {
        title: 'Yourd details',
        content: DetailsForm(),
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
];

const CheckoutPage = () => {
    const { data: user } = useMeQuery();

    const { data: addresses } = useGetAddressesQuery(
        user?.userId != null ? { customerId: user.userId } : skipToken,
    );

    const [step, setStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

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

                <RadioCard.Root
                    value={selectedAddress}
                    onValueChange={(e) => setSelectedAddress(e.value)}
                >
                    <RadioCard.Label>Select address</RadioCard.Label>
                    <HStack align="stretch">
                        {!addresses
                            ? 'TODO: No addresses. Add form'
                            : addresses.map((address) => (
                                  <RadioCard.Item
                                      key={address.addressTypeName}
                                      value={String(address.addressId)}
                                  >
                                      <RadioCard.ItemHiddenInput />
                                      <RadioCard.ItemControl>
                                          <RadioCard.ItemContent>
                                              <RadioCard.ItemText>
                                                  {address.addressTypeName}
                                              </RadioCard.ItemText>
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
                    <Steps.NextTrigger asChild>
                        <Button>Next</Button>
                    </Steps.NextTrigger>
                </ButtonGroup>
            </Steps.Root>
        </Container>
    );
};

export default CheckoutPage;
