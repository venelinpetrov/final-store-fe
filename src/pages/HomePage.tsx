import { Button, Heading } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useLazyMeQuery, useLoginMutation, useRefreshMutation } from '../store/auth/api';
import { setAccessToken } from '../store/auth/authSlice';

const HomePage = () => {
    const [login] = useLoginMutation();
    const [refresh] = useRefreshMutation();
    const [getMe] = useLazyMeQuery();
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

                    dispatch(setAccessToken({ token: res.token }));
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

            <Button
                onClick={async () => {
                    const res = await getMe().unwrap();
                    console.log(res);
                }}
            >
                Me
            </Button>
        </>
    );
};

export default HomePage;
