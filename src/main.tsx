import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as RTKProvider } from 'react-redux';

import { store } from './api/store.ts';
import AppBootstrap from './components/AppBootstrap.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RTKProvider store={store}>
            <AppBootstrap />
        </RTKProvider>
    </StrictMode>,
);
