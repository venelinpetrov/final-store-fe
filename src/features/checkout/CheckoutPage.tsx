import { Button, ButtonGroup, Container, Heading, Steps } from '@chakra-ui/react';
import { useState } from 'react';
const DetailsForm = () => <div>Details form</div>;
const DeliveryForm = () => <div>Delivery form</div>;
const PaymentForm = () => <div>Payment form</div>;
const CheckoutSummary = () => <div>Summary</div>;
const CheckoutPage = () => {
    const [step, setStep] = useState(0);

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
                    <Steps.NextTrigger asChild>
                        <Button>Next</Button>
                    </Steps.NextTrigger>
                </ButtonGroup>
            </Steps.Root>
        </Container>
    );
};

export default CheckoutPage;
