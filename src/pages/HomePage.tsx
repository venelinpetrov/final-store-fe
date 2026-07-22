import { Alert } from '@chakra-ui/react';

const HomePage = () => {
    return (
        <>
            Home page
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Data uploaded to the server. Fire on!</Alert.Title>
            </Alert.Root>
        </>
    );
};

export default HomePage;
