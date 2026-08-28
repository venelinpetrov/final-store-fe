import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as RTKProvider } from 'react-redux';

import { store } from './api/store.ts';
import App from './components/App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RTKProvider store={store}>
            <App />
        </RTKProvider>
    </StrictMode>,
);
