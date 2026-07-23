import { Button, Heading } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../store/auth/api';
import { setCredentials } from '../store/auth/authSlice';

const HomePage = () => {
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    return (
        <>
            <Heading>Home</Heading>
            <Button
                onClick={async () => {
                    const res = await login({
                        email: 'vipi@example.com',
                        password: '000000',
                    }).unwrap();

                    dispatch(setCredentials({ token: res.token }));
                }}
            >
                Login
            </Button>
        </>
    );
};

export default HomePage;
