import { createListenerMiddleware } from '@reduxjs/toolkit';

import authApi from '../auth/api';
import cartApi from '../cart/api';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (_, listenerApi) => {
        listenerApi.dispatch(cartApi.endpoints.associateCart.initiate());
    },
});
