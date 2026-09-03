import { useEffect } from 'react';

import { authInitializedSelector } from '../api/auth/selectors';
import { initializeAuth } from '../api/auth/thunks';
import { useAppDispatch, useAppSelector } from '../api/store';
import App from './App';

const AppBootstrap = () => {
    const dispatch = useAppDispatch();
    const initialized = useAppSelector(authInitializedSelector);

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    if (!initialized) {
        return 'Loading...';
    }

    return <App />;
};

export default AppBootstrap;
