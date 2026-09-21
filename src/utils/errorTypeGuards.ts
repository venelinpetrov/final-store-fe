import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Documentation can be found at this link:
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

export type ApiError = {
    message: string;
    errors: string[];
};

/**
 * Type predicate to narrow an unknown error to `ApiError`
 */
export function isApiError(data: unknown): data is ApiError {
    return (
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof data.message === 'string' &&
        'errors' in data
    );
}

/**
 * Exctract error message from `FetchBaseQueryError` object
 */
export function getErrorMessage(error: FetchBaseQueryError): string {
    if (isApiError(error.data)) {
        return error.data.message;
    }

    return '';
}
