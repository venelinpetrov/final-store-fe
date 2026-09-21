import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';

import { toaster } from '../../components/common/Toaster';
import { getErrorMessage, isFetchBaseQueryError } from '../../utils/errorTypeGuards';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const error = action.payload;

        if (!isFetchBaseQueryError(error)) {
            return next(action);
        }

        if (error.status === 500) {
            toaster.create({
                title: 'Server error. Please try again later.',
                type: 'error',
            });
        }

        if (error.status === 503) {
            toaster.create({
                title: getErrorMessage(error),
                type: 'error',
            });
        }

        if (error.status === 'FETCH_ERROR') {
            toaster.create({
                title: 'Unable to connect. Please try again later.',
                type: 'error',
            });
        }
    }

    return next(action);
};
