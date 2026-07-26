import { Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { useLoginMutation } from '../store/auth/api';
import { setAccessToken } from '../store/auth/authSlice';
import { useAppDispatch } from '../store/store';

const LoginPage = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    const handleLogin = async () => {
        try {
            const res = await login({
                email: 'vipi@example.com',
                password: '000000',
            }).unwrap();

            dispatch(setAccessToken({ accessToken: res.accessToken }));

            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Button onClick={handleLogin}>Login</Button>
        </>
    );
};

export default LoginPage;
