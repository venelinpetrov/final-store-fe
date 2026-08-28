import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export const authTokenSelector = (state: RootState) => state.auth.accessToken;

export const isAuthenticatedSelector = createSelector(authTokenSelector, (token) => Boolean(token));
