import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';

import { toaster } from '../../components/common/Toaster';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const error = action.payload;
        if (typeof error === 'object' && error !== null && 'status' in error) {
            const errorStatus = error.status as FetchBaseQueryError['status'];

            // Internal server error
            if (errorStatus === 500) {
                toaster.create({
                    title: 'Server error. Please try again later.',
                    type: 'error',
                });
            }

            // Connection error
            if (errorStatus === 'FETCH_ERROR') {
                toaster.create({
                    title: 'Unable to connect. Please try again later.',
                    type: 'error',
                });
            }
        }
    }

    return next(action);
};
