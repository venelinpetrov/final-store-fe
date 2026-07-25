import { Button, Heading } from '@chakra-ui/react';

import { useLazyMeQuery, useLoginMutation, useRefreshMutation } from '../store/auth/api';
import { setAccessToken } from '../store/auth/authSlice';
import { logoutUser } from '../store/auth/thunks';
import { useAppDispatch } from '../store/store';

const HomePage = () => {
    const [login] = useLoginMutation();
    const [refresh] = useRefreshMutation();
    const [getMe] = useLazyMeQuery();
    const dispatch = useAppDispatch();
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

            <Button
                onClick={() => {
                    dispatch(logoutUser());
                }}
            >
                Logout
            </Button>
        </>
    );
};

export default HomePage;
