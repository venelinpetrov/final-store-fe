import { Alert, Container } from '@chakra-ui/react';

const HomePage = () => {
    return (
        <Container>
            Home page
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Data uploaded to the server. Fire on!</Alert.Title>
            </Alert.Root>
        </Container>
    );
};

export default HomePage;
