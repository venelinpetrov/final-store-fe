import { Spinner, Center } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { useMeQuery } from '../../store/auth/api';

export const ProtectedRoute = () => {
    const location = useLocation();
    const { data: user, isLoading, isError } = useMeQuery();

    if (isLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (isError || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet context={{ user }} />;
};
