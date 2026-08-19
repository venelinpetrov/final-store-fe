import { Button, Heading } from '@chakra-ui/react';
import { useOutletContext } from 'react-router';

import type { User } from '../../types/user';

import { logoutUser } from '../../api/auth/thunks';
import { useAppDispatch } from '../../api/store';

const ProfilePage = () => {
    const { user } = useOutletContext<{ user: User }>();
    const dispatch = useAppDispatch();

    return (
        <>
            <Heading as="h1">Profile page</Heading>
            <Heading as="h2">Welcome, {user.name}</Heading>
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

export default ProfilePage;
