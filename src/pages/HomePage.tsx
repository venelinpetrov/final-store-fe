import { Button, Heading } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useLoginMutation, useRefreshMutation } from '../store/auth/api';
import { setCredentials } from '../store/auth/authSlice';

const HomePage = () => {
    const [login] = useLoginMutation();
    const [refresh] = useRefreshMutation();

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

            <Button
                onClick={async () => {
                    refresh();
                }}
            >
                Refresh
            </Button>
        </>
    );
};

export default HomePage;
